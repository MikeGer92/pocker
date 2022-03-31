<template>
  <div class="rl-input">
    <input
      :value="value"
      :class="{
        'rl-input__input': true,
        'rl-input__input--can-copy': canCopy
      }"
      :type="isPassword ? 'password' : 'text'"
      :disabled="disabled"
      :placeholder="placeholder"
      @keyup.enter="_onEnter"
      @keyup.esc="_onEsc"
      @input="_onChange"
    >
    <div
      v-if="canCopy"
      v-clipboard:copy="value"
      v-clipboard:success="_copyText"
      class="rl-input__copy-btn"
    />
  </div>
</template>

<script>
export default {
  name: 'RlInput',
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    isPassword: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    canCopy: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    _onChange (e) {
      this.$emit('input', e.target.value)
    },
    _onEnter () {
      this.$emit('onEnter')
    },
    _onEsc () {
      this.$emit('onEsc')
    },
    _copyText () {
      this.$message.success('Text was successfully copied')
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .rl-input {
    width: 100%;
    position: relative;

    &__input {
      width: 100%;
      height: 40px;
      border: 1px solid $input-border-color;
      border-radius: 3px;
      background: $form-background;
      padding: 0 20px;
      font-size: 14px;
      line-height: 16px;
      color: #fff;
      outline: none;
      transition: all 0.4s ease;

      &--can-cpy {
        padding-right: 50px;
      }

      //&:disabled {
      //  background: $input-border-color;
      //}

      &:focus {
        border-color: $main-green;
      }

      &::-webkit-input-placeholder { color: #fff; text-align: center }
      &::-moz-placeholder          { color: #fff; text-align: center }
      &:-moz-placeholder           { color: #fff; text-align: center }
      &:-ms-input-placeholder      { color: #fff; text-align: center }
    }

    &__copy-btn {
      width: 20px;
      height: 20px;
      background: url("~@/assets/icons/copy.svg") no-repeat center center;
      background-size: cover;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
</style>
