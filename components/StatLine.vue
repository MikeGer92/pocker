<template>
  <div class="stat-line">
    <div class="stat-line__label">
      {{ label }}
    </div>
    <div class="stat-line__graph">
      <div
        class="stat-line__filled"
        :style="{
          'width': percent + '%',
          'background-color': color
        }"
      />
      <div class="stat-line__text">
        <div class="stat-line__percent">
          {{ percent }}%
        </div>
        <div
          v-if="combinations"
          class="stat-line__combos"
        >
          ({{ combinations }})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatLine',
  props: {
    label: {
      type: String,
      required: true
    },
    percent: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: () => '#696969'
    },
    combinations: {
      type: Number,
      default: () => null
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .stat-line {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 4px;
    line-height: 120%;

    &__label {
      width: 123px;
      height: 100%;
      background: $form-background;
      padding: 4px 10px;
    }

    &__graph {
      position: relative;
      //height: 100%;
      width: calc(100% - 123px);
      display: flex;
    }

    //&__filled {
    //  height: 100%;
    //}

    &__text {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      z-index: 1;
      font-size: 13px;
      display: flex;
      align-items: center;
    }

    &__combos {
      margin-left: 5px;
    }
  }
</style>
