<template>
  <div class="combinations">
    <template v-if="loading">
      <div
        v-loading="loading"
        style="text-align: center; margin-top: 50px; width: 100%; min-height: 200px;"
      >
        Loading...
      </div>
    </template>
    <template v-else-if="checkData">
      <div v-loading="updateLoading">
        <div class="column-header">
          <div class="column-header__title">
            {{ category.name }}
          </div>
          <Rl-radio
            v-model="display"
            :label="'selectDisplay' | localize"
            :items="[{
              label: 1,
              value: 1
            }, {
              label: 2,
              value: 2
            }]"
          />
        </div>
        <div class="combinations__wrapper">
          <div class="combinations__main">
            <div class="combinations__list-wrapper">
              <div class="combinations__list">
                <combination-item
                  v-for="(item, index) in getCombinations"
                  :key="'cell-' + index"
                  :item="item"
                  class="combinations__list-item"
                  @click="_addPair"
                />
              </div>
            </div>
            <div class="combinations__settings">
              <div class="combinations__quality">
                <el-select
                  value="Stove Equity"
                  size="small"
                >
                  <el-option
                    label="Stove Equity"
                    value="Stove Equity"
                  />
                </el-select>
              </div>
              <div class="combinations__notes notes">
                <div class="notes__title">
                  {{ 'notes' | localize }}
                </div>
                <div class="notes__text">
                  <vue-custom-scrollbar
                    class="scroll-area"
                    :settings="scrollBarSettings"
                  >
                    <div class="notes__row">
                      <template v-if="category.note === ''">
                        {{ 'noneField' | localize }}
                      </template>
                      <template v-else>
                        {{ category.note }}
                      </template>
                    </div>
                  </vue-custom-scrollbar>
                </div>
              </div>
              <div class="combinations__randomizer">
                <rl-input-button
                  v-model="random_number"
                  :label="'randomizer' | localize"
                  style="padding: 10px;"
                  @onclick="_randomize"
                />
              </div>
              <div class="combinations__settings-bottom">
                <div class="combinations__weight weight">
                  <div class="weight__left">
                    <div class="weight__title">
                      {{ 'weightField' | localize }}
                    </div>
                    <div class="weight__value">
                      {{ weight }}%
                    </div>
                  </div>
                  <div class="weight__right">
                    <el-select
                      v-model="weight"
                      size="small"
                    >
                      <el-option
                        v-for="(item, index) in weights"
                        :key="`weight-${index}`"
                        :label="item.label"
                        :value="item.value"
                        :disabled="display === 1"
                      />
                    </el-select>
                    <!--<rl-select-->
                    <!--  v-model="weight"-->
                    <!--  :items="weights"-->
                    <!--  :disabled="display === 1"-->
                    <!--/>-->
                  </div>
                </div>
                <div class="combinations__combos weight">
                  <div class="weight__left">
                    <div class="weight__title">
                      {{ 'combosField' | localize }}
                    </div>
                    <div class="weight__value">
                      {{ getCombosCount }}
                    </div>
                  </div>
                  <div class="weight__right">
                    <el-input
                      :value="`${getCombosPercent}%`"
                      size="small"
                    />
                    <!--<div class="weight__input">-->
                    <!--  {{ getCombosPercent }}%-->
                    <!--</div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="combinations__bottom">
            <div class="combinations__range">
              <vue-slider
                v-model="range"
                :data="rangeSliderData"
                :process-style="{
                  'background-color': '#8D8D8D'
                }"
                tooltip="always"
                :adsorb="true"
                :order="false"
                tooltip-placement="bottom"
                :use-keyboard="false"
                :disabled="display === 2 && !currentColor"
                @change="_onSliderChange"
              >
                <template #dot="{ index }">
                  <div :class="'combinations__range-dot combinations__range-dot--' + index" />
                </template>
                <template #tooltip="{ value }">
                  <div class="combinations__range-tooltip">
                    {{ value }}%
                  </div>
                </template>
              </vue-slider>
            </div>
            <div class="combinations__controls combinations-controls">
              <div
                v-if="display === 2"
                class="combinations-controls__buttons"
              >
                <div
                  v-for="(button, index) in getButtons"
                  :key="button.color + index"
                  :class="{
                    'combinations-controls__item': true
                  }"
                  @click="_changeCurrentColor(button)"
                  @contextmenu.prevent="$refs.menu.open($event, button)"
                >
                  <rl-button
                    :color="button.color"
                    :disabled="display === 1"
                    :class="{
                      'active-button': currentColor === button.color
                    }"
                  >
                    <span>
                      {{ button.name }}
                      <br>
                      {{ button.description }}
                    </span>
                  </rl-button>
                </div>
                <div
                  v-if="!hideButtons"
                  class="combinations-controls__item"
                >
                  <rl-button
                    :plain="true"
                    :disabled="display === 1"
                    @click="_editButton()"
                  >
                    {{ 'newButtonText' | localize }} +
                  </rl-button>
                </div>
                <div class="combinations-controls__item">
                  <rl-button
                    :plain="true"
                    :disabled="display === 1"
                    @click="hideButtons = !hideButtons"
                  >
                    <template v-if="hideButtons">
                      {{ 'moreText' | localize }}
                    </template>
                    <template v-else>
                      {{ 'hideText' | localize }}
                    </template>
                  </rl-button>
                </div>
                <vue-context
                  ref="menu"
                  class="context"
                >
                  <template slot-scope="child">
                    <li>
                      <a
                        href="#"
                        @click.prevent="_editButton(child.data)"
                      >
                        {{ 'editText' | localize }}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        @click.prevent="_removeButton(child.data)"
                      >
                        {{ 'removeText' | localize }}
                      </a>
                    </li>
                  </template>
                </vue-context>
              </div>
              <div class="combinations-controls__footer">
                <div class="combinations-controls__footer-column">
                  <template
                    v-if="rootType === 'tournament_root'"
                  >
                    <div class="combinations-controls__bind">
                      <div class="combinations-controls__bind-title">
                        {{ 'blind' | localize }}
                      </div>
                      <el-select
                        :value="currentBlind"
                        size="small"
                        placeholder=""
                        class="combinations-controls__bind-input"
                        @change="onBlindSelect"
                      >
                        <el-option
                          v-for="(item, index) in getBlinds"
                          :key="`blind-${index}`"
                          :label="item.blind"
                          :value="item"
                          :value-key="item.blind"
                        />
                      </el-select>
                    </div>
                  </template>
                  <div class="combinations-controls__pos">
                    <div class="combinations-controls__pos-title">
                      {{ 'pos' | localize }}
                    </div>
                    <el-select
                      :value="currentPosition"
                      class="combinations-controls__pos-input"
                      size="small"
                      placeholder=""
                      @change="_onPosSelect"
                    >
                      <el-option
                        v-for="(item, index) in getPositions"
                        :key="`pos-${index}`"
                        :label="item.pos"
                        :value="item"
                        :value-key="item.pos"
                      />
                    </el-select>
                  </div>
                  <div class="combinations-controls__action">
                    <div class="combinations-controls__action-title">
                      {{ 'action' | localize }}
                    </div>
                    <el-select
                      v-model="currentAction"
                      class="combinations-controls__action-input"
                      size="small"
                      placeholder=""
                      @change="onActionSelect"
                    >
                      <el-option
                        v-for="(item, index) in actions"
                        :key="`action-${index}`"
                        :label="item.action"
                        :value="item.category"
                      />
                    </el-select>
                    <!--<rl-select-->
                    <!--  v-model="currentAction"-->
                    <!--  class="combinations-controls__action-input"-->
                    <!--  :items="getActions"-->
                    <!--  @input="onActionSelect"-->
                    <!--/>-->
                  </div>
                </div>
                <div class="combinations-controls__footer-column">
                  <div class="combinations-controls__footer-item">
                    <rl-button
                      color="gray"
                      @click="_clearMatrix"
                    >
                      {{ 'clearText' | localize }}
                    </rl-button>
                  </div>
                  <div class="combinations-controls__footer-item">
                    <rl-button @click="_saveMatrix">
                      {{ 'save' | localize }}
                    </rl-button>
                  </div>
                </div>
              </div>
            </div>
            <transition name="fade2">
              <button-editor
                ref="buttonEditor"
                class="combinations__button-editor"
                @onButtonAdd="_addButton"
              />
            </transition>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div style="text-align: center; margin-top: 50px; width: 100%;">
        {{ 'failedToLoadData' | localize }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import RlRadio from '@/components/RlRadio'
import RlInputButton from '@/components/RlInputButton'
import CombinationItem from '@/components/CombinationItem'
import ButtonEditor from '@/components/RangePage/buttonEditor'

export default {
  name: 'Block1',
  components: {
    RlRadio,
    CombinationItem,
    RlInputButton,
    ButtonEditor,
    vueCustomScrollbar
  },
  data () {
    return {
      displayError: true,
      startRandom: 0,
      endRandom: 0,
      random_number: 0,
      sliderTimeoutId: null,
      loading: false,
      updateLoading: false,
      category: null,
      pos_action: [],
      hideButtons: true,
      currentBlind: null,
      currentPosition: null,
      currentAction: null,
      positions: [],
      actions: [],
      scrollBarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false
      },
      weights: [
        {
          label: '10%',
          value: '10'
        },
        {
          label: '25%',
          value: '25'
        },
        {
          label: '33%',
          value: '33'
        },
        {
          label: '50%',
          value: '50'
        },
        {
          label: '66%',
          value: '66'
        },
        {
          label: '75%',
          value: '75'
        },
        {
          label: '90%',
          value: '90'
        },
        {
          label: '100%',
          value: '100'
        }
      ],
      rangeSliderData:
        [0, 0.45, 0.9, 1.36, 1.81, 2.26, 2.56, 3.02, 3.32, 4.22, 4.52, 4.83, 5.28, 5.58, 6.49, 6.79, 7.09, 7.39, 8.3,
          9.2, 9.5, 9.8, 10.26, 11.16, 11.46, 12.37, 12.67, 12.97, 13.88, 14.18, 15.08, 15.38, 15.69, 16.14, 16.44,
          17.35, 17.65, 18.55, 18.85, 19.16, 19.46, 20.36, 20.66, 21.57, 21.87, 22.17, 23.08, 23.38, 23.68, 23.98,
          24.28, 25.19, 25.64, 26.55, 26.85, 27.15, 27.45, 28.36, 29.26, 30.17, 31.07, 31.37, 32.28, 32.58, 32.88,
          33.18, 34.09, 34.39, 34.69, 34.99, 35.29, 36.2, 36.65, 37.56, 38.46, 38.76, 39.67, 39.97, 40.87, 41.18,
          42.08, 42.99, 43.29, 44.19, 44.49, 44.8, 45.1, 45.4, 45.7, 46.61, 47.51, 47.81, 48.11, 48.57, 48.87, 49.77,
          50.68, 51.58, 51.89, 52.19, 53.09, 53.39, 53.7, 54.6, 54.9, 55.81, 56.11, 57.01, 57.32, 57.62, 58.52, 58.82,
          59.13, 59.58, 60.48, 60.78, 61.69, 61.99, 62.9, 63.8, 64.1, 64.4, 65.31, 66.21, 67.12, 67.42, 67.72, 68.63,
          69.53, 69.83, 70.14, 70.44, 70.74, 71.64, 72.55, 73.45, 73.76, 74.66, 74.96, 75.87, 76.17, 77.07, 77.98,
          78.88, 79.19, 80.09, 80.39, 81.3, 82.2, 82.5, 83.41, 84.31, 84.62, 85.52, 86.43, 87.33, 88.24, 89.14,
          90.05, 90.95, 91.86, 92.76, 93.67, 94.57, 95.48, 96.38, 97.29, 98.19, 99.1, 100.0
        ]
    }
  },
  computed: {
    ...mapGetters({
      categoryId: 'poker/categoryId',
      rangeLoading: 'poker/rangeLoading',
      defaultColor: 'poker/defaultColor',
      currentColor: 'poker/currentColor',
      rootType: 'poker/rootType'
    }),
    getButtons () {
      return this.category.buttons.filter((item) => {
        return this._checkButtonIsShown(item)
      })
    },
    getData () {
      if (this.category) {
        return this.display === 1 ? this.category.rangedisplay1 : this.category.rangedisplay2
      } else {
        return null
      }
    },
    checkData () {
      return this.category && this.category.rangedisplay1 && this.category.rangedisplay2
    },
    getCombinations () {
      return this.getData.matrix
    },
    weight: {
      get () {
        return this.$store.getters['poker/weight']
      },
      set (value) {
        this.$store.dispatch('poker/changeWeight', value)
      }
    },
    range: {
      get () {
        return [this.getData.min, this.getData.max]
      },
      set (value) {
        const min = Math.min.apply(null, value)
        const max = Math.max.apply(null, value)

        this.getData.min = min
        this.getData.max = max
      }
    },
    display: {
      get () {
        return this.$store.getters['poker/display']
      },
      set (value) {
        this.$store.dispatch('poker/changeDisplay', value)
      }
    },
    getCombosCount () {
      return this.getCombinations.reduce((sum, current) => {
        if (current.colors.length > 0) {
          const pairCombos = current.label.length === 2 ? 6 : current.label[2] === 's' ? 4 : 12
          const filled = current.colors.reduce((total, item) => {
            return total + item.weight
          }, 0)
          const combos = Math.round(pairCombos * (filled / 100))
          return sum + combos
        } else {
          return sum
        }
      }, 0)
    },
    getCombosPercent () {
      return Math.round((this.getCombosCount / 1326) * 1000) / 10
    },
    getBlinds () {
      if (this.rootType === 'tournament_root') {
        return this.pos_action.filter(item => item.blind && item.blind.length)
      } else {
        return []
      }
    },
    getPositions () {
      if (this.rootType === 'preflop_root') {
        return this.pos_action.filter(item => item.pos && item.pos.length)
      } else {
        return this.positions
      }
    }
  },
  watch: {
    categoryId () {
      this._getCategory()
    }
  },
  mounted () {
    this._getCategory()
  },
  methods: {
    _randomize () {
      this.random_number = Math.round(Math.random() * 100)
    },
    _resetColors () {
      this.$parent.onDataChange()
      this.$store.dispatch('poker/clearStats')
      this.getCombinations.map((item) => {
        item.colors = []
        return true
      })
    },
    _onSliderChange () {
      this._resetColors()
      if (this.sliderTimeoutId) {
        clearTimeout(this.sliderTimeoutId)
      }
      this.sliderTimeoutId = setTimeout(() => {
        const range = [this.getData.min, this.getData.max]
        this.$store.dispatch('poker/getRangePairs', range).then((response) => {
          this.getCombinations
            .filter(item => response.filter(el => el === item.label)[0])
            .map((item) => {
              item.colors.push({
                color: this.display === 1 ? this.defaultColor : this.currentColor || this.defaultColor,
                weight: 100
              })
              return true
            })
          this.$parent.onDataChange()
        })
      }, 200)
    },
    _addPair (pair) {
      if (this.display === 2 && !this.currentColor) {
        this.$message.warning('First choose a color')
      } else {
        this.$store.dispatch('poker/addPair', pair)
        this.$parent.onDataChange()
      }
    },
    _clearMatrix () {
      this._onSliderChange()
    },
    _changeCurrentColor (button) {
      this.$store.dispatch('poker/changeCurrentColor', button.color)
    },
    _getMatrixColors () {
      const colors = []
      this.category.rangedisplay2.matrix
        .filter(item => item.colors.length > 0)
        .map((item) => {
          item.colors.map((el) => {
            colors.push(el.color)
            return true
          })
          return true
        })
      return colors
    },
    _getCategory () {
      if (this.category) {
        this.updateLoading = true
      } else {
        this.loading = true
      }
      this.$store.dispatch('poker/getCategory', this.categoryId).then((response) => {
        this.category = response.category
        this.pos_action = response.pos_action
      }).finally(() => {
        this.updateLoading = false
        this.loading = false
      })
    },
    _saveMatrix () {
      this.updateLoading = true
      this.$store.dispatch('poker/updateCategory', this.category).then(() => {
        this.$message.success(this.$options.filters.localize('successfulRangeRenew'))
      }).catch(() => {
        this.$message.error(this.$options.filters.localize('errorRenewRange'))
      })
        .finally(() => { this.updateLoading = false })
    },
    _editButton (button = null) {
      this.$refs.buttonEditor.init(button)
    },
    _addButton (button) {
      this.category.buttons.push(button)
    },
    _checkButtonIsShown (button) {
      if (this._getMatrixColors().length > 0) {
        if (this.hideButtons) {
          return this._getMatrixColors().includes(button.color)
        } else {
          return true
        }
      } else {
        return this.category.buttons.indexOf(button) <= 15
      }
    },
    onBlindSelect (blind) {
      this.positions = blind.pos.filter(item => item.pos && item.pos.length)
      this.currentBlind = blind.blind
      this.currentAction = ''
    },
    _onPosSelect (pos) {
      this.actions = pos.actions
      this.currentPosition = pos.pos
      this._checkActions()
    },
    _checkActions () {
      if (this.actions.length > 0) {
        const emptyNameAction = this.actions.filter(item => item.action === '')[0]
        const action = emptyNameAction ? emptyNameAction.category : this.actions[0].category
        this.currentAction = action
        this.$store.dispatch('poker/setCategoryId', action)
      }
    },
    onActionSelect (value) {
      this.$store.dispatch('poker/setCategoryId', value)
    },
    _removeButton (button) {
      const index = this.category.buttons.indexOf(button)
      try {
        this.category.buttons.splice(index, 1)
        this.$message.success(this.$options.filters.localize('successfulButtonDelete'))
      } catch (err) {
        this.$message.error(this.$options.filters.localize('errorDeleteButton'))
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/_variables.scss';

  .combinations {
    position: relative;

    &__main {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      position: relative;
    }

    &__list-wrapper {
      position: relative;
      width: 503px;
    }

    &__list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    &__settings {
      width: 150px;
      position: relative;
    }

    &__notes {
      margin-top: 20px;
    }

    &__randomizer {
      margin-top: 20px;
    }

    &__settings-bottom {
      position: absolute;
      bottom: 4px;
      right: 0;
      width: 151px;
    }

    &__bottom {
      position: relative;
    }

    &__range {
      margin-top: 20px;
    }

    &__range-tooltip {
      color: #999;
      font-size: 12px;
    }

    &__range-dot {
      width: 18px;
      height: 18px;
      border-radius: 9px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      cursor: pointer;

      &--0 {
        background: #EB4747;
      }

      &--1 {
        background: #1847BE;
      }
    }

    &__controls {
      margin-top: 35px;
    }

    &__button-editor {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
    }
  }

  .combinations-controls {
    &__buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    &__item {
      margin-bottom: 20px;
      margin-right: 27px;
      width: 149px;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__footer-column {
      width: calc(60% - 15px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    &__bind {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__bind-title {
      font-size: 14px;
      margin-right: 9px;
    }

    &__bind-input {
      width: 94px;
    }

    &__pos {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__pos-title {
      font-size: 14px;
      margin: 0 9px;
    }

    &__pos-input {
      width: 94px;
    }

    &__action {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__action-title {
      font-size: 14px;
      margin: 0 9px;
    }

    &__action-input {
      width: 123px;
    }
  }

  .notes {
    background: $form-background;
    padding: 10px;

    &__title {
      font-size: 14px;
    }

    &__text {
      margin-top: 6px;
    }

    &__row {
      color: #999;
      font-size: 12px;
      line-height: 14px;
      word-break: break-word;
      white-space: pre-line;
      max-height: 200px;
    }
  }

  .weight {
    padding: 10px;
    background: $form-background;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      font-size: 14px;
    }

    &__value {
      font-size: 12px;
      color: #999;
      margin-top: 8px;
    }

    &__right {
      width: 80px;
    }

    &__input {
      border: 1px solid $input-border-color;
      font-size: 14px;
      border-radius: 3px;
      background: $form-background;
      height: 40px;
      padding: 10px;
      text-align: center;
    }
  }

  .active-button {
    box-shadow: 0 0 12px 0 rgba(255, 255, 255, 0.9);
  }

  .context {
    background: $background-color;

    li a {
      color: #fff;
      font-size: 14px;

      &:hover {
        background: $background-color;
        color: #c7c7c7;
      }
    }
  }
  .hidden-button {
    display: none;
  }
  @media (min-width: 640px) and (max-width: 800px){
    .combinations-controls {
      &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      &__item {
        margin-bottom: 20px;
        margin-right: 27px;
        width: 149px;

        &:nth-child(4n) {
          margin-right: 27px;
        }
      }
      &__footer {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      }

      &__footer-column {
        width: unset;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }
  @media (min-width: 480px) and (max-width: 640px){
    .combinations {
      &__main {
        flex-wrap: wrap;
        justify-content: center;
      }
      &__list {
        justify-content: center;
      }
      &__settings {
        position: unset;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 15px;
        &-bottom {
          position: unset;
          width: 45%;
        }
      }
      &__quality {
        margin-top: 15px;
        order: 3
      }
      &__notes {
        margin-top: 0;
        width: 45%;
      }
      &__randomizer {
        margin-top: 15px;
        order: 4
      }
    }
    .combinations-controls {
      &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      &__item {
        margin-bottom: 20px;
        margin-right: 27px;
        margin-left: 27px;
        width: 149px;

        &:nth-child(4n) {
          margin-right: 27px;
        }
      }
      &__footer {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      }

      &__footer-column {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;

      }
    }
  }
  @media (min-width: 375px) and (max-width: 480px){
    .combinations {
      &__main {
        flex-wrap: wrap;
        justify-content: center;
      }
      &__list {
        justify-content: center;
      }
      &__settings {
        position: unset;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 15px;
        &-bottom {
          position: unset;
          width: 45%;
        }
      }
      &__quality {
        margin-top: 15px;
        order: 3
      }
      &__notes {
        margin-top: 0;
        width: 45%;
      }
      &__randomizer {
        margin-top: 15px;
        order: 4
      }
    }
    .combinations-controls {
      &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      &__item {
        margin-bottom: 10px;
        margin-right: 0px;
        margin-left: 0px;
        width: 149px;

        &:nth-child(4n) {
          margin-right: 0px;
        }
      }
      &__footer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        &-column {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
      }
      &__bind, &__pos, &__action {
        margin: 10px 10px 10px 0;
        width: 80%;
        justify-content: space-between;
        &-title {
          margin: 0 10px;
          width: 30%;
        }
        &-input {
          width: 80%;
        }
      }
    }
  }
  @media (min-width: 320px) and (max-width: 375px){
    .combinations {
      &__main {
        flex-wrap: wrap;
        justify-content: center;
      }
      &__list {
        justify-content: center;
      }
      &__settings {
        position: unset;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 15px;
        &-bottom {
          position: unset;
          width: 45%;
        }
      }
      &__quality {
        margin-top: 15px;
        order: 3
      }
      &__notes {
        margin-top: 0;
        width: 45%;
      }
      &__randomizer {
        margin-top: 15px;
        order: 4
      }
    }
    .combinations-controls {
      &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      &__item {
        margin-bottom: 10px;
        margin-right: 0px;
        margin-left: 0px;
        width: 149px;

        &:nth-child(4n) {
          margin-right: 0px;
        }
      }
      &__footer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        &-column {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
      }
      &__bind, &__pos, &__action {
        margin: 10px 10px 10px 0;
        width: 90%;
        justify-content: space-between;
        &-title {
          margin: 0 10px;
          width: 30%;
        }
        &-input {
          width: 80%;
        }
      }
    }
  }
  @media (max-width: 320px){
    .combinations {
      &__main {
        flex-wrap: wrap;
        justify-content: center;
      }
      &__list {
        justify-content: center;
      }
      &__settings {
        position: unset;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 15px;
        &-bottom {
          position: unset;
          width: 45%;
        }
      }
      &__quality {
        margin-top: 15px;
        order: 3
      }
      &__notes {
        margin-top: 0;
        width: 45%;
      }
      &__randomizer {
        margin-top: 15px;
        order: 4
      }
    }
    .combinations-controls {
      &__buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      &__item {
        margin-bottom: 10px;
        margin-right: 0px;
        margin-left: 0px;
        width: 149px;

        &:nth-child(4n) {
          margin-right: 0px;
        }
      }
      &__footer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        &-column {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
      }
      &__bind, &__pos, &__action {
        margin: 10px 10px 10px 0;
        width: 90%;
        justify-content: space-between;
        &-title {
          margin: 0 10px;
          width: 30%;
        }
        &-input {
          width: 80%;
        }
      }
    }
  }
</style>
