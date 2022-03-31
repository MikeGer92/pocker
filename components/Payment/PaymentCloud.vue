<template>
  <div class="payment-cloud">
    <div class="payment-cloud__wrapper">
      <div class="payment-cloud__text">
        {{ 'paymentsMethod' | localize }}:
      </div>
      <div class="payment-cloud__main">
        <div class="payment-cloud__item">
          <i style="font-size: 50px" class="fab fa-cc-mastercard" />
        </div>
        <div class="payment-cloud__item">
          <i style="font-size: 50px" class="fab fa-cc-visa" />
        </div>
        <div class="payment-cloud__item">
          <i style="font-size: 50px" class="fab fa-apple-pay" />
        </div>
        <div class="payment-cloud__item">
          <i style="font-size: 50px" class="fab fa-google-pay" />
        </div>
      </div>
    </div>
    <div class="payment-cloud__button">
      <rl-button @click="_pay()">
        {{ 'pay' | localize }}
      </rl-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paymentInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    isRU () {
      return this.$store.getters['user/language'] === 'ru-RU'
    }
  },
  methods: {
    _pay () {
      // eslint-disable-next-line no-undef
      const payment = new cp.CloudPayments()
      payment.pay('auth', // или 'charge'
        {
          publicId: this.paymentInfo.publicId, // id из личного кабинета
          description: this.paymentInfo.saleDesc, // назначение
          amount: this.isRU ? Number(this.paymentInfo.price.price.rub) : Number(this.paymentInfo.price.price.usd), // сумма
          currency: this.isRU ? 'RUB' : 'USD', // валюта
          accountId: this.paymentInfo.email, // идентификатор плательщика (необязательно)
          invoiceId: this.paymentInfo.saleId, // номер заказа  (необязательно)
          skin: 'classic', // дизайн виджета (необязательно)
          data: {
            CustomerReceipt: {
              items: this.paymentInfo.items
            }
          }
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

<style lang="scss" scoped>
.payment-cloud {
  margin-top: 20px;

  &__right {
    margin-left: 30px;
  }

  &__text {
    text-align: center;
    font-size: 22px;
  }

  &__main {
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin-left: 50px;
  }

  &__wrapper {
    height: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    display: flex;
    justify-content: flex-end;
  }

  &__item {
    margin-right: 25px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
