<template>
  <transition name="fade2">
    <div
      v-if="value"
      class="popup"
    >
      <div
        class="popup__wrapper"
        :style="{
          width: width
        }"
      >
        <div
          class="popup__close-btn"
          @click="_closePopup()"
        />
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    value: {
      type: Boolean,
      default: () => true
    },
    width: {
      type: String,
      default: () => '750px'
    }
  },
  beforeDestroy () {
    this.$emit('onClose')
  },
  methods: {
    _closePopup () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .popup {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 20;

    &__wrapper {
      position: relative;
      padding: 50px;
      border-radius: 5px;
      background: $form-background;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
    }

    &__close-btn {
      position: absolute;
      top: 0;
      right: -28px;
      width: 20px;
      height: 20px;
      display: flex;
      cursor: pointer;
      transform: rotate(45deg);

      &:hover {
        color: $main-gray;
      }

      &::before {
        content: '';
        display: block;
        width: 20px;
        height: 2px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }

      &::after {
        content: '';
        display: block;
        height: 20px;
        width: 2px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
      }
    }
  }
</style>
