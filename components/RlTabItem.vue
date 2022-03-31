<template>
  <div
    :class="{
      'rl-tab-item': true,
      'rl-tab-item--active': activeTab === name
    }"
    :name="name"
    @click="_onTabClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RlTabItem',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    activeTab () {
      return this.$parent.value
    }
  },
  methods: {
    _onTabClick () {
      this.$parent.changeActiveTab(this.name)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .rl-tab-item {
    color: $main-gray;
    padding: 0 18px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    border-radius: 14px;
    font-size: 14px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #fff;
    }

    &--active {
      background: $main-green;
      color: #fff;
    }
  }
</style>
