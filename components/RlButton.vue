<template>
  <div
    :class="{
      'rl-button': true,
      'rl-button--gray': color === 'gray',
      'rl-button--plain': plain,
      'rl-button--disabled': disabled
    }"
    :style="{
      background: !plain && color !== 'default' && color === 'gray' ? '#646464' : color,
      'border-color': color !== 'default' && color === 'gray' ? '#646464' : color
    }"
    @click="_onclick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RlButton',
  props: {
    plain: {
      type: Boolean,
      default: () => false
    },
    color: {
      type: String,
      default: () => 'default'
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    _onclick () {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .rl-button {
    min-width: 149px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: $main-green;
    color: #fff;
    transition: all 0.2s ease;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    border: 1px solid $main-green;
    padding: 0 20px;
    position: relative;

    & + .rl-button {
      margin-left: 20px;
    }

    &--gray {
      background: $main-gray;

      &:hover {
        background: $main-gray-hover;
      }
    }

    &--plain {
      background: transparent;
    }

    &:hover {
      background: $main-green-hover;
    }

    &--disabled {
      cursor: not-allowed;
      border: none;

      &:hover {
        background: inherit;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        z-index: 1;
        background: #000;
        opacity: .7;
      }
    }
  }
</style>
