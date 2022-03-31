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
      @change="_getCategoryTree"
      @changeLoadingState="(state) => { loading = state }"
    />
  </div>
</template>

<script>
import CategoryTree from '@/components/CategoryTree'

export default {
  name: 'Tree',
  components: {
    CategoryTree
  },
  data () {
    return {
      matrixesId: [],
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
  computed: {
    activeCategory () {
      return this.$store.getters['poker/categoryId']
    }
  },
  mounted () {
    this._getCategoryTree()
  },
  methods: {
    _getCategoryTree () {
      this.loading = true
      this.$store.dispatch('poker/getPreflopTree').then((response) => {
        this.parent_id = response.data.data.id
        this.label = response.data.data.create_label
        this.tree = response.data.data.children.map((item) => {
          const source2 = {
            edit_mode: false,
            new_name: item.name,
            loading: false
          }
          item.children = item.children.map((folder) => {
            folder.children = folder.children.map((matrix) => {
              const source4 = {
                new_subname: matrix.subname,
                new_pos: matrix.pos,
                new_action: matrix.action,
                edit_mode: false,
                loading: false
              }
              this.matrixesId.push(matrix.id)
              return Object.assign({}, matrix, source4)
            })
            const source3 = {
              edit_mode: false,
              new_name: folder.name,
              loading: false
            }
            return Object.assign({}, folder, source3)
          })
          return Object.assign({}, item, source2)
        })
      }).finally(() => {
        this.loading = false
        if (!this.activeCategory) {
          this.$store.dispatch('poker/setCategoryId', this.matrixesId[0])
        }
      })
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
