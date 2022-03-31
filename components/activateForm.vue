<template>
  <div class="activate-form">
    <div class="activate-form__header">
      <div class="activate-form__header-left">
        <div class="activate-form__title">
          {{ 'activationFormTitle' | localize }}
        </div>
      </div>
      <div class="activate-form__header-right">
        <div class="activate-form__budge">
          <img src="~@/assets/icons/premium.png" alt="Premium membership">
        </div>
      </div>
    </div>
    <div class="activate-form__main">
      <div class="activate-form__text">
        {{ 'activationFormText' | localize }}
      </div>
      <ul class="activate-form__list">
        <li
          class="activate-form__list-item"
        >
          - <span v-html="$options.filters.localize('activationFormRow1')" />
        </li>
        <li
          class="activate-form__list-item"
        >
          - <span v-html="$options.filters.localize('activationFormRow2')" />
        </li>
        <li
          class="activate-form__list-item"
        >
          - <span v-html="$options.filters.localize('activationFormRow3')" />
        </li>
        <li
          class="activate-form__list-item"
        >
          - <span v-html="$options.filters.localize('activationFormRow4')" />
        </li>
      </ul>
    </div>
    <div class="activate-form__button">
      <template v-if="loading">
        <el-button
          class="activate-form__btn"
          type="primary"
          round
        >
          {{ 'loading' | localize }}...
        </el-button>
      </template>
      <template v-else-if="!price && !loading">
        <el-button
          class="activate-form__btn"
          type="primary"
          round
          @click="_getPrice"
        >
          {{ 'update' | localize }}
        </el-button>
      </template>
      <template v-else>
        <rl-button
          v-if="price && !loading"
          class="activate-form__btn"
          @click="$emit('confirm')"
        >
          {{ 'activationFormButtonPart1' | localize }} {{ price }} {{ 'activationFormButtonPart2' | localize }}
        </rl-button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    price: null,
    payData: null
  }),
  mounted () {
    this._getPrice()
  },
  methods: {
    _getPrice () {
      this.loading = true
      this.$axios.get('/api/v1/shop/cost/premium').then((response) => {
        this.price = `${response.data.data.card.price} ${response.data.data.card.currency}`
        this.payData = response.data.data
        // eslint-disable-next-line no-console
        console.log(this.payData)
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => { this.loading = false })
    }
  }
}
</script>

<style lang="scss">
.activate-form {
  position: relative;
  padding: 70px 0;

  &__budge {
    position: absolute;
    top: 20px;
    right: 0;
    width: 130px;
    height: 130px;

    img {
      height: 100%;
      width: 100%;
    }
  }

  &__header {
    display: flex;
    align-items: flex-start;
  }

  &__header-left {
    width: 100%;
    max-width: calc(100% - 130px);
    display: flex;
    justify-content: center;
  }

  &__title {
    text-align: center;
    font-size: 29px;
  }

  &__main {
  }

  &__text {
    margin: 80px 0 40px 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  &__list-item {
    line-height: 140%;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__button {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    position: relative;
  }

  &__btn {
    font-size: 18px !important;
    padding-top: 30px !important;
    padding-bottom: 30px !important;
  }
}
</style>
