<template>
  <div class="layout">
    <popup
      v-model="showPaymentPopup"
      width="550px"
    >
      <activate-form
        @confirm="_showPaymentForm"
        @cancel="showPaymentPopup = false"
      />
    </popup>
    <el-dialog
      :visible.sync="paymentWindowRes"
    >
      <PaymentWindow
        v-if="paymentWindowRes"
        @closePaymentWindow="paymentWindowRes=false"
      />
    </el-dialog>
    <!-- <popup
      v-model="showPaymentForm"
      width="auto"
    >
      <payment
        :title="'payForAccountText' | localize"
        @onCancel="_closePayment()"
      />
    </popup> -->

    <div class="layout__header">
      <Header />
    </div>
    <div class="layout__container">
      <Nuxt />
    </div>
    <div class="layout__footer footer">
      <div class="footer__left">
        <div class="footer__copyright copyright">
          <transition name="fade">
            <div
              v-if="showDetails"
              class="copyright__popup"
              @mouseleave="showDetails = false"
            >
              <div class="copyright__wrapper">
                <div class="copyright__row">
                  <div class="copyright__label">
                    {{ 'companyField' | localize }}:
                  </div>
                  <div class="copyright__value">
                    {{ 'aboutCompanyName' | localize }}
                  </div>
                </div>

                <div class="copyright__row">
                  <div class="copyright__label">
                    {{ 'addressField' | localize }}:
                  </div>
                  <div class="copyright__value">
                    {{ 'aboutCompanyAddress' | localize }}
                  </div>
                </div>
                <div class="copyright__row">
                  <div class="copyright__label">
                    {{ 'innField' | localize }}:
                  </div>
                  <div class="copyright__value">
                    9705147714
                  </div>
                </div>
                <div class="copyright__row">
                  <div class="copyright__label">
                    {{ 'aboutEmailField' | localize }}:
                  </div>
                  <div class="copyright__value">
                    support@holdem.wiki
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div
            class="copyright__text"
            @mouseover="showDetails = true"
          >
            &copy; {{ new Date().getFullYear() }} Holdem LLC
          </div>
        </div>
        <div class="footer__link">
          <a
            :href="`/public/${lang}/terms_and_contitions.pdf`"
            target="_blank"
            class="footer__text-item"
          >
            {{ 'terms' | localize }}
          </a>
          <a
            :href="`/public/${lang}/privacy.pdf`"
            target="_blank"
            class="footer__text-item"
          >
            {{ 'privacy' | localize }}
          </a>
          <a
            :href="`/public/${lang}/return_policy.pdf`"
            target="_blank"
            class="footer__text-item"
          >
            {{ 'returnPolicy' | localize }}
          </a>
        </div>
      </div>
      <div class="footer__right">
        <div class="footer__item">
          <a
            class="footer__link"
            href="mailto:support@holdem.wiki"
          >
            support@holdem.wiki
          </a>
        </div>
        <div class="footer__items">
          <div class="footer__items_item">
            <img src="@/assets/icons/visa.png" alt="visa">
          </div>
          <div class="footer__items_item">
            <img src="@/assets/icons/mc.png" alt="visa">
          </div>
          <div class="footer__items_item">
            <img src="@/assets/icons/btc.png" alt="visa">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Payment from '@/components/Payment'
import PaymentWindow from '@/components/Payment/PaymentWindow.vue'

export default {
  components: {
    PaymentWindow
  },
  data () {
    return {
      showDetails: false,
      showPaymentForm: false,
      paymentWindowRes: false
    }
  },
  computed: {
    lang () {
      return this.$store.state.auth.user ? this.$store.state.auth.user.language : 'en-US'
    },
    showPaymentPopup: {
      get () {
        return this.$store.getters['user/showPaymentPopup']
      },
      set (state) {
        this.$store.dispatch('user/changePaymentPopupState', state)
      }
    }
  },
  methods: {
    _showPaymentForm () {
      this.showPaymentPopup = false
      this.paymentWindowRes = true
    },
    _closePayment () {
      this.showPaymentPopup = false
      this.showPaymentForm = false
    }

  }
}
</script>

