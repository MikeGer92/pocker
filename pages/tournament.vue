<template>
  <div class="range">
    <div class="range__left layout__left">
      <tournament-tree />
    </div>
    <transition name="slide-fade">
      <div v-if="showSettings" class="mini-range__left layout__left">
        <div class="mini-range__left_active-cancel" @click="showSettings=false">
          <span class="mini-range__left_active-cancel--icon" />
          <span class="mini-range__left_active-cancel--icon" />
        </div>
        <tournament-tree />
      </div>
    </transition>
    <div class="range__main layout__main">
      <div class="range__main_buttons">
        <el-button class="range__main_buttons-item" size="mini" @click="showSettingBlock">
          Список матриц
        </el-button>
      </div>
      <template v-if="categoryId">
        <combinations
          ref="combinations"
          class="range__combinations"
        />
        <div class="range__add">
          <div class="range__add_board">
            <board class="range__board" />
            <statistic class="range__statistic" />
          </div>
          <div class="range__add_hole">
            <hole class="range__hole" />
            <equity class="range__equity" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty-combinations">
          {{ 'selectRangesText' | localize }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Combinations from '@/components/RangePage/combinations/index'
import Board from '@/components/RangePage/board'
import Statistic from '@/components/RangePage/statistic'
import Hole from '@/components/RangePage/hole'
import Equity from '@/components/RangePage/equity'
import TournamentTree from '@/components/TournamentTree'

export default {
  name: 'MainPage',
  components: {
    Combinations,
    Board,
    Statistic,
    Hole,
    Equity,
    TournamentTree
  },
  layout: 'default',
  data () {
    return {
      showSettings: false
    }
  },
  head: {
    title: 'Tournament Ranges'
  },
  computed: {
    ...mapGetters({
      hole_cards: 'poker/hole_cards',
      board_cards: 'poker/board_cards',
      categoryId: 'poker/categoryId',
      display: 'poker/display'
    })
  },
  watch: {
    hole_cards () {
      this.onDataChange()
    },
    board_cards () {
      this.onDataChange()
    },
    display () {
      this.$store.dispatch('poker/clearStats')
      this.onDataChange()
    }
  },
  methods: {
    showSettingBlock () {
      this.showSettings = !this.showSettings
    },
    onDataChange () {
      let matrixIsFill = false
      if (this.$refs.combinations.category) {
        this.$refs.combinations.getCombinations.map((item) => {
          if (item.colors.length > 0) {
            matrixIsFill = true
          }
          return true
        })
      }
      if ((matrixIsFill && this.hole_cards.length === 2 && this.board_cards.length === 0) || (
        matrixIsFill && this.board_cards.length >= 3 && (this.hole_cards.length === 2 || this.hole_cards.length === 0))) {
        this.$store.dispatch('poker/calculateEquity', this.$refs.combinations.getCombinations)
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/_variables.scss';
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.range {
  display: flex;

  &__main {
    display: flex;
    &_buttons {
      display: none;
      max-width: 60%;
      justify-content: flex-start;
      &-item {
        height: 40px;
        border-radius: 20px;
        border: 1px solid #007645;
        background-color: #007645;
        color: #fff;
      }
    }
  }

  &__combinations {
    width: 680px;
  }
  &__add {
    display: flex;
    flex-wrap: wrap;
    &_board {
      display: flex;
      margin-bottom: 20px;
    }
    &_hole {
      display: flex;
    }
  }

  &__board {
    width: 152px;
    margin-left: 25px;
  }

  &__statistic {
    width: 238px;
    margin-left: 25px;
  }

  &__hole {
    width: 152px;
    margin-left: 25px;
  }

  &__equity {
    width: 152px;
    margin-left: 25px;
  }
}
.layout__left {
  padding: 70px 20px 40px 20px;
}
.mini-range {
  &__left {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    margin: 0;
    transition: all 0.2s ease;
    background-color: #161616;
    z-index: 999;
    width: 100%;
    max-width: 280px;
      &_active {
      &-cancel {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 20px;
        right: 20px;
        &--icon {
          &:nth-child(1) {
            display: block;
            width: 30px;
            height: 2px;
            background-color: #fff;
            margin: 15px 0 0 0;
            transform: rotate(45deg);
          }
          &:nth-child(2) {
            display: block;
            width: 30px;
            height: 2px;
            background-color: #fff;
            margin: -2px 0;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}
.column-header {
  width: 100%;
  height: 45px;
  background: $main-gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 10px;

  &__title {
    font-weight: bold;
    font-size: 16px;
    line-height: 140%;
    color: #fff;
  }
}

.empty-combinations {
  padding: 20px 0 0;
  width: 100%;
  text-align: center;
}
@media (min-width: 1550px) and (max-width: 1820px){
  .range {
    &__main {
      justify-content: center;
    }
    &__add {
      max-width: 30%;
    }
  }
}
@media (min-width: 1120px) and (max-width: 1550px){
  .range {
    &__main {
      justify-content: center;
      flex-wrap: wrap;
      padding: 15px;
    }
    &__add {
      flex-wrap: nowrap;
      max-width: 100%;
      justify-content: center;
    }
  }
}
@media (min-width: 800px) and (max-width: 1120px){
  .range {
    &__main {
      flex-wrap: wrap;
      padding: 15px;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      &_buttons {
        display: flex;
        margin: 0 0 15px 0;
        &-item {
          margin: 0 10px ;
        }
      }
    }
    &__settings {
      &_icon {
        display: block;
        width: 60px;
        height: 60px;
        position: fixed;
        top: 400px;
        right: 120px;
        background-color: #007645;
        z-index: 999;

      }
    }
    &__left {
      display: none;
    }
    &__add {
      flex-wrap: nowrap;
      max-width: 100%;
      justify-content: center;
    }
    &__hole {
      margin-left: 15px;
    }
    &__equity {
      margin-left: 15px;
    }
  }
}
@media (min-width: 640px) and (max-width: 800px){
  .range {
    &__main {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      &_buttons {
        display: flex;
        margin: 0 0 15px 0;
        &-item {
          margin: 0 10px ;
        }
      }
    }
    &__combinations {
      width: unset;
      max-width: 620px;
    }
    &__settings {
      &_icon {
        display: block;
        width: 60px;
        height: 60px;
        position: fixed;
        top: 400px;
        right: 120px;
        background-color: #007645;
        z-index: 999;

      }
    }
    &__left {
      display: none;
    }
    &__add {
      flex-wrap: wrap;
      max-width: 80%;
      justify-content: space-between;
      &_board {
        justify-content: center;
      }
      &_hole {
        justify-content: center;
      }
    }
    &__hole {
      margin-left: 15px;
    }
    &__equity {
      margin-left: 15px;
      width: 238px;
    }
  }
}
@media (min-width: 480px) and (max-width: 640px){
  .range {
    &__main {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      &_buttons {
        max-width: 80%;
        display: flex;
        margin: 0 0 15px 0;
        &-item {
          margin: 0 10px ;
        }
      }
    }
    &__combinations {
      width: unset;
      max-width: 460px;
    }
    &__settings {
      &_icon {
        display: block;
        width: 60px;
        height: 60px;
        position: fixed;
        top: 400px;
        right: 120px;
        background-color: #007645;
        z-index: 999;

      }
    }
    &__left {
      display: none;
    }
    &__add {
      flex-wrap: wrap;
      max-width: 100%;
      justify-content: center;
      &_board {
        justify-content: center;
      }
      &_hole {
        justify-content: center;
      }
    }
    &__hole {
      margin-left: 15px;
    }
    &__equity {
      margin-left: 15px;
      width: 238px;
    }
  }
}
@media (min-width: 375px) and (max-width: 480px){
  .range {
    &__main {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      &_buttons {
        max-width: 100%;
        display: flex;
        margin: 5px 0 10px 0;
        &-item {
          margin: 0 10px ;
        }
      }
    }
    &__combinations {
      width: unset;
      max-width: 365px;
    }
    &__settings {
      &_icon {
        display: block;
        width: 60px;
        height: 60px;
        position: fixed;
        top: 400px;
        right: 120px;
        background-color: #007645;
        z-index: 999;

      }
    }
    &__left {
      display: none;
    }
    &__add {
      flex-wrap: wrap;
      max-width: 100%;
      justify-content: center;
      &_board {
        justify-content: center;
      }
    }
    &__board {
      margin-left: 10px;
    }
    &__statistic {
      margin-left: 10px;
      width: 170px;
    }
    &__hole {
      margin-left: 10px;
      justify-content: center;
    }
    &__equity {
      margin-left: 10px;
      width: 170px;
    }
  }
}
@media (min-width: 320px) and (max-width: 375px){
  .range {
    &__main {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      &_buttons {
        max-width: 100%;
        display: flex;
        margin: 5px 0 10px 0;
        &-item {
          margin: 0 10px ;
        }
      }
    }
    &__combinations {
      width: unset;
      max-width: 310px;
    }
    &__settings {
      &_icon {
        display: block;
        width: 60px;
        height: 60px;
        position: fixed;
        top: 400px;
        right: 120px;
        background-color: #007645;
        z-index: 999;

      }
    }
    &__left {
      display: none;
    }
    &__add {
      flex-wrap: wrap;
      max-width: 100%;
      justify-content: center;
      &_board {
        justify-content: center;
      }
    }
    &__board {
      margin-left: 5px;
    }
    &__statistic {
      margin-left: 5px;
      width: 150px;
    }
    &__hole {
      margin-left: 5px;
      justify-content: center;
    }
    &__equity {
      margin-left: 5px;
      width: 150px;
    }
  }
}
@media (max-width: 320px){
  .range {
    &__main {
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      padding: 5px;
      &_buttons {
        max-width: 100%;
        display: flex;
        margin: 5px 0 10px 0;
        &-item {
          margin: 0 10px ;
        }
      }
    }
    &__combinations {
      width: unset;
      max-width: 310px;
    }
    &__settings {
      &_icon {
        display: block;
        width: 60px;
        height: 60px;
        position: fixed;
        top: 400px;
        right: 120px;
        background-color: #007645;
        z-index: 999;

      }
    }
    &__left {
      display: none;
    }
    &__add {
      flex-wrap: wrap;
      max-width: 100%;
      justify-content: center;
      &_board {
        justify-content: center;
      }
    }
    &__board {
      margin-left: 5px;
    }
    &__statistic {
      margin-left: 5px;
      width: 150px;
    }
    &__hole {
      margin-left: 5px;
      justify-content: center;
    }
    &__equity {
      margin-left: 5px;
      width: 150px;
    }
  }
}

</style>
