<template>
  <div
    class="rl-input-button"
    @click="_onclick()"
  >
    <div class="rl-input-button__label">
      {{ label }}
    </div>
    <count-to
      :start-val="startVal"
      :end-val="endVal"
      :duration="1000"
      class="rl-input-button__input"
    />
  </div>
</template>

<script>
import countTo from 'vue-count-to'

export default {
  name: 'RlInputButton',
  components: {
    countTo
  },
  props: {
    label: {
      type: String,
      default: () => ''
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      startVal: 0,
      endVal: 0
    }
  },
  watch: {
    value (val) {
      this.startVal = this.endVal
      this.endVal = val
    }
  },
  methods: {
    _onclick () {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .rl-input-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border: 1px solid $main-green;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: $form-background;
    }

    &__label {
      font-size: 14px;
      margin-right: 6px;
    }

    &__input {
      width: 50px;
      height: 28px;
      border: 1px solid $input-border-color;
      background: $form-background;
      border-radius: 20px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