<style lang="scss">
@import '~/assets/_variables.scss';
.el-dialog__close {
    width: 20px;
    height: 20px;
}
.el-dialog__header {
    padding: 0;
}
.el-dialog__headerbtn {
  position: absolute;
  top: 60px;
  right: calc(20px - ((1920px - 100vw) / 4));
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
}
.layout {
  &__wrapper {
    display: flex;
    align-items: stretch;
  }

  &__left {
    flex-shrink: 0;
    width: 280px;
    border-right: 2px solid $border-color;
    padding: 40px 20px;
  }

  &__right {
    flex-grow: 1;
  }

  &__main {
    padding: 40px 40px 40px 24px;
    flex-grow: 1;
  }
}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $form-background;
  padding: 28px 28px;

  &__left {
    display: flex;
    align-items: center;
  }

  &__text-item {
    color: $main-gray;
    text-decoration: none;
    transition: all .2s ease-out;
    margin-left: 20px;

    &:hover {
      color: #fff;
    }
  }

  &__right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__link {
    margin-right: 55px;
  }
  &__items {
    display: flex;
    align-items: center;
    &_item {
      margin-right: 55px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__copyright {
    font-size: 14px;
    color: #fff;
    text-transform: uppercase;
    position: relative;
  }

  &__link {
    font-size: 14px;
    color: $main-gray;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.copyright {
  cursor: pointer;

  &__popup {
    position: absolute;
    bottom: 0;
    left: -50px;
    padding-bottom: 40px;
  }

  &__wrapper {
    border: 2px solid $border-color;
    border-radius: 5px;
    padding: 20px;
    width: 500px;
    background: $form-background;
    font-size: 14px;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -12px;
      left: calc(50% - 10px);
      border-bottom: 2px solid $border-color;
      border-left: 2px solid $border-color;
      background: $form-background;
      width: 20px;
      height: 20px;
      transform: rotate(-45deg);
      z-index: 2;
    }
  }

  &__row {
    line-height: 140%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    text-transform: none;
    color: #fff;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    font-weight: bold;
  }

  &__value {
    margin-left: 10px;
  }
}
@media (min-width: 500px) and (max-width: 1080px){
  .footer {
    width: 100%;
    padding: 15px 15px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    &__left {
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
    }
    &__link {
      margin-right: 0px;
    }
    &__right {
      padding: 15px 0;
    }
    &__items {
      &_item {
        margin-right: 15px;
      }
    }
  }
}
@media (min-width: 750px) and (max-width: 1050px){
  .el-dialog__headerbtn {
    position: absolute;
    top: 60px;
    right: calc(20px - ((1420px - 100vw) / 4));
  }
}
@media (min-width: 520px) and (max-width: 750px){
  .el-dialog__headerbtn {
    position: absolute;
    top: 50px;
    right: calc(20px - ((1000px - 100vw) / 4));
  }
}
@media (min-width: 400px) and (max-width: 500px){
  .footer {
    width: 100%;
    padding: 15px 15px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    &__left {
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
    }
    &__link {
      padding-top: 15px;
      margin-right: 0px;
    }
    &__right {
      padding: 15px 15px;
    }
    &__items {
      &_item {
        margin-right: 15px;
      }
    }
  }
}
@media (min-width: 375px) and (max-width: 520px){
    .el-dialog__body {
      transform: translate(-50%, -15%);
    }
  .el-dialog__headerbtn {
    position: absolute;
    top: -40px;
    right: calc(20px - ((760px - 100vw) / 4));
  }
}
@media (max-width: 375px) {
  .el-dialog__body {
    transform: translate(-50%, -15%);
  }
  .el-dialog__headerbtn {
    position: absolute;
    top: -50px;
    right: calc(20px - ((460px - 100vw) / 4));
  }
}
@media (min-width: 320px) and (max-width: 400px){
  .footer {
    width: 100%;
    padding: 15px 0;
    flex-wrap: wrap;
    &__left {
      flex-wrap: wrap;
      justify-content: center;
    }
    &__right {
      padding: 0px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__items {
      padding-top: 15px;
      &:last-child {
        margin-right: 0px;
      }
    }
    &__link {
      margin: 0px;
      padding-top: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__text {
      &-item {
        margin-left: 0px;
        margin: 0 10px;
        &:nth-child(3) {
          padding-top: 0px;
        }
      }
    }
  }
}
@media (max-width: 320px){
  .footer {
    width: 100%;
    padding: 15px 0;
    flex-wrap: wrap;
    &__left {
      flex-wrap: wrap;
      justify-content: center;
    }
    &__right {
      padding: 0px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__items {
      display: flex;
      width: 90%;
      justify-content: space-around;
      padding-top: 15px;
      &:last-child {
        margin-right: 0px;
      }
      &_item {
        margin-right: 0;
      }
    }
    &__link {
      margin: 0px;
      padding-top: 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__text {
      &-item {
        margin-left: 0px;
        margin: 0 10px;
        &:nth-child(3) {
          padding-top: 15px;
        }
      }
    }
  }
}
</style>
