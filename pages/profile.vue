/* eslint-disable vue/no-v-html */
<template>
  <div
    v-loading="loading"
    class="profile"
    style="width:100vw"
  >
    <!--<popup-->
    <!--  v-model="showPaymentPopup"-->
    <!--  width="auto"-->
    <!--&gt;-->
    <!--  <payment-->
    <!--    :title="'payForAccountText' | localize"-->
    <!--    @onCancel="showPaymentPopup = false"-->
    <!--  />-->
    <!--</popup>-->

    <div v-if="$auth.user">
      <div class="profile__user profile-user">
        <client-only>
          <avatar-cropper
            v-model="avatarTrigger"
            :trigger="true"
            :labels="{
              cancel: $options.filters.localize('cancelText'),
              submit: $options.filters.localize('uploadText')
            }"
            :output-options="{
              width: '200px',
              height: '200px',
              movable: true,
              autoCropArea: 0,
              aspectRatio: 1
            }"
            :upload-handler="_uploadAvatar"
            upload-form-name="avatar"
          />
        </client-only>
        <div
          v-loading="avatarLoading"
          class="profile-user__avatar"
        >
          <img
            v-if="$auth.user.avatar"
            width="200px"
            height="200px"
            :src="`https://pokerstove.relabs.ru/${$auth.user.avatar}`"
            alt="avatar"
            class="profile-user__avatar-img"
          >
          <img
            v-else
            width="200px"
            height="200px"
            src="~@/assets/icons/lk_icon.png"
            alt="avatar"
            class="profile-user__avatar-img"
          >
          <div
            class="profile-user__change-avatar-btn"
            @click="avatarTrigger = true"
          >
            {{ 'changePhotoText' | localize }}
          </div>
        </div>
        <div class="profile-user__info">
          <!--     Login row     -->
          <div class="profile-user__row">
            <div class="profile-user__text">
              <div class="profile-user__text-label">
                {{ 'loginField' | localize }}:
              </div>
              <div class="profile-user__text-value">
                <template v-if="changingLogin">
                  <rl-input
                    v-model="newLogin"
                    style="width: 150px;"
                    @onEsc="_cancelChangingLogin"
                  />
                </template>
                <template v-else>
                  {{ $auth.user.username }}
                </template>
              </div>
            </div>
            <div
              class="profile-user__controls"
            >
              <template v-if="changingLogin">
                <div
                  class="profile-user__btn"
                  @click="_saveLogin"
                >
                  {{ 'save' | localize }}
                </div>
                <div
                  class="profile-user__btn profile-user__btn--gray"
                  @click="_cancelChangingLogin"
                >
                  {{ 'cancelText' | localize }}
                </div>
              </template>
              <template v-else>
                <div
                  class="profile-user__btn"
                  @click="changingLogin = true"
                >
                  {{ 'change' | localize }}
                </div>
              </template>
            </div>
          </div>
          <!--     Password row     -->
          <div class="profile-user__row">
            <div class="profile-user__text">
              <div class="profile-user__text-label">
                {{ 'passwordField' | localize }}:
              </div>
              <div class="profile-user__text-value">
                *********
              </div>
            </div>
          </div>
          <!--     Email row     -->
          <div class="profile-user__row">
            <div class="profile-user__text">
              <div class="profile-user__text-label">
                {{ 'emailField' | localize }}:
              </div>
              <div class="profile-user__text-value">
                {{ $auth.user.email }}
              </div>
            </div>
          </div>
          <!--     Referral row     -->
          <div class="profile-user__row">
            <div class="profile-user__text">
              <div class="profile-user__text-label">
                {{ 'referralUrl' | localize }}:
              </div>
              <div class="profile-user__text-value">
                {{ $auth.user.referral_attribute }}
              </div>
            </div>
            <div
              class="profile-user__controls"
            >
              <div
                v-clipboard:copy="$auth.user.referral_attribute"
                v-clipboard:success="_onReferralCopy"
                class="profile-user__btn"
              >
                {{ 'copy' | localize }}
              </div>
            </div>
          </div>
          <!--     Personal account row     -->
          <div class="profile-user__row">
            <div class="profile-user__text">
              <div class="profile-user__text-label">
                {{ 'personalAccountText' | localize }}:
              </div>
              <div class="profile-user__text-value">
                {{ $auth.user.account }}
              </div>
            </div>
          </div>
          <!--     Credit row     -->
          <div class="profile-user__row">
            <div class="profile-user__text">
              <div class="profile-user__text-label">
                {{ 'creditText' | localize }}:
              </div>
              <div class="profile-user__text-value">
                {{ $auth.user.balance }}
              </div>
            </div>
            <!--          <div-->
            <!--            class="profile-user__controls"-->
            <!--          >-->
            <!--            <div-->
            <!--              class="profile-user__btn"-->
            <!--            >-->
            <!--              Cash out-->
            <!--            </div>-->
            <!--          </div>-->
          </div>
        </div>
      </div>
      <div class="profile__tabs">
        <div
          :class="{
            'profile__tab': true,
            'profile__tab--active': activeTab === 'purchases'
          }"
          @click="_changeActiveTab('purchases')"
        >
          {{ 'purchases' | localize }}
        </div>
        <div
          :class="{
            'profile__tab': true,
            'profile__tab--active': activeTab === 'referral'
          }"
          @click="_changeActiveTab('referral')"
        >
          {{ 'referralPaymentsText' | localize }}
        </div>
        <div
          :class="{
            'profile__tab': true,
            'profile__tab--active': activeTab === 'strategy'
          }"
          @click="_changeActiveTab('strategy')"
        >
          {{ 'inputStrategyText' | localize }}
        </div>
      </div>
      <div
        v-loading="paymentsLoading"
        class="profile__main"
      >
        <template v-if="activeTab === 'purchases'">
          <p
            v-if="purchases.list.length === 0"
            class="profile-table__empty"
          >
            {{ 'noPurchasesText' | localize }}
          </p>

          <table
            v-if="purchases.list.length > 0"
            cellspacing="0"
            class="profile-table"
          >
            <tr class="profile-table__row">
              <th class="profile-table__col">
                {{ 'dateTimeText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'typeText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'purchaseText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'amountText' | localize }}
              </th>
            </tr>
            <tr
              v-for="(row, row_index) in purchases.list"
              :key="'payment-row-' + row_index"
              class="profile-table__row"
            >
              <th class="profile-table__col">
                {{ _getTime(row.ctime) }}
              </th>
              <th class="profile-table__col">
                {{ row.payment_type }}
              </th>
              <th class="profile-table__col">
                {{ row.product_name }}
              </th>
              <th class="profile-table__col">
                {{ row.price }}
              </th>
            </tr>
          </table>
          <div
            v-if="purchases.total > 1"
            class="profile__pagination"
          >
            <el-pagination
              layout="prev, pager, next"
              :total="purchases.total"
              :current-page="purchases.page"
              @current-change="_paymentsPageChangeHandler"
            />
            <!--            <sliding-pagination-->
            <!--              :current="purchases.page"-->
            <!--              :total="purchases.total"-->
            <!--              @page-change="_paymentsPageChangeHandler"-->
            <!--            />-->
          </div>
        </template>
        <template v-else-if="activeTab === 'referral'">
          <p
            v-if="referralPayments.list.length === 0"
            class="profile-table__empty"
          >
            {{ 'noReferralText' | localize }}
          </p>

          <table
            v-if="referralPayments.list.length > 0"
            cellspacing="0"
            class="profile-table"
          >
            <tr class="profile-table__row">
              <th class="profile-table__col">
                {{ 'dateTimeText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'userText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'actionText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'percentText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'amountText' | localize }}
              </th>
            </tr>
            <tr
              v-for="(row, row_index) in referralPayments.list"
              :key="'payment-row-' + row_index"
              class="profile-table__row"
            >
              <th class="profile-table__col">
                {{ _getTime(row.ctime) }}
              </th>
              <th class="profile-table__col">
                {{ row.affilate_username }}
              </th>
              <th class="profile-table__col">
                {{ row.action }}
              </th>
              <th class="profile-table__col">
                {{ row.percent * 100 }}%
              </th>
              <th class="profile-table__col">
                {{ row.amount / 100 }}
              </th>
            </tr>
          </table>
          <div
            v-if="referralPayments.total > 1"
            class="profile__pagination"
          >
            <el-pagination
              layout="prev, pager, next"
              :total="referralPayments.total"
              :current-page="referralPayments.page"
              @current-change="_affiliatePaymentsPageChangeHandler"
            />
            <!--            <sliding-pagination-->
            <!--              :current="referralPayments.page"-->
            <!--              :total="referralPayments.total"-->
            <!--              @page-change="_affiliatePaymentsPageChangeHandler"-->
            <!--            />-->
          </div>
        </template>
        <template v-else-if="activeTab === 'strategy'">
          <p
            v-if="inputStrategies.list.length === 0"
            class="profile-table__empty"
          >
            {{ 'noInputStrategyText' | localize }}
          </p>

          <table
            v-if="inputStrategies.list.length > 0"
            cellspacing="0"
            class="profile-table"
          >
            <tr class="profile-table__row">
              <th class="profile-table__col">
                {{ 'dateTimeText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'userText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'nameField' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'acceptText' | localize }}
              </th>
              <th class="profile-table__col">
                {{ 'declineText' | localize }}
              </th>
            </tr>
            <tr
              v-for="(row, row_index) in inputStrategies.list"
              :key="'payment-row-' + row_index"
              class="profile-table__row"
            >
              <th class="profile-table__col">
                {{ _getTime(row.ctime) }}
              </th>
              <th class="profile-table__col">
                {{ row.source_user_name }}
              </th>
              <th class="profile-table__col">
                {{ row.poker_category_name }}
              </th>
              <th class="profile-table__col">
                <a
                  class="profile-table__btn"
                  @click="_acceptStrategyClickHandler(row)"
                >
                  {{ 'acceptText' | localize }}
                  <v-icon
                    name="check"
                    scale="1.2"
                  />
                </a>
              </th>
              <th class="profile-table__col">
                <a
                  class="profile-table__btn profile-table__btn--red"
                  @click="_rejectStrategyClickHandler(row)"
                >
                  {{ 'declineText' | localize }}
                  <v-icon
                    name="times"
                    scale="1.3"
                  />
                </a>
              </th>
            </tr>
          </table>
          <div
            v-if="inputStrategies.total > 1"
            class="profile__pagination"
          >
            <el-pagination
              layout="prev, pager, next"
              :total="inputStrategies.total"
              :current-page="inputStrategies.page"
              @current-change="_incomingStrategiesPageChangeHandler"
            />
            <!--            <sliding-pagination-->
            <!--              :current="inputStrategies.page"-->
            <!--              :total="inputStrategies.total"-->
            <!--              @page-change="_incomingStrategiesPageChangeHandler"-->
            <!--            />-->
          </div>
        </template>
      </div>
    </div>
    <transition name="fade3">
      <confirm-popup
        v-model="strategyAction.reject"
        :title="'declineStrategyTitle' | localize"
        :text="'declineStrategyText' | localize"
        :accept-label="'declineText' | localize"
        :loading="strategyAction.loading"
        @onConfirm="_rejectStrategy"
        @onClose="_resetStrategyAction"
      />
    </transition>
    <transition name="fade3">
      <confirm-popup
        v-model="strategyAction.accept"
        width="600px"
        :title="'acceptStrategyTitle' | localize"
        :loading="strategyAction.loading"
        @onClose="_resetStrategyAction"
      >
        <template #text>
          <p
            v-if="isNotPayed"
          >
            <!-- TODO: translate  сделан Автоперевод-->
            <span
              style="line-height: 150%;"
              v-html="_getFreeAccountText()"
            /> {{ price }}
          </p>
          {{ 'acceptStrategyText' | localize }}
        </template>
        <template #footer>
          <Rl-button
            color="gray"
            @click="_resetStrategyAction"
          >
            {{ 'cancelText' | localize }}
          </Rl-button>
          <Rl-button
            v-if="isNotPayed"
            @click="buyPremium"
          >
            {{ 'buyText' | localize }}
          </Rl-button>
          <Rl-button
            @click="_acceptStrategy"
          >
            {{ 'acceptText' | localize }}
          </Rl-button>
        </template>
      </confirm-popup>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import AvatarCropper from 'vue-avatar-cropper'

// import Payment from '@/components/Payment/index'

export default {
  components: {
    // AvatarCropper,
    // Payment
  },
  data () {
    return {
      tabs: ['#purchases', '#referral', '#strategy'],
      newLogin: this.$auth.user ? this.$auth.user.username : '',
      changingLogin: false,
      loading: false,
      avatarLoading: false,
      paymentsLoading: false,
      affiliatePaymentsLoading: false,
      incomingStrategiesLoading: false,
      strategyAction: {
        item: null,
        loading: false,
        reject: false,
        accept: false
      },
      showPaymentPopup: false,
      avatarTrigger: false,
      paymentWindowRes: true,
      price: null
    }
  },
  computed: {
    ...mapGetters({
      activeTab: 'profile/activeTab',
      purchases: 'profile/purchases',
      referralPayments: 'profile/referralPayments',
      inputStrategies: 'profile/inputStrategies'
    }),
    isNotPayed () {
      return !this.$auth.user.is_subscribe
    }
  },
  mounted () {
    this._checkActiveTab()
    this._getUserPurchases()
    this._getAffiliatePayments()
    this._getIncomingStrategies()
  },
  methods: {
    _checkActiveTab () {
      if (this.$route.hash && this.tabs.includes(this.$route.hash)) {
        this.$store.dispatch('profile/setActiveTab', this.$route.hash.split('#')[1])
      } else {
        this.$router.push({
          path: 'profile',
          hash: 'purchases'
        })
      }
    },
    _saveLogin () {
      if (this.newLogin === '') {
        this.$message.error('Type login')
      } else {
        this.loading = true
        const data = {
          username: this.newLogin
        }
        this.$store.dispatch('profile/updateUserInfo', data).then(() => {
          this.$message.success('Login was successfully changed')
          this.changingLogin = false
          this.$auth.fetchUser()
        }).finally(() => { this.loading = false })
      }
    },
    _cancelChangingLogin () {
      this.newLogin = this.$auth.user.username
      this.changingLogin = false
    },
    _onReferralCopy () {
      this.$message.success(this.$options.filters.localize('referralUrlCopied'))
    },
    _uploadAvatar (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('file', blob, 'avatar.png')
        this.avatarLoading = true
        this.$store.dispatch('profile/updateUserAvatar', formData).then(() => {
          this.$auth.fetchUser()
        }).finally(() => { this.avatarLoading = false })
      })
    },
    _getUserPurchases () {
      const params = {
        page: this.purchases.page,
        per_page: this.purchases.perPage
      }
      this.paymentsLoading = true
      this.$store.dispatch('profile/getUserPurchases', params)
        .finally(() => { this.paymentsLoading = false })
    },
    _paymentsPageChangeHandler (page) {
      this.$store.dispatch('profile/changePurchasesPage', page)
      this._getUserPurchases()
    },

    _getAffiliatePayments () {
      const params = {
        page: this.referralPayments.page,
        per_page: this.referralPayments.perPage
      }
      this.affiliatePaymentsLoading = true
      this.$store.dispatch('profile/getReferralPayments', params)
        .finally(() => { this.affiliatePaymentsLoading = false })
    },
    _affiliatePaymentsPageChangeHandler (page) {
      this.$store.dispatch('profile/changeReferralsPage', page)
      this._getAffiliatePayments()
    },
    _getIncomingStrategies () {
      const params = {
        page: this.inputStrategies.page,
        per_page: this.inputStrategies.perPage
      }
      this.incomingStrategiesLoading = true
      this.$store.dispatch('profile/getInputStrategies', params)
        .finally(() => { this.incomingStrategiesLoading = false })
    },
    _incomingStrategiesPageChangeHandler (page) {
      this.$store.dispatch('profile/changeStrategiesPage', page)
      this._getIncomingStrategies()
    },

    _acceptStrategyClickHandler (row) {
      this._getPrice()
      this._resetStrategyAction()
      this.strategyAction.item = row
      this.strategyAction.accept = true
    },
    _rejectStrategyClickHandler (row) {
      this._resetStrategyAction()
      this.strategyAction.item = row
      this.strategyAction.reject = true
    },
    _resetStrategyAction () {
      this.strategyAction.item = null
      this.strategyAction.loading = false
      this.strategyAction.reject = false
      this.strategyAction.accept = false
    },

    _rejectStrategy () {
      this.strategyAction.loading = true
      this.$store.dispatch('profile/rejectStrategy', this.strategyAction.item.transaction_id).then(() => {
        this._resetStrategyAction()
        this._getIncomingStrategies()
      }).finally(() => {
        this.strategyAction.loading = false
      })
    },
    buyPremium () {
      this.strategyAction.loading = true
      this.$store.dispatch('user/changePaymentPopupState', true)
      this.strategyAction.loading = false
    },
    _acceptStrategy () {
      this.strategyAction.loading = true
      this.$store.dispatch('profile/acceptStrategy', this.strategyAction.item.transaction_id).then(() => {
        this._resetStrategyAction()
        this._getIncomingStrategies()
      }).finally(() => {
        this.strategyAction.loading = false
      })
    },
    _payForAccount () {
      this._resetStrategyAction()
      this.showPaymentPopup = true
    },

    _getTime (time) {
      const date = new Date(time)
      return (
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' +
        this._addLeadingZero(date.getHours()) + ':' + this._addLeadingZero(date.getMinutes())
      )
    },
    _addLeadingZero (time) {
      if (time < 10) {
        return '0' + time
      } else {
        return time
      }
    },
    _changeActiveTab (newTab) {
      if (newTab !== this.activeTab) {
        this.$router.push({
          path: 'profile',
          hash: newTab
        })
        this.$store.dispatch('profile/setActiveTab', newTab)
      }
    },
    _getFreeAccountText () {
      return this.$options.filters.localize('freeAccountText')
    },
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
@import '~/assets/_variables.scss';

.profile {
  padding: 50px;

  &__user {}

  &__tabs {
    margin-top: 50px;
    display: flex;
  }

  &__tab {
    display: flex;
    font-size: 20px;
    color: $main-gray;
    align-items: center;
    justify-content: center;
    border: 2px solid $main-gray;
    border-right: none;
    padding: 20px 50px;
    cursor: pointer;
    transition: all .1s ease;

    &:hover {
      background: $form-background;
    }

    &:last-child {
      border-right: 2px solid $main-gray;
    }

    &--active {
      border-bottom-color: $main-green;
    }
  }

  &__main {
    position: relative;
    display: inline-block;
    margin-top: 30px;
  }

  &__pagination {
    width: 100%;
    margin-top: 20px;
    text-align: center;

    .c-sliding-pagination__list-element {
      background: $form-background;
    }
  }
}

.profile-user {
  display: flex;
  align-items: flex-start;

  &__avatar {
    width: 200px;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    border-radius: 200px;
  }

  &__avatar-img {
    width: 200px;
    height: 200px;
    border-radius: 200px;
  }

  &__change-avatar-btn {
    color: $main-green;
    transition: color .1s ease;
    text-align: center;
    margin-top: 10px;

    &:hover {
      color: $main-green-hover;
    }
  }

  &__info {
    flex-grow: 1;
    margin-left: 50px;
  }

  &__row {
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__text {
    color: $main-gray;
    display: flex;
    align-items: center;
  }

  &__text-value {
    margin-left: 10px;
  }

  &__controls {
    display: flex;
    align-items: center;
  }

  &__btn {
    margin-left: 15px;
    color: $main-green;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: $main-green-hover;
      text-decoration: none;
    }

    &--gray {
      color: $main-gray;

      &:hover {
        color: $main-gray-hover;
        text-decoration: none;
      }
    }

    &--red {
      color: $main-red;

      &:hover {
        color: $main-red-hover;
        text-decoration: none;
      }
    }

    & + .profile-user__btn {
      margin-left: 15px;
    }
  }

  &__change-avatar-btn {
    cursor: pointer;
    font-size: 20px;
  }
}

.profile-table {
  background: $form-background;
  border: 2px solid $main-gray;
  padding: 0;
  margin: 0;
  color: #999;
  min-width: 100%;

  &__empty {
    color: #999;
    font-size: 20px;
    font-weight: 400;
    padding-left: 270px;
  }

  &__col {
    padding: 12px 30px;
    margin: 0;
    border-right: 2px solid $main-gray;
    border-bottom: 2px solid $main-gray;

    &:last-child {
      border-right: none;
    }
  }

  &__row {
    &:last-child {
      .profile-table__col {
        border-bottom: none;
      }
    }
  }

  &__btn {
    color: $main-green;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: $main-green-hover;
      text-decoration: none;
    }

    &--red {
      color: $main-red;

      &:hover {
        color: $main-red-hover;
        text-decoration: none;
      }
    }
  }
}
@media (min-width: 670px) and (max-width: 900px) {
  .profile-user__info {
    margin-left: 30px;
  }
  .profile__tab {
    padding: 20px 30px;
  }
}
@media (min-width: 540px) and (max-width: 670px) {
  .profile {
    display: flex;
    justify-content: center;
    padding: 20px;
    &__main {
      margin-top: 30px;
      display: flex;
      width: 100%;
      justify-content: center;
    }
    &__user {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__tab {
      padding: 20px 30px;
    }
  }
  .profile-user {
    &__info {
      margin: 0 10px;
    }
  }
  .profile-table__empty {
    padding-left: 0;
  }
}
@media (min-width: 440px) and (max-width: 540px) {
  .profile {
    display: flex;
    justify-content: center;
    padding: 20px;
    &__main {
      margin-top: 30px;
      display: flex;
      width: 100%;
      justify-content: center;
    }
    &__user {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__tab {
      padding: 10px 15px;
    }
  }
  .profile-user {
    &__info {
      margin: 0 10px;
    }
  }
  .profile-table__empty {
    padding-left: 0;
  }
}
@media (max-width: 440px) {
  .profile {
    display: flex;
    justify-content: center;
    padding: 20px;
    &__main {
      margin-top: 30px;
      display: flex;
      width: 100%;
      justify-content: center;
    }
    &__user {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__tabs {
      flex-wrap: wrap;
      justify-content: center;
    }
    &__tab {
      padding: 10px 15px;
      width: 80%;
      border-right: 2px solid #646464;
    }
  }
  .profile-user {
    &__info {
      margin: 0 10px;
      flex-wrap: wrap;
    }
    &__row {
      margin: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }
    &__text {
      flex-wrap: wrap;
      justify-content: center;
      &-label {
        width: 90%;
        text-align: center;
      }
      &-value {
        margin-left: 0;
      }
    }
  }
  .profile-table__empty {
    padding-left: 0;
  }
}
</style>
