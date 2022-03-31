<template>
  <div class="left-menu__categories">
    <div
      v-for="item in items"
      :key="'category-' + item.id"
      class="left-menu__category"
    >
      <div
        :class="{
          'left-menu__category-label': true,
          'left-menu__category-label--active': item.is_open
        }"
        @click="_slideMenu(item)"
        @contextmenu.prevent="$refs.menu.open($event, item)"
      >
        <template v-if="item.edit_mode">
          <input
            :ref="'newCategoryInput-' + item.id"
            v-model="item.new_name"
            type="text"
            class="new-category-input"
            :disabled="item.loading"
            @keyup.enter="_updateCategory(item)"
            @keyup.esc="_cancelUpdateCategory(item)"
            @blur="_cancelUpdateCategory(item)"
          >
        </template>
        <template v-else>
          {{ item.name }}
        </template>
      </div>
      <folders-tree
        v-show-slide="item.is_open"
        :items="item.children"
        :label="item.create_label"
        :parent-id="item.id"
        :root-id="rootId"
        :parent-is-open="item.is_open"
        :has-blind="hasBlind"
        @change="_getCategoryTree"
        @onCopyElementUp="copyUp"
        @onCopyElementDown="copyDown"
        @onMoveElementUp="moveUp"
        @onMoveElementDown="moveDown"
      />
    </div>
    <div
      class="left-menu__category"
    >
      <div
        class="left-menu__category-label left-menu__category-label--new"
      >
        <template v-if="newCategoryMode">
          <input
            ref="newCategoryInput"
            v-model="newCategoryName"
            type="text"
            class="new-category-input"
            :disabled="newCategoryLoading"
            @keyup.enter="_createCategory"
            @keyup.esc="_resetNewCategory"
            @blur="_resetNewCategory"
          >
        </template>
        <template v-else>
          <span @click="_changeNewCategoryMode">
            {{ label | localize }}
          </span>
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
            @click="_openSharePopup(child.data)"
          >
            {{ 'shareText' | localize }}
          </a>
        </li>

        <li>
          <a
            href="#"
            @click.prevent="moveUp(child.data)"
          >
            {{ 'moveUpText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="moveDown(child.data)"
          >
            {{ 'moveDownText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="copyUp(child.data)"
          >
            {{ 'copyUpText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="copyDown(child.data)"
          >
            {{ 'copyDownText' | localize }}
          </a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="_changeEditCategoryMode(child.data)"
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
        :title="'deleteCategoryTitle' | localize"
        :text="'deleteCategoryText' | localize"
        :loading="deleteLoading"
        @onConfirm="_deleteCategory"
        @onClose="deletingCategory = null"
      />
    </transition>
    <transition name="fade2">
      <popup
        v-model="showSharePopup"
        v-loading="sharingLoading"
        @onClose="_hideSharePopup"
      >
        <div class="share">
          <el-select
            v-model="selectedUsers"
            multiple
            filterable
            remote
            reserve-keyword
            style="width: 100%;"
            :placeholder="'selectUsersText' | localize"
            :remote-method="_getUsers"
            :loading="usersLoading"
          >
            <el-option
              v-for="user in users"
              :key="`user-${user.id}`"
              :label="user.username"
              :value="user.id"
            />
          </el-select>
          <!-- <multiselect
            v-model="selectedUsers"
            :options="users"
            :multiple="true"
            label="username"
            track-by="id"
            :close-on-select="false"
            :placeholder="'selectUsersText' | localize"
            :loading="usersLoading"
            @search-change="_getUsers"
          /> -->
          <div class="share__footer">
            <rl-button
              color="gray"
              @click="_hideSharePopup"
            >
              {{ 'cancelText' | localize }}
            </rl-button>
            <rl-button @click="_share">
              {{ 'shareText' | localize }}
            </rl-button>
          </div>
        </div>
      </popup>
    </transition>
  </div>
</template>

<script>
import FoldersTree from '~/components/FoldersTree'

export default {
  name: 'CategoryTree',
  components: {
    FoldersTree
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
      newCategoryMode: false,
      newCategoryLoading: false,
      newCategoryName: '',
      showDeletePopup: false,
      deletingCategory: null,
      deleteLoading: false,
      showSharePopup: false,
      users: [],
      usersLoading: false,
      selectedUsers: '',
      sharingCategory: null,
      sharingLoading: false
    }
  },
  methods: {
    _getUsers (name = '') {
      const params = {
        username: name
      }
      this.usersLoading = true
      this.$store.dispatch('user/findUsers', params).then((users) => {
        this.users = users
        // eslint-disable-next-line no-console
        console.log(this.users)
      }).finally(() => { this.usersLoading = false })
    },
    _updateCategory (item) {
      item.loading = true
      const data = Object.assign({}, item)
      data.name = data.new_name
      this.$store.dispatch('poker/updateCategory', data).then(() => {
        item.name = item.new_name
        item.edit_mode = false
        this.$message.success(this.$options.filters.localize('successfulCategoryRenew'))
      }).finally(() => {
        item.loading = false
        this._getCategoryTree()
      })
    },
    _cancelUpdateCategory (item) {
      item.new_name = item.name
      item.edit_mode = false
    },
    _createCategory () {
      this.newCategoryLoading = true
      const data = {
        pos: '',
        action: '',
        blind: '',
        parent_id: this.parentId,
        root_id: this.rootId,
        note: '',
        name: this.newCategoryName
      }
      this.$store.dispatch('poker/createCategory', data).then(() => {
        this.$message.success(this.$options.filters.localize('successfulCategoryCreate'))
        this._resetNewCategory()
      }).finally(() => {
        this._getCategoryTree()
        this.newCategoryLoading = false
      })
    },
    _resetNewCategory () {
      this.newCategoryLoading = false
      this.newCategoryMode = false
      this.newCategoryName = ''
    },
    _showDeleteDialog (item) {
      this.deletingCategory = item
      this.showDeletePopup = true
    },
    _deleteCategory () {
      this.deleteLoading = true
      this.$store.dispatch('poker/deleteCategory', this.deletingCategory.id).then(() => {
        this.showDeletePopup = false
        this.$message.success(this.$options.filters.localize('successfulCategoryDelete'))
      }).finally(() => {
        this._getCategoryTree()
        this.deleteLoading = false
      })
    },
    _getCategoryTree () {
      this.$emit('change')
    },
    _changeEditCategoryMode (item) {
      item.edit_mode = true
      this.$nextTick(() => {
        this.$refs['newCategoryInput-' + item.id][0].focus()
      })
    },
    _changeNewCategoryMode () {
      this.newCategoryMode = !this.newCategoryMode
      this.$nextTick(() => {
        this.$refs.newCategoryInput.focus()
      })
    },
    copyUp (item) {
      this.$emit('changeLoadingState', true)
      this.$store.dispatch('poker/copyCategoryUp', item.id).then(() => {
        this.$message.success(this.$options.filters.localize('successfulCategoryCopy'))
        this._getCategoryTree()
      }).catch(() => {
        this.$emit('changeLoadingState', false)
      })
    },
    copyDown (item) {
      this.$emit('changeLoadingState', true)
      this.$store.dispatch('poker/copyCategoryDown', item.id).then(() => {
        this.$message.success(this.$options.filters.localize('successfulCategoryCopy'))
        this._getCategoryTree()
      }).catch(() => {
        this.$emit('changeLoadingState', false)
      })
    },
    moveUp (item) {
      this.$emit('changeLoadingState', true)
      this.$store.dispatch('poker/moveCategoryUp', item.id).then(() => {
        this.$message.success(this.$options.filters.localize('successfulCategoryMove'))
        this._getCategoryTree()
      }).catch(() => {
        this.$emit('changeLoadingState', false)
      })
    },
    moveDown (item) {
      this.$emit('changeLoadingState', true)
      this.$store.dispatch('poker/moveCategoryDown', item.id).then(() => {
        this.$message.success(this.$options.filters.localize('successfulCategoryMove'))
        this._getCategoryTree()
      }).catch(() => {
        this.$emit('changeLoadingState', false)
      })
    },
    _openSharePopup (category) {
      this._getUsers()
      this.showSharePopup = true
      this.sharingCategory = category.id
    },
    _hideSharePopup () {
      this.showSharePopup = false
      this.sharingCategory = null
      this.users = []
      this.selectedUsers = ''
    },
    _share () {
      // eslint-disable-next-line no-console
      console.log(this.selectedUsers)
      // =================================================
      // Шарить можно только 1 пользователю за раз
      // =================================================
      const data = {
        receivers: this.selectedUsers
        // category: this.sharingCategory
      }

      this.sharingLoading = true
      this.$axios.post(`/api/v1/categories/${this.sharingCategory}/share`, data).then((response) => {
        this.$message.success(this.$options.filters.localize('successfulSharing'))
        this._hideSharePopup()
      }).finally(() => { this.sharingLoading = false })
      this._hideSharePopup()
    },
    _slideMenu (item) {
      item.is_open = !item.is_open
      const data = Object.assign({}, item)
      this.$store.dispatch('poker/updateCategory', data)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';
  .left-menu {
    &__category-label {
      background: $main-gray;
      padding: 10px;
      display: block;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;
      position: relative;

      &::after {
        content: '▲';
        transform: rotate(180deg);
        transition: all 0.2s ease-in;
        margin-left: 4px;
        font-size: 11px;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      &--active {
        &::after {
          transform: rotate(0);
        }
      }

      &--new {
        display: flex;
        align-items: center;

        &::after {
          display: none;
        }

        &::before {
          content: '+';
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 18px;
          border: 2px solid #fff;
          margin-right: 15px;
          flex-shrink: 0;
          flex-grow: 0;
        }
      }
    }
  }

  .new-category-input {
    width: calc(100% - 38px);
    background: transparent;
    border-radius: 3px;
    border: 1px solid #fff;
    color: #fff;
    padding: 3px 7px;
    box-shadow: none;

    &:disabled {
      color: $form-background;
      border-color: $form-background;
    }
  }

  .share {
    &__footer {
      margin-top: 30px;
      text-align: right;
    }
  }
  .el-select-dropdown  {
    min-width: 400px;
    background-color: #fff;
  }
</style>
