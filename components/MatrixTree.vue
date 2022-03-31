<template>
  <div class="matrix">
    <div class="matrix__list">
      <div
        v-for="item in items"
        :key="'matrix-' + item.id"
        class="matrix__list-item"
        :class="{
          'matrix__list-item--active': categoryId === item.id
        }"
        @contextmenu.prevent="$refs.menu.open($event, item)"
        @click="_onMatrixClick(item)"
      >
        {{ item.name }}
      </div>
      <div
        class="matrix__list-item"
        @click="_initPopup()"
      >
        {{ 'newRange' | localize }}
      </div>
    </div>
    <transition name="fade2">
      <div
        v-if="showPopup"
        class="matrix-popup"
        @click.self="showPopup = false"
      >
        <div
          v-loading="newMatrixLoading"
          class="matrix-popup__wrapper"
        >
          <div class="matrix-popup__title">
            {{ 'newRange' | localize }}
          </div>
          <form class="matrix-popup__form matrix-form">
            <div class="matrix-form__row">
              <div class="matrix-form__item">
                <div class="matrix-form__label">
                  {{ 'pos' | localize }}
                </div>
                <Rl-input
                  v-model="newMatrix.pos"
                  :disabled="newMatrixLoading"
                />
              </div>
              <div class="matrix-form__item">
                <div class="matrix-form__label">
                  {{ 'subtitle' | localize }}
                </div>
                <Rl-input
                  v-model="newMatrix.name"
                  :disabled="newMatrixLoading"
                />
              </div>
              <div class="matrix-form__item">
                <div class="matrix-form__label">
                  {{ 'action' | localize }}
                </div>
                <Rl-input
                  v-model="newMatrix.action"
                  :disabled="newMatrixLoading"
                />
              </div>
            </div>
            <div class="matrix-form__row">
              <div class="matrix-form__textarea">
                <div class="matrix-form__label">
                  {{ 'notes' | localize }}
                </div>
                <textarea
                  v-model="newMatrix.note"
                  class="matrix-form__notes"
                  :disabled="newMatrixLoading"
                />
              </div>
            </div>
            <div class="matrix-form__footer">
              <Rl-button
                color="gray"
                @click="_resetNewMatrix"
              >
                {{ 'cancelText' | localize }}
              </Rl-button>
              <Rl-button @click="_addMatrix">
                {{ 'save' | localize }}
              </Rl-button>
            </div>
          </form>
        </div>
      </div>
    </transition>
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
            @click.prevent="_initPopup(child.data)"
          >
            {{ 'editText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click="_showDeleteDialog(child.data)"
          >
            {{ 'removeText' | localize }}
          </a>
        </li>
      </template>
    </vue-context>
    <transition name="fade2">
      <confirm-popup
        v-model="showDeletePopup"
        :title="'deleteRangeTitle' | localize"
        :text="'deleteRangeText' | localize"
        :loading="deleteLoading"
        @onConfirm="_deleteMatrix"
        @onClose="deletingMatrix = null"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MatrixTree',
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
    }
  },
  data () {
    return {
      showPopup: false,
      newMatrix: {
        name: '',
        pos: '',
        action: '',
        note: '',
        blind: '',
        parent_id: this.parentId,
        root_id: this.rootId,
        id: null,
        is_open: true
      },
      showDeletePopup: false,
      deleteLoading: false,
      deletingMatrix: null,
      newMatrixLoading: false
    }
  },
  computed: {
    categoryId () {
      return this.$store.getters['poker/categoryId']
    }
  },
  methods: {
    _onMatrixClick (matrix) {
      this.$store.dispatch('poker/setCategoryId', matrix.id)
    },
    _initPopup (item = null) {
      this.showPopup = true
      if (item) {
        this.newMatrix.name = item.name
        this.newMatrix.pos = item.pos
        this.newMatrix.action = item.action
        this.newMatrix.blind = item.blind
        this.newMatrix.note = item.note
        this.newMatrix.id = item.id
        this.newMatrix.is_open = item.is_open
        this.newMatrix.rangedisplay1 = item.rangedisplay1
        this.newMatrix.rangedisplay2 = item.rangedisplay2
        this.newMatrix.buttons = item.buttons
      }
    },
    _resetNewMatrix () {
      this.newMatrix.name = ''
      this.newMatrix.pos = ''
      this.newMatrix.action = ''
      this.newMatrix.note = ''
      this.newMatrix.blind = ''
      this.newMatrix.id = null
      this.showPopup = false
    },
    _addMatrix () {
      this.newMatrixLoading = true
      if (this.newMatrix.id) {
        this.$store.dispatch('poker/updateCategory', this.newMatrix).then((response) => {
          this._resetNewMatrix()
          this.$message.success(this.$options.filters.localize('successfulRangeRenew'))
          if (response.id === this.categoryId) {
            this.$store.dispatch('poker/setCategoryId', null)
            setTimeout(() => {
              this.$store.dispatch('poker/setCategoryId', response.id)
            }, 10)
          }
          this._getCategoryTree()
        }).finally(() => { this.newMatrixLoading = false })
      } else {
        const data = Object.assign({}, this.newMatrix)
        delete data.id
        this.$store.dispatch('poker/createCategory', data).then(() => {
          this._resetNewMatrix()
          this.$message.success(this.$options.filters.localize('successfulRangeCreate'))
          this._getCategoryTree()
        }).finally(() => { this.newMatrixLoading = false })
      }
    },
    _showDeleteDialog (matrix) {
      this.showDeletePopup = true
      this.deletingMatrix = matrix
    },
    _deleteMatrix () {
      this.deleteLoading = true
      this.$store.dispatch('poker/deleteCategory', this.deletingMatrix.id).then(() => {
        this.showDeletePopup = false
        this.$message.success(this.$options.filters.localize('successfulRangeDelete'))
        this._getCategoryTree()
        if (this.categoryId === this.deletingMatrix.id) {
          this.$store.dispatch('poker/setCategoryId', null)
        }
      }).finally(() => { this.deleteLoading = false })
    },
    _getCategoryTree () {
      this.$emit('change')
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
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .matrix {
    position: relative;

    &__list {
      padding-left: 70px;
      position: relative;
    }

    &__list-item {
      padding-top: 13px;
      font-size: 14px;
      line-height: 16px;
      position: relative;
      z-index: 1;
      cursor: pointer;

      &--active {
        color: $main-green;
        font-weight: bold;
      }

      &::before {
        content: '';
        display: block;
        width: 30px;
        height: 100%;
        border-left: 2px solid $main-gray;
        border-bottom: 2px solid $main-gray;
        position: absolute;
        left: -38px;
        bottom: 7px;
      }
    }
  }
  .matrix-popup {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;

    &__wrapper {
      width: 600px;
      border: 1px solid $main-gray;
      padding: 20px;
      border-radius: 5px;
      background: $form-background;
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

    &__form {
      margin-top: 30px;
    }
  }
  .matrix-form {
    &__row {
      margin-bottom: 20px;
      display: flex;
    }

    &__item {
      width: 33%;
      padding: 0 7px;
    }

    &__input {
      width: 100%;
    }

    &__textarea {
      padding: 0 7px;
      width: 100%;
    }

    &__label {
      font-size: 13px;
      margin-bottom: 5px;
    }

    &__notes {
      width: 100%;
      height: 80px;
      font-size: 14px;
      border: 1px solid $input-border-color;
      border-radius: 3px;
      background: $form-background;
      padding: 10px;
      color: #fff;
    }

    &__footer {
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
    }
  }
</style>
