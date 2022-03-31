<template>
  <div
    class="combination-item"
    @click="_onClick()"
  >
    <div class="combination-item__label">
      {{ item.label }}
    </div>
    <div class="combination-item__colors">
      <div
        v-for="(color, index) in item.colors"
        :key="color + '-' + index + '-' + uid"
        class="combination-item__color"
        :style="{
          height: color.weight + '%',
          background: color.color
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CombinationItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      uid: this._uid
    }
  },
  methods: {
    _onClick () {
      this.$emit('click', this.item)
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .combination-item {
    width: 35px;
    height: 35px;
    margin-right: 4px;
    margin-bottom: 4px;
    background: $main-gray;
    font-size: 16px;
    transition: all 0.2s ease;
    cursor: pointer;
    position: relative;

    &:hover {
      transform: translateY(-1px);
    }

    &:nth-child(13n) {
      margin-right: 0;
    }

    &__label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    &__colors {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      align-content: flex-end;
    }

    &__color {
      width: 100%;
    }
  }

  .fade2-enter-active, .fade2-leave-active {
    transition: opacity 0.3s;
  }
  .fade2-enter, .fade2-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  @media (min-width: 640px) and (max-width: 800px){
    .combination-item {
      width: 32px;
    }
  }
  @media (min-width: 480px) and (max-width: 640px){
    .combination-item {
      width: 31px;
      height: 33px;
      margin-right: 4px;
      margin-bottom: 4px;
      font-size: 15px;
    }
  }
  @media (min-width: 375px) and (max-width: 480px){
    .combination-item {
      width: 26px;
      height: 28px;
      margin-right: 2px;
      margin-bottom: 2px;
      font-size: 12px;
    }
  }
  @media (min-width: 320px) and (max-width: 375px){
    .combination-item {
      width: 22px;
      height: 23px;
      margin-right: 2px;
      margin-bottom: 2px;
      font-size: 10px;
    }
  }
  @media (max-width: 320px){
    .combination-item {
      width: 22px;
      height: 23px;
      margin-right: 2px;
      margin-bottom: 2px;
      font-size: 10px;
    }
  }

</style>
