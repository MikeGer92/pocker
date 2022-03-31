<template>
  <div
    v-if="items.length > 0"
    class="rl-radio-group"
  >
    <div class="rl-radio-label">
      {{ label }}
    </div>
    <div class="rl-radio-buttons">
      <div
        v-for="(item, index) in items"
        :key="'radio-' + item.id + '-' + index +'-' + uid"
        :class="{
          'rl-radio-buttons__item': true,
          'rl-radio-buttons__item--active': item.value === value
        }"
        @click="_changeActiveButton(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RlRadio',
  props: {
    value: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      default: () => ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      uid: this._uid
    }
  },
  methods: {
    _changeActiveButton (item) {
      this.$emit('input', item.value)
      this.$emit('change', item.value)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .rl-radio-group {
    display: flex;
    align-items: center;
  }

  .rl-radio-label {
    color: #fff;
    font-size: 16px;
    line-height: 19px;
    margin-right: 9px;
  }

  .rl-radio-buttons {
    height: 29px;
    border: 1px solid $input-border-color;
    padding: 1px;
    border-radius: 29px;
    background: $background-color;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__item {
      font-size: 14px;
      color: #999;
      transition: all 0.2s ease;
      height: 100%;
      width: 25px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      &--active {
        background: $main-green;
        color: #fff;
      }
    }
  }
</style>
