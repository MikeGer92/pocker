<template>
  <div
    :class="{
      'rl-select': true
    }"
  >
    <div
      :class="{
        'rl-select__active-item': true,
        'rl-select__active-item--active': showList,
        'rl-select__active-item--disabled': disabled
      }"
      @click="_showList()"
    >
      {{ getCurrentItem.label }}
    </div>
    <transition name="fade3">
      <div
        v-if="showList"
        class="rl-select__list"
      >
        <template v-if="items.length > 0">
          <vue-custom-scrollbar
            class="scroll-area"
            :settings="settings"
          >
            <div
              v-for="(item, index) in items"
              :key="item.value + '-' + index"
              class="rl-select__list-item"
              @click="_selectItem(item)"
            >
              {{ item.label }}
            </div>
          </vue-custom-scrollbar>
        </template>
        <template v-else>
          <div class="rl-select-item">
            List is empty
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'

export default {
  name: 'RlSelect',
  components: {
    vueCustomScrollbar
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      showList: false,
      settings: {
        maxScrollbarLength: 60,
        wheelPropagation: false
      }
    }
  },
  computed: {
    getCurrentItem () {
      let currentItem = null
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === this.value) {
          currentItem = this.items[i]
        }
      }
      return currentItem || ''
    }
  },
  methods: {
    _selectItem (item) {
      this.$emit('input', item.value)
      this.showList = false
    },
    _showList () {
      if (!this.disabled) {
        this.showList = !this.showList
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .scroll-area {
    max-height: 200px;
    position: relative;
  }

  .rl-select {
    width: 100%;
    position: relative;

    &__active-item {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 8px;
      background: $form-background;
      border: 1px solid $input-border-color;
      height: 40px;
      line-height: 140%;
      border-radius: 3px;
      font-size: 14px;
      cursor: pointer;

      &::after {
        content: '▲';
        transform: rotate(180deg);
        transition: all 0.2s ease-in;
        margin-left: 4px;
        font-size: 11px;
      }

      &--active::after {
        transform: rotate(0);
      }

      &--disabled {
        color: $main-gray;
        cursor: not-allowed;
      }
    }

    &__list {
      position: absolute;
      top: 45px;
      left: 0;
      width: 100%;
      background: $form-background;
      z-index: 1;
      overflow: hidden;
    }

    &__list-item {
      font-size: 14px;
      cursor: pointer;
      padding: 5px;
      text-align: center;

      &:hover {
        background: $main-gray-hover;
      }
    }
  }

  .fade3-enter-active, .fade3-leave-active {
    transition: opacity 0.3s;
  }
  .fade3-enter, .fade3-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  .rl-select-item {
    padding: 15px 10px;
  }
</style>
