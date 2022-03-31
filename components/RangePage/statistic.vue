<template>
  <div class="statistic">
    <div class="column-header">
      <div class="column-header__title">
        {{ 'statisticText' | localize }}
      </div>
    </div>
    <div
      v-loading="calcLoading"
      class="statistic__main"
    >
      <div
        v-if="statistics.length === 0"
        class="statistic__empty"
      >
        {{ 'display' | localize }}
      </div>
      <div class="statistic__block-stats">
        <div
          v-for="(statItem, statIndex) in statistics"
          :key="'stat-item-' + statIndex"
          class="statistic__block"
        >
          <div class="statistic__block-title">
            {{ statItem.label }}
          </div>
          <div class="statistic__block-wrapper">
            <stat-line
              v-for="(item, index) in statItem.items"
              :key="'statistic-line-' + index"
              :label="item.label"
              :combinations="Math.round(Number(item.amount) * 100) / 100"
              :percent="Math.round(Number(item.amount) / Number(totals) * 10000) / 100"
              :color="statItem.color"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StatLine from '@/components/StatLine'

export default {
  name: 'Statistic',
  components: {
    StatLine
  },
  computed: {
    ...mapGetters({
      statistics: 'poker/statistics',
      totals: 'poker/totals',
      calcLoading: 'poker/calcLoading'
    })
  }
}
</script>

<style lang="scss">
  .statistic {
    &__main {
      width: 100%;
      position: relative;
    }

    &__block {
      margin-top: 20px;
    }

    &__block-stats {
      margin-top: 20px;
    }

    &__block-title {
      margin-bottom: 20px;
      font-size: 16px;
    }

    &__empty {
      margin-top: 20px;
      font-size: 14px;
      line-height: 140%;
      text-align: center;
    }
  }
</style>
