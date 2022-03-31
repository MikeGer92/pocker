<template>
  <div class="rl-tabs">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RlTabs',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    changeActiveTab (tabName) {
      this.$emit('changeActiveTab', tabName)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .rl-tabs {
    border: 1px solid $main-green;
    background: $background-color;
    display: inline-flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    padding: 5px;
  }
</style>
