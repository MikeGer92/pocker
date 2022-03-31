<template>
  <div
    :class="{
      'card': true,
      'card--disabled': checkCardIsDisabled,
      'card--selected': checkCardIsSelected,
      'card--mini': mini
    }"
    :style="{
      'background-color': _getBackgroundColor()
    }"
    @click="_changeCardState"
  >
    {{ _getCardLabel() }}
    <div :class="`card__icon card__icon--${card[card.length - 1]}`" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Card',
  props: {
    card: {
      type: String,
      required: true
    },
    table: {
      type: String,
      default: () => ''
    },
    noAction: {
      type: Boolean,
      default: () => false
    },
    mini: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    ...mapGetters({
      board_cards: 'poker/board_cards',
      hole_cards: 'poker/hole_cards'
    }),
    checkCardIsDisabled () {
      if (this.table === 'board') {
        return this.hole_cards.includes(this.card)
      } else if (this.table === 'hole') {
        return this.board_cards.includes(this.card)
      } else {
        return false
      }
    },
    checkCardIsSelected () {
      if (this.table === 'board') {
        return this.board_cards.includes(this.card)
      } else if (this.table === 'hole') {
        return this.hole_cards.includes(this.card)
      } else {
        return false
      }
    }
  },
  methods: {
    _getBackgroundColor () {
      if (this.noAction) {
        return '#646464'
      } else {
        const suit = this.card[this.card.length - 1]
        const colors = {
          h: '#EB4747',
          d: '#1847BE',
          c: '#16C85A',
          s: '#646464'
        }

        return colors[suit] || '#646464'
      }
    },
    _changeCardState () {
      if (!this.noAction && !this.checkCardIsDisabled) {
        this.$parent.changeCardState(this.card)
      }
    },
    _getCardLabel () {
      return this.card.slice(0, this.card.length - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/assets/_variables.scss';

  .card {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    font-size: 15px;
    position: relative;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
    }

    &__icon {
      width: 17px;
      height: 17px;
      margin-left: 1px;
      background-repeat: no-repeat;
      background-position: center center;

      &--h {
        background-image: url("~@/assets/icons/cards/h.png");
      }

      &--d {
        background-image: url("~@/assets/icons/cards/d.png");
      }

      &--c {
        background-image: url("~@/assets/icons/cards/c.png");
      }

      &--s {
        background-image: url("~@/assets/icons/cards/s.png");
      }
    }

    &--selected {
      border: 2px solid #fff;
    }

    &--disabled {
      cursor: not-allowed;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;
      }
    }

    &--mini {
      width: 27px;
      height: 27px;
      font-size: 13px;

      &:hover {
        transform: none;
      }

      .card__icon {
        width: 14px;
        height: 14px;
        background-size: contain;
      }
    }
  }
</style>
