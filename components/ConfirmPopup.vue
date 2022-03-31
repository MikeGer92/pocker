<template>
  <transition name="fade2">
    <div
      v-if="value"
      class="confirm-popup"
    >
      <div
        v-loading="loading"
        class="confirm-popup__wrapper"
        :style="{
          width: width
        }"
      >
        <div class="confirm-popup__title">
          {{ title }}
        </div>
        <div class="confirm-popup__text">
          <slot name="text">
            {{ text }}
          </slot>
        </div>
        <div class="confirm-popup__footer">
          <slot name="footer">
            <Rl-button
              color="gray"
              @click="_closePopup"
            >
              {{ rejectLabel }}
            </Rl-button>
            <Rl-button
              @click="_onConfirm"
            >
              {{ acceptLabel }}
            </Rl-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConfirmPopup',
  props: {
    value: {
      type: Boolean,
      default: () => false
    },
    width: {
      type: String,
      default: () => '400px'
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: () => ''
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    acceptLabel: {
      type: String,
      default: () => 'Delete'
    },
    rejectLabel: {
      type: String,
      default: () => 'Cancel'
    }
  },
  beforeDestroy () {
    this.$emit('onClose')
  },
  methods: {
    _onConfirm () {
      this.$emit('onConfirm')
    },
    _closePopup () {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .confirm-popup {
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
      position: relative;
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

    &__text {
      margin-top: 30px;
      font-size: 14px;
      text-align: center;
    }

    &__footer {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>
