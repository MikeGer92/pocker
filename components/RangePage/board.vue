<template>
  <div class="board">
    <div class="column-header">
      <div class="column-header__title">
        {{ 'selectBoard' | localize }}
      </div>
    </div>
    <div class="board__main">
      <card
        v-for="card in all_cards"
        :key="'board-card-' + card"
        :card="card"
        table="board"
      />
    </div>
    <div class="board__random">
      <template v-if="board_cards.length === 5">
        <rl-button @click="_clearSelectedCards">
          {{ 'clearText' | localize }}
        </rl-button>
      </template>
      <template v-else>
        <rl-button @click="_chooseRandomCards">
          {{ getRandomButtonTitle }}
        </rl-button>
      </template>
    </div>
    <div
      v-if="board_cards.length > 0"
      class="board__legend legend"
    >
      <div class="legend__cards">
        <card
          v-for="(card, index) in board_cards"
          :key="'legend-card-' + index"
          class="legend__card"
          :card="card"
          :no-action="true"
          :mini="true"
        />
      </div>
      <div class="legend__text">
        <transition name="slideDown">
          <div
            v-if="board_cards.length >= 3"
            class="legend__flop"
          >
            {{ 'flop' | localize }}
          </div>
        </transition>
        <transition name="slideDown">
          <div
            v-if="board_cards.length >= 4"
            class="legend__turn"
          >
            {{ 'turn' | localize }}
          </div>
        </transition>
        <transition name="slideDown">
          <div
            v-if="board_cards.length >= 5"
            class="legend__river"
          >
            {{ 'river' | localize }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Board',
  computed: {
    ...mapGetters({
      board_cards: 'poker/board_cards',
      hole_cards: 'poker/hole_cards',
      all_cards: 'poker/all_cards',
      categoryId: 'poker/categoryId'
    }),
    getRandomButtonTitle () {
      const data = {
        0: this.$options.filters.localize('randomFlop'),
        1: this.$options.filters.localize('randomFlop'),
        2: this.$options.filters.localize('randomFlop'),
        3: this.$options.filters.localize('randomTurn'),
        4: this.$options.filters.localize('randomRiver')
      }
      return data[this.board_cards.length] || this.$options.filters.localize('randomText')
    }
  },
  watch: {
    categoryId () {
      this._clearSelectedCards()
    }
  },
  methods: {
    changeCardState (card) {
      this.$store.dispatch('poker/changeBoardCardState', card)
    },
    _clearSelectedCards () {
      this.$store.dispatch('poker/clearBoardCards')
    },
    _chooseRandomCards () {
      if (this.board_cards.length < 3) {
        this._clearSelectedCards()
        this._pushRandomCard(3 - this.board_cards.length)
      } else {
        this._pushRandomCard(1)
      }
    },
    _pushRandomCard (count) {
      const getRandomCard = () => {
        const randomCard = this.all_cards[Math.floor(Math.random() * this.all_cards.length)]
        const isChosen = this.board_cards.includes(randomCard) || this.hole_cards.includes(randomCard)
        if (!isChosen) {
          return randomCard
        } else {
          return getRandomCard()
        }
      }
      if (count > 0) {
        const randomCard = getRandomCard()
        this.changeCardState(randomCard)
        this._pushRandomCard(count - 1)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .board {
    &__main {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 20px;
    }

    &__random {
      margin-top: 20px;
    }

    &__legend {
      margin-top: 20px;
    }
  }

  .legend {
    padding: 11px 2px;
    background: $form-background;

    &__cards {
      display: flex;
      justify-content: flex-start;
      position: relative;
      z-index: 2;
      background: $form-background;
    }

    &__card {
      margin-right: 3px;
      margin-bottom: 0 !important;

      &:last-child {
        margin-right: 0;
      }
    }

    &__text {
      font-size: 12px;
      position: relative;
      z-index: 1;
      display: flex;
    }

    &__flop {
      padding-top: 19px;
      padding-left: 33px;
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 60px;
        height: 30px;
        border: 2px solid $main-gray;
        border-radius: 6px;
        position: absolute;
        top: -20px;
        left: 12px;
      }
    }

    &__turn {
      padding-top: 19px;
      padding-left: 36px;
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 47px;
        top: 0;
        height: 12px;
        width: 2px;
        background: $main-gray;
      }
    }

    &__river {
      position: relative;
      padding-top: 19px;
      padding-left: 5px;

      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 18px;
        top: 0;
        height: 12px;
        width: 2px;
        background: $main-gray;
      }
    }
  }

  .slideDown-enter-active, .slideDown-leave-active {
    transition: all .3s ease;
    bottom: 0;
    opacity: 1;
  }
  .slideDown-enter, .slideDown-leave-to {
    opacity: 0;
    bottom: 0;
  }
</style>
