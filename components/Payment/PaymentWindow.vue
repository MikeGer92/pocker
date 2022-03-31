<template>
  <div>
    <div
      v-if="payParams"
      class="payment"
      :scrollable="false"
    >
      <div
        class="payment__main"
      >
        <div v-if="offer" class="payment__title">
          <div class="payment__title_main">
            {{ offer.name }}
          </div>
          <div class="payment__title_descr">
            {{ 'Package offer' | localize }}
          </div>
        </div>
        <div
          class="payment__offer"
        >
          <div
            v-if="offer"
            class="payment__offer_row"
          >
            <el-checkbox v-model="checkedS" @change="updatePayParams" />
            <div class="payment__offer_info">
              <div class="payment__offer_name">
                {{ 'Strategy' | localize }}
              </div>
              <div v-if="offer" class="payment__offer_price">
                <div class="payment__offer_price-coast">
                  {{ offer.products[0].price }}
                </div>
                <div class="payment__offer_price-currency">
                  <!-- руб -->
                </div>
              </div>
            </div>
            <!-- <div v-if="offer" class="payment__offer_addit">
              <div v-if="offers.subscribe" class="payment__offer_addit-text">
                {{ 'or free by subscription' | localize }}
              </div>
              <button v-if="offers.subscribe" type="button" class="payment__button_offer">
                {{ 'subscribe' | localize }}
              </button>
            </div> -->
          </div>
          <div
            v-if="offer && offer.video_courses && offer.video_courses.length > 0"
            class="payment__offer_row"
          >
            <el-checkbox v-model="checkedV" @change="updatePayParams" />
            <div class="payment__offer_info">
              <div class="payment__offer_name">
                {{ 'Video course' | localize }}
              </div>
              <div class="payment__offer_price">
                <div class="payment__offer_price-coast">
                  {{ offer.video_courses[0].price }}
                </div>
                <div class="payment__offer_price-currency">
                  <!-- руб -->
                </div>
              </div>
            </div>
            <!-- <div v-if="offer.subcribes" class="payment__offer_addit">
              <div class="payment__offer_addit-text">
                {{ 'or free by subscription' | localize }}
              </div>
              <button v-if="offers.subscribe" type="button" class="payment__button_offer">
                {{ 'subscribe' | localize }}
              </button>
            </div> -->
          </div>
          <div
            v-if="payParams.premium_required"
            class="payment__offer_row"
          >
            <div class="payment__offer_info-premium">
              <div class="payment__offer_name">
                <!-- TODO: translate сделан Автоперевод-->
                {{ 'Premium account' | localize }}
              </div>
              <div class="payment__offer_price">
                <div class="payment__offer_price-coast">
                  {{ payParams.premium_cost }}
                </div>
                <div class="payment__offer_price-currency">
                  <!-- руб -->
                </div>
              </div>
            </div>

            <!-- <div class="payment__offer_addit">
              <div v-if="offers.subscribe" class="payment__offer_addit-text">
                {{ 'or free by subscription' | localize }}
              </div>
              <button v-if="offers.subscribe" type="button" class="payment__button_offer">
                {{ 'subscribe' | localize }}
              </button>
            </div> -->
          </div>
        </div>
        <div class="payment__payoff_row">
          <div class="payment__payoff_row-card">
            <div class="payment__payoff_row-card--choise">
              <div
                :class="{
                  'payment__payoff_row-card--back':true,
                  'payment__payoff_row-card--back-active': activePayment === 'paySystems'}"
                @click="changeActivePayment('paySystems')"
              >
                <div class="payment__payoff_row-price">
                  <img class="payment__payoff_row-img" src="@/assets/icons/cardback.png">
                  <div class="payment__payoff_row-price--coast">
                    <div>{{ payParams.cloud_payments.price }}</div>
                  </div>
                </div>
              </div>
              <div
                :class="{
                  'payment__payoff_row-card--front':true,
                  'payment__payoff_row-card--front-active': activePayment === 'payToCard'}"
                @click="changeActivePayment('payToCard')"
              >
                <div class="payment__payoff_row-price">
                  <img class="payment__payoff_row-img" src="@/assets/icons/cardfront.png">
                  <div class="payment__payoff_row-price--coast">
                    <div>{{ payParams.card.price }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="payment__payoff_row-card--choise">
              <div
                :class="{
                  'payment__payoff_row-btc': true,
                  'payment__payoff_row-btc--active': activePayment === 'payToBtc'}"
                @click="changeActivePayment('payToBtc')"
              >
                <div class="payment__payoff_row-price">
                  <div class="payment__payoff_row-price--coast">
                    <div>{{ payParams.btc.price }}</div>
                    <!-- {{ offer.coast }} -->
                  </div>
                  <img class="payment__payoff_row-img" src="~/assets/icons/btc-icon.png">
                </div>
              </div>
              <div
                :class="{
                  'payment__payoff_row-tron': true,
                  'payment__payoff_row-tron--active': activePayment === 'payToTon'}"
                @click="changeActivePayment('payToTon')"
              >
                <div class="payment__payoff_row-price">
                  <div class="payment__payoff_row-price--coast">
                    <div>{{ payParams.tether.price }}</div>
                    <!-- {{ offer.coast }} -->
                  </div>
                  <img class="payment__payoff_row-img" src="@/assets/icons/t_icon.png">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activePayment === 'paySystems'" class="payment__card payment__card_systems">
          <label for="payment__card_number" class="payment__card_label" />
          <div class="payment__card_wrapper">
            <div class="payment__card_number payment__card_number-text" style="border:none">
              {{ 'Pay methods' | localize }}
            </div>
            <div class="payment__card_number-img">
              <fa-icon :icon="['fab', 'cc-mastercard']" size="3x" />
              <fa-icon :icon="['fab', 'cc-visa']" size="3x" />
              <fa-icon :icon="['fab', 'cc-apple-pay']" size="3x" />
              <fa-icon :icon="['fab', 'google-pay']" size="3x" />
            </div>
            <button type="button" class="payment__button_confirm" @click="createPaymentInfo(activePayment)">
              {{ 'send' | localize }}
            </button>
          </div>
        </div>
        <div v-if="activePayment === 'payToCard'" class="payment__card payment__card_card">
          <label for="payment__card_number" class="payment__card_label">{{ 'Bank card transfer' | localize }}</label>
          <div class="payment__card_wrapper">
            <div
              class="payment__card_number"
            >
              {{ payParams.card.account }}
              <!-- 5586 2000 8257 8185 -->
              <img
                class="payment__card_img"
                src="@/assets/icons/card_choise.png"
              >
            </div>
          </div>
        </div>
        <div v-if="activePayment === 'payToCard'" class="payment__confirm payment__confirm_paytocard">
          <label for="payment__card_number" class="payment__confirm_label">{{ 'After payment, enter the last 4 digits of the card and confirm' | localize }}</label>
          <div class="payment__confirm_wrapper">
            <input
              v-model="confirmNumber"
              type="text"
              class="payment__confirm_number"
              @input="changeNumConfirm ($event)"
              @change="changeNumConfirm ($event)"
            >
            <button type="button" class="payment__button_confirm" @click="createPaymentInfo(activePayment)">
              {{ 'send' | localize }}
            </button>
          </div>
          <div v-if="!isValidConfirm" class="error">
            {{ 'Invalid confirmation' | localize }}
          </div>
        </div>

        <div v-if="activePayment === 'payToBtc'" class="payment__card payment__card_btc">
          <label for="payment__card_number" class="payment__card_label">{{ 'Pls Make a tranfer to…' | localize }}</label>
          <div class="payment__card_wrapper">
            <div
              class="payment__card_number"
            >
              {{ payParams.btc.account }}
              <!-- 167XjcEK63K8viii7r1HdhAT6vozvLn4mY -->
              <img
                class="payment__card_img"
                src="@/assets/icons/card_choise.png"
              >
            </div>
          </div>
        </div>
        <div v-if="activePayment === 'payToBtc'" class="payment__confirm payment__confirm_paytobtc">
          <label for="payment__card_number" class="payment__confirm_label">{{ 'Pls fill Txid' | localize }}</label>
          <div class="payment__confirm_wrapper">
            <input
              v-model="confirmNumber"
              type="text"
              class="payment__confirm_number"
              @input="changeTextConfirm($event)"
              @change="changeTextConfirm($event)"
            >
            <button type="button" class="payment__button_confirm" @click="createPaymentInfo(activePayment)">
              {{ 'send' | localize }}
            </button>
          </div>
          <div v-if="!isValidConfirm" class="error">
            {{ 'Invalid confirmation' | localize }}
          </div>
        </div>
        <div v-if="activePayment === 'payToTon'" class="payment__card payment__card_ton">
          <label for="payment__card_number" class="payment__card_label">{{ 'Pls Make a tranfer to…' | localize }}</label>
          <div class="payment__card_wrapper">
            <div
              class="payment__card_number"
            >
              {{ payParams.tether.account }}
              <!-- 0x5c3e8cc8a97096f1fb2e3f7d04e08d6c2315e33e -->
              <img
                class="payment__card_img"
                src="@/assets/icons/card_choise.png"
              >
            </div>
          </div>
        </div>
        <div v-if="activePayment === 'payToTon'" class="payment__confirm payment__confirm_paytoton">
          <label for="payment__card_number" class="payment__confirm_label">{{ 'Pls fill Txid' | localize }}</label>
          <div class="payment__confirm_wrapper">
            <input
              v-model="confirmNumber"
              type="text"
              class="payment__confirm_number"
              @input="changeTextConfirm($event)"
              @change="changeTextConfirm($event)"
            >
            <button type="button" class="payment__button_confirm" @click="createPaymentInfo(activePayment)">
              {{ 'send' | localize }}
            </button>
          </div>
          <div v-if="!isValidConfirm" class="error">
            {{ 'Invalid confirmation' | localize }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputNumberError',
  props: {
    offer: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activePayment: 'paySystems',
      checkedS: false,
      checkedV: false,
      optionPopup: null,
      errors: [],
      cardNumber: null,
      confirmNumber: null,
      isValidConfirm: true,
      regexConfirm: /[0-9]{4}/,
      regTextConfirm: /[A-Za-z]{1}/,
      payData: null,
      payment_type: '',
      payment_source: '',
      products_id: [],
      video_courses_id: [],
      paymentInfo: null,
      payParams: null,
      offers: {
        addit: 'или бесплатно по подписке'
      },
      payInfoAddr: ''
    }
  },
  computed: {
    isRU () {
      return this.$auth.user.language === 'ru-RU'
    },
    numConfirm () {
      return this.changeNumConfirm()
    }
  },
  mounted () {
    this.startWindow()
  },
  beforeDestroy () {
    this.payParams = null
  },
  methods: {
    changeActivePayment (method) {
      this.activePayment = method
    },
    closePaymentWindow () {
      this.$emit('closePaymentWindow')
    },
    changeNumConfirm (e) {
      const number = e.target.value
      this.isNumberConfirmValid(number)
    },
    changeTextConfirm (e) {
      const text = e.target.value
      this.isTextConfirmValid(text)
    },
    isNumberConfirmValid (inputNumber) {
      this.isValidConfirm = this.regexConfirm.test(inputNumber)
    },
    isTextConfirmValid (inputNumber) {
      this.isValidConfirm = this.regTextConfirm.test(inputNumber)
    },
    buyInfo () {
      if (this.offer.products[0]) {
        this.checkedS = true
        this.products_id.push(this.offer.products[0].id)
      } else {
        this.products_id = []
      }
      if (this.offer.video_courses[0]) {
        this.checkedV = true
        this.video_courses_id.push(this.offer.video_courses[0].id)
      } else {
        this.video_courses_id = []
      }
    },
    updateBuyInfo () {
      if (this.checkedS) {
        this.products_id.push(this.offer.products[0].id)
      } else {
        this.products_id = []
      }
      if (this.checkedV) {
        this.video_courses_id.push(this.offer.video_courses[0].id)
      } else {
        this.video_courses_id = []
      }
    },
    createPaymentInfo (method) {
      this.payment_type = (method === 'payToCard') ? 'CARD' : (method === 'payToBtc') ? 'BTC' : (method === 'payToTon') ? 'TETHER' : 'CLOUDPAYMENTS'
      if (this.offer) {
        this.buyInfo()
        this.payData = {
          amount: this.payParams.cloud_payments.price,
          payment_type: this.payment_type,
          manual: true,
          payment_source: this.confirmNumber,
          package_id: this.offer.products[0].package_id,
          products: this.products_id,
          video_courses: this.video_courses_id
        }
        this.payInfoAddr = 'shop'
      } else {
        this.payData = {
          amount: this.payParams.cloud_payments.price,
          payment_type: this.payment_type,
          manual: true,
          payment_source: this.confirmNumber
        }
        this.payInfoAddr = 'premium'
      }
      if (method === 'paySystems') {
        this._pay()
      } else if (this.payData.payment_source) {
        this.getPaymentInfo(this.payData)
      } else {
        this.isValidConfirm = false
        this.$message.error(this.$options.filters.localize('Confirm is reuired'))
      }
      this.products_id = []
      this.video_courses_id = []
    },
    async getPaymentInfo (data) {
      try {
        const response = await this.$axios.post(`/api/v1/payment_info/${this.payInfoAddr}`, data)
        this.paymentInfo = response.data.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
    },
    async startWindow () {
      if (this.offer === undefined) {
        await this.getPremiumParams()
      } else {
        await this.getPayParams()
      }
    },
    getPremiumParams () {
      this.$axios.get('/api/v1/shop/cost/premium').then((response) => {
        this.payParams = response.data.data
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => { this.loading = false })
    },
    async getPayParams () {
      // eslint-disable-next-line no-console
      console.log(this.payParams)
      this.buyInfo()
      const data = {
        package_id: this.offer.products[0].package_id,
        products: this.products_id,
        video_courses: this.video_courses_id
      }
      try {
        const response = await this.$axios.post('/api/v1/shop/cost/shop', data)
        this.payParams = response.data.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
      this.products_id = []
      this.video_courses_id = []
    },
    async updatePayParams () {
      this.updateBuyInfo()
      const data = {
        package_id: this.offer.products[0].package_id,
        products: this.products_id,
        video_courses: this.video_courses_id
      }
      // eslint-disable-next-line no-console
      console.log(data)
      try {
        const response = await this.$axios.post('/api/v1/shop/cost/shop', data)
        this.payParams = response.data.data
      } catch (e) {
        this.$message.error(e.response.data)
      }
      this.products_id = []
      this.video_courses_id = []
    },
    _pay () {
      // eslint-disable-next-line no-console
      console.log(this.isRU)
      // eslint-disable-next-line no-undef
      const payment = new cp.CloudPayments()
      payment.pay('auth', // или 'charge'
        {
          // publicId: 'test_api_00000000000000000000001', // тестовый из документации
          publicId: this.payParams.cloud_payments_params.account, // id из личного кабинета
          description: this.payParams.cloud_payments_params.pay_for, // назначение
          amount: this.payParams.cloud_payments.price, // сумма
          currency: this.isRU ? 'RUB' : 'USD', // валюта
          // accountId: this.paymentInfo.email, // идентификатор плательщика (необязательно)
          // invoiceId: this.paymentInfo.saleId, // номер заказа  (необязательно)
          skin: 'classic' // дизайн виджета (необязательно)
          // data: {
          //   payInfo: this.payData
          // }
        },
        {
          onSuccess: (options) => { // success
            this.$message.success(this.$options.filters.localize('successfulPayment'))
          },
          onFail: (reason, options) => { // fail
            this.$message.error(reason)
          },
          onComplete: (paymentResult, options) => { // Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            this.$emit('onSent')
          }
        }
      )
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/_variables.scss';
.error{
  color:red;
}
.payment {
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 970px;
    max-width: 970px;
    height: 610px;
    padding: 30px;
    background-color: $background-color;
    border: solid 1px $border-color;
    border-radius: 15px;
  }
  &__close {
    &_img {
      padding: 10px;
    }
  }
  &__title {
    display: flex;
    flex-direction: column;
    height: 25px;
    color: #ffffff;
    font-family: "Arial MT", sans-serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 35px;
    text-align: left;
    &_main {
      margin-top: 30px;
    }
    &_descr {
      width: 191px;
      height: 16px;
      margin-top: 10px;
      color: #01b56b;
      font-family: "Arial MT", sans-serif;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
      letter-spacing: 0.4px;
    }
  }
  &__offer {
    display: flex;
    flex-direction: column;
    margin-top: 70px;
    border-top: solid 1px $border-color;
    &_row {
      display: flex;
      justify-content: flex-start;
      height: 60px;
      border-bottom: solid 1px $border-color;
      align-items: center;
    }
    &_info {
      display: flex;
      width: 350px;
      justify-content: space-between;
      &-premium {
        margin-left: 14px;
        display: flex;
        width: 350px;
        justify-content: space-between;
      }
    }
    &_name {
      padding-left: 30px;
      color: #a3a3a3;
      font-family: "Arial MT", sans-serif;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
      &-premium {
        margin-left: 30px;
        padding-left: 30px;
        color: #a3a3a3;
        font-family: "Arial MT", sans-serif;
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        line-height: 25px;
        text-align: left;
      }
    }
    &_price {
      display: flex;
      text-align: right;
      color: #a3a3a3;
      font-family: "Arial MT", sans-serif;
      font-size: 20px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
      &-currency, &-coast {
        padding-left: 10px;
      }
    }
    &_addit {
      padding-left: 30px;
      width: 550px;
      justify-content: flex-end;
      display: flex;
      height: 14px;
      color: #919191;
      font-family: "Arial MT", sans-serif;
      font-size: 13px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: left;
      text-decoration: underline;
      align-items: center;
      &-text {
        padding-left: 50px;
        word-break: normal;
      }
    }
  }
  &__payoff {
    display: flex;
    &_row {
      display: flex;
      &-card {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        &--choise {
          display: flex;
          width: 50%;
          justify-content: space-around;
        }
        &--back, &--front {
          display: flex;
          height: 55px;
          background-color: #646464;
          border-radius: 5px;
          align-items: center;
          min-width: 195px;
          cursor: pointer;
          &-active{
            display: flex;
            height: 55px;
            background-color: #007545;
            border-radius: 5px;
            align-items: center;
            min-width: 195px;
            cursor: pointer;
          }
        }
        &--coast, &--currency {
          height: 22px;
          color: #ffffff;
          font-family: "Open Sans";
          font-size: 25px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: 25px;
          text-align: left;
        }
      }
      &-img {
        padding: 0 10px;
        width: 48px;
        height: fit-content;
        align-self: center;
      }
      &-price {
        width: 100%;
        display: flex;
        height: 22px;
        color: #ffffff;
        font-family: "Arial MT", sans-serif;
        font-size: 25px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: normal;
        line-height: 25px;
        justify-content: space-between;
        &--coast {
          padding: 0 10px;
        }
      }
      &-btc, &-tron {
        display: flex;
        height: 55px;
        background-color: #646464;
        border-radius: 5px;
        align-items: center;
        min-width: 195px;
        justify-content: space-around;
        cursor: pointer;
        &--active {
          background-color: #007545;
          cursor: pointer;
        }
      }
    }
  }
  &__card {
    display: flex;
    flex-direction: column;
    &_wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    &_label {
      padding-bottom: 10px;
      word-break: break-word;
    }
    &_number {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 656px;
      height: 43px;
      padding: 0 15px;
      border: 1px solid #3d3d3d;
      background-color: #161616;
      font-size: 18px;
      color: white;
      &-img {
        display: flex;
        width: 33%;
        justify-content: space-around;
      }
    }
    &_img {
      width: 20px;
    }
  }
  &__confirm {
    display: flex;
    flex-direction: column;
    &_wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &_label {
      padding-bottom: 13px;
    }
    &_number {
      width: 100%;
      max-width: 656px;
      height: 43px;
      border: 1px solid #3d3d3d;
      background-color: #161616;
      font-size: 22px;
      color: white
    }
  }
  &__overlay {
    display: flex;
    z-index: 998;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &__button {
    &_offer, &_confirm {
      width: 160px;
      height: 41px;
      margin-left: 10px;
      background-color: #007545;
      border-radius: 20px;
      border: solid 1px #007545;
      color: #ffffff;
      font-family: "Arial MT", sans-serif;
      font-size: 15px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 25px;
      text-align: left;
      text-align: center;
      cursor: pointer;
      word-break: normal;
      line-height: normal;
    }
  }
}
@media (min-width: 850px) and (max-width: 1050px){
  .payment {
    &__main {
      width: unset;
      max-width: 100%;
      padding: 15px;
    }
    &__title {
      align-items: center;
    }
    &__offer {
      &_info {
        width: 90%;
        &-premium {
          width: 90%;
        }
      }
      &_addit {
        width: 400px;
      }
    }
    &__payoff {
      &_row {
        &-card {
          &--back, &--front {
            min-width: 165px;
            margin: 0 5px;
          }
        }
        &-btc, &-tron {
          min-width: 165px;
          margin: 0 5px;
        }
        &-price {
          font-size: 18px;
        }
      }
    }
    &__card {
      flex-wrap: nowrap;
      &_number {
        &-img {
          width: 48%;
        }
      }
    }
  }
}
@media (min-width: 520px) and (max-width: 850px){
  .payment {
    &__main {
    width: unset;
    max-width: 100%;
    padding: 15px;
    height: 100%;
    }
    &__title {
      align-items: center;
      margin: 0 0 40px 0;
    }
    &__offer {
      &_info {
        width: 90%;
        &-premium {
          width: 90%;
        }
      }
      &_name {
        padding-left: 10px;
      }
      &_addit {
        width: 400px;
        &-text {
          padding-left: 0;
        }
      }
    }
    &__payoff {
      &_row {
        &-card {
          &--back, &--front {
            min-width: 165px;
            margin: 5px 5px;
          }
        }
        &-btc, &-tron {
          min-width: 165px;
          margin: 5px 5px;
        }
        &-price {
          font-size: 18px;
          width: 100%;
          justify-content: space-between;
          &--coast {
            order: 2
          }
        }
        &-card {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 10px;
          &--choise {
            display: flex;
            width: 100%;
            justify-content: space-around;
          }
        }
      }
    }
    &__button {
      &_offer, &_confirm {
        width: 120px;
        word-break: normal;
        line-height: normal;
      }
    }
    &__card {
      width: 100%;
      align-self: center;
      margin: 10px 0;
      &_wrapper {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
      }
      &_number {
        width: 100%;
        font-size: 16px;
        justify-content: space-between;
        &-text {
          justify-content: center;
        }
        &-img {
          width: 100%;
          margin-bottom: 15px;
        }
      }
    }
  }
}
@media (min-width: 375px) and (max-width: 520px){
  .payment {
    &__main {
      width: unset;
      max-width: 100%;
      padding: 5px;
      height: 100%;
    }
    &__title {
      align-items: center;
      margin: 10px 0 40px 0;
      &_main {
        margin-top: 20px;
        font-size: 22px;
      }
    }
    &__offer {
      margin-top: 20px;
      &_row {
        height: 100%;
        display: flex;
        justify-content: center;
        border-bottom: none;
        height: 60px;
        align-items: center;
        flex-wrap: wrap;
      }
      &_info {
        width: 70%;
        margin: 10px 0;
        &-premium {
          width: 70%;
        }
      }
      &_name {
        padding-left: 10px;
      }
      &_addit {
        height: 0;
        max-width: 300px;
        padding-left: 0;
        border-bottom: solid 1px $border-color;
        justify-content: center;
        &-text {
          padding-left: 0;
        }
      }
    }
    &__payoff {
      &_row {
        &-card {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          &--choise {
            display: flex;
            width: 100%;
            justify-content: center;
          }
          &--back, &--front {
            min-width: 160px;
            margin: 5px 5px;
          }
        }
        &-btc, &-tron {
          min-width: 160px;
          margin: 5px 5px;
        }
        &-price {
          font-size: 18px;
          width: 100%;
          justify-content: space-between;
          &--coast {
            order: 2
          }
        }
        &-img {
          width: 44px;
        }
      }
    }
    &__button {
      &_offer, &_confirm {
        width: 120px;
        word-break: normal;
        line-height: normal;
      }
    }
    &__card {
      width: 100%;
      align-self: center;
      margin: 10px 0;
      &_wrapper {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
      }
      &_label {
        word-break: break-word;
      }
      &_number {
        width: 100%;
        font-size: 16px;
        justify-content: space-between;
        &-text {
          justify-content: center;
        }
        &-img {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }
    &__confirm {
      &_wrapper {
        margin-bottom: 10px;
      }
    }
  }
}
@media (max-width: 375px){
  .payment {
    &__main {
      width: 100%;
      padding: 5px;
      height: 100%;
    }
    &__title {
      align-items: center;
      margin: 10px 0 40px 0;
      &_main {
        margin-top: 20px;
        font-size: 20px;
      }
    }
    &__offer {
      margin-top: 70px;
      &_row {
        height: 100%;
        display: flex;
        justify-content: center;
        border-bottom: none;
        height: 60px;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
      }
      &_info {
        width: 90%;
        font-size: 14px;
        &-premium {
          width: 99%;
          margin: 0;
        }
      }
      &_name {
        padding-left: 10px;
      }
      &_addit {
        height: 0;
        max-width: 300px;
        padding-left: 0;
        border-bottom: solid 1px $border-color;
        justify-content: center;
        &-text {
          padding-left: 0;
        }
      }
      &_price {
        &-coast {
          font-size: 16px;
        }
      }
    }
    &__card {
      &_number {
        justify-content: space-between;
        &-text {
          word-break: break-word;
        }
      }
    }
    &__payoff {
      &_row {
        &-card {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          &--choise {
            display: flex;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          &--back, &--front {
            min-width: 200px;
            height: 40px;
            margin: 5px 5px;
          }
        }
        &-btc, &-tron {
          min-width: 200px;
          height: 40px;
          margin: 5px 5px;
          flex-flow: wrap;
        }
        &-price {
          font-size: 18px;
          width: 100%;
          justify-content: space-between;
          &--coast {
            order: 2
          }
        }
      }
    }
    &__button {
      &_offer, &_confirm {
        width: 120px;
        word-break: normal;
        line-height: normal;
      }
    }
    &__card {
      width: 100%;
      max-width: 300px;
      align-self: center;
      margin: 10px 0;
      &_wrapper {
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
      }
      &_number {
        width: 100%;
        font-size: 16px;
        justify-content: center;
        &-img {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }
    &__confirm {
      flex-wrap: wrap;
      max-width: 300px;
      align-self: center;
      word-break: break-word;
      margin: 10px 0;
    }
  }
}

</style>
