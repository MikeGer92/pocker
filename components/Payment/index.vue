<template>
  <div
    v-loading="loading"
    class="payment-form"
  >
    <div class="payment-form__title">
      {{ title }}
    </div>
    <template v-if="paymentInfo">
      <div class="payment-form__tabs">
        <div
          :class="{
            'payment-form__tab': true,
            'payment-form__tab--active': activeTab === 'cloud'}"
          @click="_changeTab('cloud')"
        >
          <v-icon
            style="margin-right: 20px;"
            name="credit-card"
            scale="2.3"
          />
          {{ isRU ? ( paymentInfo.price.price.rub + ' РУБ') : (paymentInfo.price.price.usd + ' USD') }}
        </div>
        <div
          :class="{
            'payment-form__tab': true,
            'payment-form__tab--active': activeTab === 'card'
          }"
          @click="_changeTab('card')"
        >
          <img
            src="~@/assets/icons/usd-icon.png"
            class="payment-form__tab-icon payment-form__tab-icon--usd"
            alt="usd"
          >
          {{ isRU ? ( paymentInfo.price.price.rub + ' РУБ') : (paymentInfo.price.price.usd + ' USD') }}
        </div>
        <div
          :class="{
            'payment-form__tab': true,
            'payment-form__tab--active': activeTab === 'btc'
          }"
          @click="_changeTab('btc')"
        >
          {{ paymentInfo.price.price.btc }}
          <img
            src="~@/assets/icons/btc-icon.png"
            class="payment-form__tab-icon"
            alt="btc"
          >
        </div>
        <div
          :class="{
            'payment-form__tab': true,
            'payment-form__tab--active': activeTab === 'usdt'
          }"
          @click="_changeTab('usdt')"
        >
          {{ paymentInfo.price.price.usdt }}
          <img
            src="~@/assets/icons/usdt-icon.png"
            class="payment-form__tab-icon"
            alt="btc"
          >
        </div>
      </div>
      <div class="payment-form__main">
        <template v-if="activeTab === 'cloud'">
          <payment-cloud
            :payment-info="paymentInfo"
            @onSent="_closePayment"
          />
        </template>
        <template v-if="activeTab === 'card'">
          <payment-card
            v-model="confirmText"
            :payment-info="paymentInfo.price"
          />
          <div class="payment-form__footer">
            <rl-button
              @click="_sendPayInfo()"
            >
              {{ 'send' | localize }}
            </rl-button>
          </div>
        </template>
        <template v-else-if="activeTab === 'btc'">
          <payment-btc
            v-model="confirmText"
            :payment-info="paymentInfo.price"
          />
          <div class="payment-form__footer">
            <rl-button
              @click="_sendPayInfo()"
            >
              {{ 'send' | localize }}
            </rl-button>
          </div>
        </template>
        <template v-else-if="activeTab === 'usdt'">
          <payment-usdt
            v-model="confirmText"
            :payment-info="paymentInfo.price"
          />
          <div class="payment-form__footer">
            <rl-button
              @click="_sendPayInfo()"
            >
              {{ 'send' | localize }}
            </rl-button>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import PaymentCard from './PaymentCard'
import PaymentBtc from './PaymentBtc'
import PaymentUsdt from './PaymentUsdt'
import PaymentCloud from './PaymentCloud'

export default {
  components: {
    PaymentCard,
    PaymentBtc,
    PaymentUsdt,
    PaymentCloud
  },
  props: {
    id: {
      type: Number,
      default: () => null
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activeTab: 'cloud',
      confirmText: '',
      paymentInfo: null,
      loading: false
    }
  },
  computed: {
    isRU () {
      return this.$store.getters['user/language'] === 'ru-RU'
    }
  },
  mounted () {
    this._getPaymentInfo()
  },
  methods: {
    _changeTab (tabName) {
      this.confirmText = ''
      this.activeTab = tabName
    },
    _getPaymentInfo () {
      this.loading = true
      if (this.id) {
        const data = {
          product_id: this.id
        }
        this.$axios.post('/api/v1/shop/sale', data).then((response) => {
          this.paymentInfo = response.data
        }).finally(() => { this.loading = false })
      } else {
        const data = {
          product_id: null
        }
        this.$axios.post('/api/v1/shop/sale', data).then((response) => {
          this.paymentInfo = response.data
        }).finally(() => { this.loading = false })
      }
    },
    _closePayment () {
      this.$emit('onCancel')
    },
    _sendPayInfo () {
      if (this.confirmText === '') {
        this.$message.warning(this.$options.filters.localize('fillInPaymentTexts'))
      } else {
        const data = {
          info: this.confirmText,
          price: this.paymentInfo.price
        }
        this.loading = true
        if (this.id) {
          this.$axios.post(`/api/v1/shop/sale/${this.paymentInfo.saleId}/payment_info`, data).then(() => {
            this.$message({
              dangerouslyUseHTMLString: true,
              type: 'success',
              message: `
                <div class="toast-popup">
                  <div class="toast-popup__title">
                    ${this.$options.filters.localize('expectPurchaseTitle')}
                  </div>
                  <div class="toast-popup__text">
                    ${this.$options.filters.localize('expectPurchaseText')}
                  </div>
                </div>
              `
            })
            this._closePayment()
          }).finally(() => { this.loading = false })
        } else {
          this.$axios.post('/api/v1/poker/account/payment_info', data).then(() => {
            this.$message({
              dangerouslyUseHTMLString: true,
              type: 'success',
              message: `
                <div class="toast-popup">
                  <div class="toast-popup__title">
                    ${this.$options.filters.localize('expectPurchaseTitle')}
                  </div>
                  <div class="toast-popup__text">
                    ${this.$options.filters.localize('expectPurchaseText')}
                  </div>
                </div>
              `
            })
            this._closePayment()
          }).finally(() => { this.loading = false })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/_variables.scss';

.payment-form {
  min-height: 100px;

  &__tabs {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }

  &__title {
    font-size: 24px;
    line-height: 34px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  &__tab {
    text-align: center;
    padding: 8px 15px;
    background: $main-gray;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //width: 195px;
    font-size: 24px;
    font-weight: bold;
    line-height: 28px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background: $main-gray-hover;
    }

    &--active {
      background: $main-green;

      &:hover {
        background: $main-green-hover;
      }
    }
  }

  &__tab-icon {
    width: 42px;
    height: 42px;
    margin-left: 20px;

    &--usd {
      margin-right: 20px;
      margin-left: 0;
      width: 33px;
      height: 33px;
    }
  }

  &__main {
    margin-top: 20px;
  }

  &__footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}

.payment-card {
  margin-top: 30px;

  &__title {
    font-size: 14px;
  }

  &__amount {
    font-size: 14px;
    margin-top: 10px;
  }

  &__text {
    margin-top: 10px;
    font-size: 13px;
  }

  &__textarea {
    margin-top: 10px;
    width: 100%;
    height: 70px;
    border-radius: 5px;
    border: 1px solid $main-gray;
    background: $form-background;
    color: #fff;
    padding: 5px 8px;
    font-size: 13px;
  }

  &__row {
    margin-top: 30px;

    &:first-child {
      margin-top: 0;
    }
  }

  &__label {
    font-size: 14px;
    margin-bottom: 10px;
  }

  &__input {
    input {
      user-select: none;
    }
  }
}

.toast-popup {
  padding: 10px 0;
  text-align: center;

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__text {
    font-size: 14px;
    margin-top: 15px;
  }
}
</style>
