<template>
  <div
    :class="{
      'folders': true,
      'folders--closed': !parentIsOpen
    }"
  >
    <div
      v-for="(folder) in items"
      :key="'folder-' + folder.id"
      class="folders__item folder"
    >
      <div class="folder__list-item">
        <div
          :class="{
            'folder__button': true,
            'folder__button--active': !folder.is_open
          }"
          @click="_slideMenu(folder)"
        />
        <div
          class="folder__label"
          @contextmenu.prevent="$refs.menu.open($event, folder)"
        >
          <template v-if="folder.edit_mode">
            <input
              :ref="'newFolderInput-' + folder.id"
              v-model="folder.new_name"
              class="new-folder-input"
              type="text"
              :disabled="folder.loading"
              @keyup.enter="_updateFolder(folder)"
              @keyup.esc="_cancelUpdateFolder(folder)"
              @blur="_cancelUpdateFolder(folder)"
            >
          </template>
          <template v-else>
            <div
              @click="_slideMenu(folder)"
            >
              {{ folder.name }}
            </div>
          </template>
        </div>
      </div>
      <div class="folders-parent">
        <template v-if="!folder.has_ranges">
          <folders-tree
            v-show-slide="folder.is_open"
            :items="folder.children"
            :label="folder.create_label"
            :parent-id="folder.id"
            :root-id="rootId"
            :has-blind="false"
            :parent-is-open="folder.is_open"
            @change="_getCategoryTree"
            @onCopyElementUp="_copyUp"
            @onCopyElementDown="_copyDown"
            @onMoveElementUp="_moveUp"
            @onMoveElementDown="_moveDown"
          />
        </template>
        <template v-else>
          <matrix-tree
            v-if="folder.is_open"
            key="matrix-tree"
            :items="folder.children"
            :parent-id="folder.id"
            :root-id="rootId"
            @change="_getCategoryTree"
            @onCopyElementUp="_copyUp"
            @onCopyElementDown="_copyDown"
            @onMoveElementUp="_moveUp"
            @onMoveElementDown="_moveDown"
          />
        </template>
      </div>
    </div>
    <div class="folders__item folder">
      <div
        class="folder__new-folder"
      >
        <svg
          id="Layer_1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 350 350"
          style="enable-background:new 0 0 350 350;"
          xml:space="preserve"
        >
          <g id="XMLID_16_">
            <path
              id="XMLID_17_"
              d="M285,150.145V15c0-8.284-6.716-15-15-15H150c-8.284,0-15,6.716-15,15v15H20c-8.284,0-15,6.716-15,15v200
              c0,8.284,6.716,15,15,15h116.076c7.301,50.816,51.119,90,103.924,90c57.897,0,105-47.103,105-105
              C345,203.197,320.443,167.027,285,150.145z M240,320c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75
              S281.355,320,240,320z"
            />
            <path
              id="XMLID_20_"
              d="M270.001,230h-15v-15c0-8.284-6.716-15-15-15c-8.284,0-15,6.716-15,15v15h-15c-8.284,0-15,6.716-15,15
              s6.716,15,15,15h15v15c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-15h15c8.284,0,15-6.716,15-15S278.285,230,270.001,230z"
            />
          </g>
        </svg>
      </div>
      <div class="folder__label folder__label--new">
        <template v-if="newFolderMode">
          <input
            ref="newFolderInput"
            v-model="newFolderName"
            type="text"
            class="new-folder-input"
            :disabled="newFolderLoading"
            @keyup.enter="_createFolder"
            @keyup.esc="_resetNewFolder"
            @blur="_resetNewFolder"
          >
        </template>
        <template v-else>
          <span @click="_changeNewFolderMode">{{ label | localize }}</span>
        </template>
      </div>
    </div>
    <vue-context
      ref="menu"
      class="context"
    >
      <template slot-scope="child">
        <li>
          <a
            href="#"
            @click.prevent="_moveUp(child.data)"
          >
            {{ 'moveUpText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="_moveDown(child.data)"
          >
            {{ 'moveDownText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="_copyUp(child.data)"
          >
            {{ 'copyUpText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="_copyDown(child.data)"
          >
            {{ 'copyDownText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="_changeEditFolderMode(child.data)"
          >
            {{ 'editText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="_showDeleteDialog(child.data)"
          >
            {{ 'deleteText' | localize }}
          </a>
        </li>
      </template>
    </vue-context>
    <transition name="fade2">
      <confirm-popup
        v-model="showDeletePopup"
        :title="'deleteFolderTitle' | localize"
        :text="'deleteFolderText' | localize"
        :loading="deleteLoading"
        @onConfirm="_deleteFolder"
        @onClose="deletingFolder = null"
      />
    </transition>
    <transition name="fade2">
      <popup
        v-model="showNewBlindPopup"
        v-loading="newBlindLoading"
        width="400"
        @click="_resetNewBlind"
      >
        <div class="blind-popup">
          <div class="blind-popup__title">
            <template v-if="newBlind.id">
              {{ 'updateCategoryText' | localize }}
            </template>
            <template v-else>
              {{ 'createCategoryText' | localize }}
            </template>
          </div>
          <div class="blind-popup__main">
            <form class="blind-popup__form blind-form">
              <div class="blind-form__row">
                <div class="blind-form__item">
                  <div class="blind-form__label">
                    {{ 'blind' | localize }}
                  </div>
                  <Rl-input
                    v-model="newBlind.blind"
                    :disabled="newBlindLoading"
                  />
                </div>
              </div>
              <div class="blind-form__row">
                <div class="blind-form__item">
                  <div class="blind-form__label">
                    {{ 'subtitle' | localize }}
                  </div>
                  <Rl-input
                    v-model="newBlind.name"
                    :disabled="newBlindLoading"
                  />
                </div>
              </div>
              <div class="blind-form__footer">
                <Rl-button
                  color="gray"
                  @click="_resetNewBlind"
                >
                  {{ 'cancelText' | localize }}
                </Rl-button>
                <Rl-button @click="_addNewBlind">
                  {{ 'save' | localize }}
                </Rl-button>
              </div>
            </form>
          </div>
        </div>
      </popup>
    </transition>
  </div>
</template>

<script>

import MatrixTree from './MatrixTree'

export default {
  name: 'FoldersTree',
  components: {
    MatrixTree
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    parentId: {
      type: Number,
      required: true
    },
    rootId: {
      type: Number,
      required: true
    },
    parentIsOpen: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hasBlind: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      deletingFolder: null,
      showDeletePopup: false,
      deleteLoading: false,
      newFolderMode: false,
      newFolderLoading: false,
      newFolderName: '',
      showNewBlindPopup: false,
      newBlindLoading: false,
      newBlind: {
        name: '',
        blind: '',
        parent_id: this.parentId,
        root_id: this.rootId,
        pos: '',
        action: '',
        note: ''
      }
    }
  },
  methods: {
    _changeEditFolderMode (item) {
      if (this.hasBlind) {
        if (item) {
          this.newBlind.name = item.name
          this.newBlind.blind = item.blind
          this.newBlind.id = item.id
          this.newBlind.is_open = item.is_open
        }
        this.showNewBlindPopup = true
      } else {
        item.edit_mode = true
        this.$nextTick(() => {
          this.$refs['newFolderInput-' + item.id][0].focus()
        })
      }
    },
    _showDeleteDialog (item) {
      this.deletingFolder = item
      this.showDeletePopup = true
    },
    _updateFolder (item) {
      item.loading = true
      const data = Object.assign({}, item)
      data.name = data.new_name
      this.$store.dispatch('poker/updateCategory', data).then(() => {
        item.name = item.new_name
        item.edit_mode = false
        this.$message.success(this.$options.filters.localize('successfulFolderRenew'))
      }).finally(() => {
        item.loading = false
        this._getCategoryTree()
      })
    },
    _cancelUpdateFolder (item) {
      item.new_name = item.name
      item.edit_mode = false
    },
    _getCategoryTree () {
      this.$emit('change')
    },
    _deleteFolder () {
      this.deleteLoading = true
      this.$store.dispatch('poker/deleteCategory', this.deletingFolder.id).then(() => {
        this.showDeletePopup = false
        this.$message.success(this.$options.filters.localize('successfulFolderDelete'))
      }).finally(() => {
        this.deleteLoading = false
        this._getCategoryTree()
      })
    },
    _createFolder () {
      this.newFolderLoading = true
      const data = {
        pos: '',
        action: '',
        blind: '',
        note: '',
        name: this.newFolderName,
        parent_id: this.parentId,
        root_id: this.rootId
      }
      this.$store.dispatch('poker/createCategory', data).then(() => {
        this.$message.success(this.$options.filters.localize('successfulFolderCreate'))
        this._resetNewFolder()
        this._getCategoryTree()
      }).finally(() => { this.newFolderLoading = false })
    },
    _resetNewFolder () {
      this.newFolderLoading = false
      this.newFolderMode = false
      this.newFolderName = ''
    },
    _changeNewFolderMode () {
      if (this.hasBlind) {
        this.showNewBlindPopup = true
      } else {
        this.newFolderMode = !this.newFolderMode
        this.$nextTick(() => {
          this.$refs.newFolderInput.focus()
        })
      }
    },
    _copyUp (item) {
      this.$emit('onCopyElementUp', item)
    },
    _copyDown (item) {
      this.$emit('onCopyElementDown', item)
    },
    _moveUp (item) {
      this.$emit('onMoveElementUp', item)
    },
    _moveDown (item) {
      this.$emit('onMoveElementDown', item)
    },
    _slideMenu (item) {
      item.is_open = !item.is_open
      const data = Object.assign({}, item)
      this.$store.dispatch('poker/updateCategory', data)
    },
    _addNewBlind () {
      this.newBlindLoading = true
      if (this.newBlind.id) {
        this.$store.dispatch('poker/updateCategory', this.newBlind).then(() => {
          this.$message.success(this.$options.filters.localize('successfulFolderRenew'))
          this._resetNewBlind()
          this._getCategoryTree()
        }).finally(() => { this.newBlindLoading = false })
      } else {
        this.$store.dispatch('poker/createCategory', this.newBlind).then(() => {
          this.$message.success(this.$options.filters.localize('successfulFolderCreate'))
          this._resetNewBlind()
          this._getCategoryTree()
        }).finally(() => { this.newBlindLoading = false })
      }
    },
    _resetNewBlind () {
      this.showNewBlindPopup = false
      this.newBlind.id = null
      this.newBlind.name = ''
      this.newBlind.blind = ''
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .folders {
    margin-top: 15px;

    &__item {
      margin-bottom: 20px;
      padding-left: 10px;
      margin-top: 5px;
    }
  }

  .folder {
    position: relative;

    &__list-item {
      position: relative;
    }

    &__label {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      padding-left: 55px;
      cursor: pointer;

      &::before {
        content: '';
        display: block;
        width: 30px;
        height: 2px;
        background: $main-gray;
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
      }

      &--new {
        padding-left: 30px;
        &::before {
          display: none;
        }
      }
    }

    &__button {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 8px;
      border: 2px solid $main-green;
      position: absolute;
      top: 0;
      left: 5px;
      background: $background-color;
      z-index: 1;
      cursor: pointer;

      &::before {
        content: '';
        display: block;
        width: 8px;
        height: 2px;
        background: $main-green;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all .2s ease;
      }

      &::after {
        content: '';
        display: block;
        width: 8px;
        height: 2px;
        background: $main-green;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all .2s ease;
      }

      &--active {
        &::after {
          width: 2px;
          height: 8px;
        }
      }
    }

    &__new-folder {
      position: absolute;
      top: 0;
      left: 10px;
      z-index: 1;

      svg {
        fill: $main-green;
        width: 18px;
        height: 18px;
      }
    }
  }

  .new-folder-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid $main-gray;
    color: #fff;
    padding: 3px 7px;
    width: calc(100% - 10px);
  }

  .blind-popup {
    &__title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

    &__main {
      margin-top: 30px;
    }
  }

  .blind-form {
    &__row {
      width: 100%;
      margin-bottom: 20px;
    }

    &__item {
      width: 100%;
      padding: 0 7px;
    }

    &__input {
      width: 100%;
    }

    &__label {
      font-size: 13px;
      margin-bottom: 5px;
    }

    &__footer {
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
    }
  }

  .folders-parent {
    .folders--closed {
      margin: 0;
    }
  }
</style>
