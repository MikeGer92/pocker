<template>
  <div
    v-loading="loading"
    class="tree"
  >
    <category-tree
      :items="tree"
      :parent-id="parent_id"
      :root-id="parent_id"
      :label="label"
      :has-blind="true"
      @change="_getCategoryTree"
      @changeLoadingState="(state) => { loading = state }"
    />
  </div>
</template>

<script>
import CategoryTree from '@/components/CategoryTree'

export default {
  name: 'TournamentTree',
  components: {
    CategoryTree
  },
  data () {
    return {
      showLeftMenu: true,
      loading: false,
      tree: [],
      label: '',
      parent_id: 0,
      newCategoryMode: false,
      newCategoryName: '',
      newCategoryLoading: false,
      newFolderName: '',
      newFolderLoading: false
    }
  },
  mounted () {
    this._getCategoryTree()
  },
  methods: {
    _getCategoryTree () {
      this.loading = true
      this.$store.dispatch('poker/getTournamentTree').then((response) => {
        this.parent_id = response.data.data.id
        this.label = response.data.data.create_label
        this.tree = response.data.data.children.map((item) => {
          const source = {
            edit_mode: false,
            new_name: item.name,
            loading: false
          }
          item.children = this.getCategoryChildren(item)

          return Object.assign({}, item, source)
        })
      }).finally(() => {
        this.loading = false
      })
    },
    getCategoryChildren (item) {
      if (item.has_ranges) {
        return item.children.map((matrix) => {
          const source = {
            new_subname: matrix.subname,
            new_pos: matrix.pos,
            new_action: matrix.action,
            edit_mode: false,
            loading: false
          }
          return Object.assign({}, matrix, source)
        })
      } else {
        return item.children.map((folder) => {
          const source = {
            edit_mode: false,
            new_name: folder.name,
            loading: false
          }
          folder.children = this.getCategoryChildren(folder)
          return Object.assign({}, folder, source)
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/_variables.scss';

.tree {
  min-height: 100vh;
  height: 100%;
  position: relative;
}

.context {
  background: $background-color;
  border: 1px solid $main-gray;

  li a {
    color: #fff;
    font-size: 14px;

    &:hover {
      background: $background-color;
      color: #c7c7c7;
    }
  }
}
</style>
