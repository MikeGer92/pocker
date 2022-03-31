<template>
  <div class="payment-card">
    <div class="payment-card__row">
      <div class="payment-card__label">{{ 'makeTransactionText' | localize }}</div>
      <div style="display: flex; align-items: center; justify-content: space-between">
        <rl-input
          class="payment-card__input"
          :value="paymentInfo.usdt"
          :can-copy="true"
          disabled
        />
        <div style="margin-left: 20px; width: 90px;">for ERC20</div>
      </div>
    </div>
    <div class="payment-card__row">
      <div class="payment-card__label">{{ 'fillTextIdText' | localize }}</div>
      <rl-input
        :value="value"
        @input="_onInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    paymentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    _onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
