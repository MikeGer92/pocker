<template>
  <div class="equity">
    <div class="column-header">
      <div class="column-header__title">
        {{ 'heatEquity' | localize }}
      </div>
    </div>
    <div
      v-loading="calcLoading"
      class="equity__main"
    >
      <div class="equity__blocks">
        <div class="equity__block">
          <div class="equity__block-title">
            {{ 'increaseEv' | localize }}
          </div>
          <div class="equity__list">
            <div
              v-if="increasesItems.length === 0"
              class="equity__empty-text"
            >
              {{ 'increaseEvText' | localize }}
            </div>
            <div
              v-for="(item, index) in increasesItems"
              v-else
              :key="'heat-' + index"
              :class="{
                'equity__item': true
              }"
              :style="{
                background: _getBackgroundColor(item),
                color: _getColor(item)
              }"
            >
              <div class="equity__card">
                {{ item.card }}
              </div>
              <div class="equity__percent">
                {{ Math.round(item.chance * 10) / 10 }}
              </div>
            </div>
          </div>
        </div>
        <div class="equity__block">
          <div class="equity__block-title">
            {{ 'invariablyEv' | localize }}
          </div>
          <div class="equity__list">
            <div
              v-if="invariablyItems.length === 0"
              class="equity__empty-text"
            >
              {{ 'invariablyEvText' | localize }}
            </div>
            <div
              v-for="(item, index) in invariablyItems"
              v-else
              :key="'heat-' + index"
              :class="{
                'equity__item': true
              }"
              :style="{
                background: _getBackgroundColor(item),
                color: _getColor(item)
              }"
            >
              <div class="equity__card">
                {{ item.card }}
              </div>
              <div class="equity__percent">
                {{ Math.round(item.chance * 10) / 10 }}
              </div>
            </div>
          </div>
        </div>
        <div class="equity__block">
          <div class="equity__block-title">
            {{ 'reducesEv' | localize }}
          </div>
          <div class="equity__list">
            <div
              v-if="reducesItems.length === 0"
              class="equity__empty-text"
            >
              {{ 'reducesEvText' | localize }}
            </div>
            <div
              v-for="(item, index) in reducesItems"
              v-else
              :key="'heat-' + index"
              :class="{
                'equity__item': true
              }"
              :style="{
                background: _getBackgroundColor(item),
                color: _getColor(item)
              }"
            >
              <div class="equity__card">
                {{ item.card }}
              </div>
              <div class="equity__percent">
                {{ Math.round(item.chance * 10) / 10 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Equity',
  computed: {
    ...mapGetters({
      heat: 'poker/heat',
      calcLoading: 'poker/calcLoading'
    }),
    increasesItems () {
      return this.heat
        .filter(item => item.chance < 45)
        .reverse()
    },
    invariablyItems () {
      return this.heat
        .filter(item => item.chance >= 45 && item.chance < 55)
        .reverse()
    },
    reducesItems () {
      return this.heat
        .filter(item => item.chance > 55)
        .reverse()
    }
  },
  methods: {
    _getBackgroundColor (item) {
      if (item.chance < 45) {
        return '#EB4747'
      } else if (item.chance < 55) {
        return '#FFF000'
      } else {
        return '#00CA63'
      }
    },
    _getColor (item) {
      if (item.chance >= 45) {
        return '#444'
      } else {
        return '#fff'
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .equity {
    &__main {
      margin-top: 20px;
      position: relative;
    }

    &__block {
      margin-top: 20px;

      &:first-child {
        margin-top: 0;
      }
    }

    &__block-title {
      font-size: 16px;
      line-height: 19px;
    }

    &__list {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    &__item {
      width: 35px;
      height: 35px;
      margin-right: 4px;
      margin-bottom: 4px;
      color: #fff;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      text-align: center;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }

    &__card {
      font-size: 16px;
      line-height: 19px;
      width: 100%;
    }

    &__percent {
      font-size: 12px;
      line-height: 14px;
      width: 100%;
    }

    &__empty-text {
      font-size: 12px;
      text-align: center;
      line-height: 140%;
      color: $main-gray;
    }
  }
</style>
