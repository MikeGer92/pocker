<template>
  <div class="board">
    <div class="column-header">
      <div class="column-header__title">
        {{ 'holeCards' | localize }}
      </div>
    </div>
    <div class="board__main">
      <card
        v-for="card in all_cards"
        :key="'hole-card-' + card"
        :card="card"
        table="hole"
      />
    </div>
    <div class="board__stats">
      <div
        v-if="hand"
        class="board__stat-text"
      >
        <div>{{ 'handEquity' | localize }}: {{ _getHandPercent() }}%</div>
        <div>{{ 'rangeEquity' | localize }}: {{ _getRangePercent() }}%</div>
      </div>
      <rl-button
        style="min-width: 113px !important; margin-top: 15px;"
        @click="_clearHoleCards"
      >
        {{ 'clearText' | localize }}
      </rl-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Hole',
  computed: {
    ...mapGetters({
      all_cards: 'poker/all_cards',
      hand: 'poker/hand',
      matrix: 'poker/matrix',
      categoryId: 'poker/categoryId'
    })
  },
  watch: {
    categoryId () {
      this._clearHoleCards()
    }
  },
  methods: {
    changeCardState (card) {
      this.$store.dispatch('poker/changeHoleCardState', card)
    },
    _clearHoleCards () {
      this.$store.dispatch('poker/clearHoleCards')
    },
    _getHandPercent () {
      return Math.round(this.hand * 100) / 100
    },
    _getRangePercent () {
      return Math.round((100 - this._getHandPercent()) * 100) / 100
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .board {
    &__stats {
      // margin-top: 20px;
      // padding: 15px 7px 20px;
      background: 161616;
      width: 100%;
      text-align: center;
    }

    &__stat-text {
      font-size: 14px;
      line-height: 18px;
    }
  }
</style>
