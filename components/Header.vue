<template>
  <div v-loading="loading">
    <div class="header">
      <div class="header__popup" @click="showPopup">
        <span class="header__popup_span" :class="{'header__popup_span--active' : popupVisible}" />
        <span class="header__popup_span" :class="{'header__popup_span--active' : popupVisible}" />
        <span class="header__popup_span" :class="{'header__popup_span--active' : popupVisible}" />
      </div>
      <div class="header__popup_menu">
        <transition name="slide-fade">
          <ul v-if="popupVisible" class="header__popup_menu-list header__popup_menu-list--active">
            <li @click="showPopup">
              <nuxt-link
                exact
                class="header__popup_menu-list--el"
                active-class="header__menu-item--active"
                to="/"
              >
                {{ 'cashRanges' | localize }}
              </nuxt-link>
            </li>
            <li @click="showPopup">
              <nuxt-link
                exact
                class="header__popup_menu-list--el"
                active-class="header__menu-item--active"
                to="/tournament"
              >
                {{ 'tournamentRanges' | localize }}
              </nuxt-link>
            </li>
            <li @click="showPopup">
              <nuxt-link
                exact
                class="header__popup_menu-list--el"
                active-class="header__menu-item--active"
                to="/store"
              >
                {{ 'rangesStore' | localize }}
              </nuxt-link>
            </li>
            <li class="header__popup_menu-flag header__popup-flag header__popup_menu-list--el">
              <div
                class="header__popup_menu-flag--current-flag"
                @click="showFlags = !showFlags"
              >
                <country-flag
                  :country="lang | filterFlag"
                />
              </div>
              <transition name="fade">
                <div
                  v-if="showFlags"
                  v-click-outside="() => { showFlags = false }"
                  class="header-flag__list"
                >
                  <vue-custom-scrollbar
                    class="scroll-area"
                    :settings="settings"
                  >
                    <div
                      class="header-flag__item"
                      @click="_changeLanguage('ru-RU')"
                    >
                      <div class="header-flag__label">
                        Russian
                      </div> - <country-flag class="header-flag__icon" country="ru" />
                    </div>
                    <div
                      class="header-flag__item"
                      @click="_changeLanguage('en-US')"
                    >
                      <div class="header-flag__label">
                        English
                      </div> - <country-flag class="header-flag__icon" country="gb" />
                    </div>
                    <div
                      class="header-flag__item"
                      @click="_changeLanguage('zh-CN')"
                    >
                      <div class="header-flag__label">
                        Chinese
                      </div> - <country-flag class="header-flag__icon" country="cn" />
                    </div>
                    <div
                      class="header-flag__item"
                      @click="_changeLanguage('es-ES')"
                    >
                      <div class="header-flag__label">
                        Spanish
                      </div> - <country-flag class="header-flag__icon" country="es" />
                    </div>
                  </vue-custom-scrollbar>
                </div>
              </transition>
            </li>
            <li
              class="header__popup_notifications header__popup_menu-list--el"
              @click="_goToProfile"
            >
              <!-- <v-icon :icon="['far', 'bell']" /> -->
              <div
                v-if="count > 0"
                class="header__popup_notifications-count"
              >
                +{{ count }}
              </div>
              <div class="header__notifications_img">
                <img src="../assets/icons/bell.png" width="27px" height="27px">
              </div>
            </li>
            <!-- <div
              class="header__cart"
              @click="_goToCart"
            >
              <div class="header__cart_img">
                <img src="../assets/icons/cart-header.png" width="40px" height="36px">
              </div>
            </div> -->
            <li
              class="header__popup_logout header__popup_menu-list--el"
              @click="_logout"
            >
              <!-- <v-icon
                :icon="['fas', 'sign-out-alt']"
                label="logout"
                scale="2"
              /> -->
              <div class="header__logout_img">
                <img src="../assets/icons/sign-out-alt.png" width="27px" height="24px">
              </div>
            </li>
          </ul>
        </transition>
      </div>
      <nuxt-link style="display: block; height: 100%" to="/">
        <div
          class="header__logo-block"
        >
          <div class="header__logo">
            <img
              class="header__logo_full"
              src="~@/assets/icons/logo.png"
              alt="logo"
              height="100%"
            >
            <img
              class="header__logo_small"
              src="../assets/landing/favicon.png"
              alt="logo"
              height="100%"
            >
          </div>
        </div>
      </nuxt-link>
      <!-- <div class="header__menu_small" @click="showMenu">
        MENU -->
      <div
        class="header__menu_small-list"
      >
        <div
          class="header__menu_small-list--head"
          active-class="header__menu_small--active"
          @click="showElMenu"
        >
          MENU
          <p class="next-page-head">
            <img src="~/assets/icons/sortdown100.png">
          </p>
        </div>
        <div @click="showElMenu">
          <nuxt-link
            v-show="smallMenuElVisible"
            exact
            class="header__menu_small-list--el"
            active-class="header__menu_small-list--active"
            to="/"
          >
            <div>
              {{ 'cashRanges' | localize }}
              <p class="next-page">
                <img class="header__menu_small-list--img" src="~/assets/icons/sort100.png">
              </p>
            </div>
          </nuxt-link>
        </div>
        <div @click="showElMenu">
          <nuxt-link
            v-show="smallMenuElVisible"
            exact
            class="header__menu_small-list--el"
            active-class="header__menu_small-list--active"
            to="/tournament"
          >
            {{ 'tournamentRanges' | localize }}
            <p class="next-page">
              <img class="header__menu_small-list--img" src="~/assets/icons/sort100.png">
            </p>
          </nuxt-link>
        </div>
        <div @click="showElMenu">
          <nuxt-link
            v-show="smallMenuElVisible"
            exact
            class="header__menu_small-list--el"
            active-class="header__menu_small-list--active"
            to="/store"
            @click="showElMenu"
          >
            {{ 'rangesStore' | localize }}
            <p class="next-page">
              <img class="header__menu_small-list--img" src="~/assets/icons/sortdown100.png">
            </p>
          </nuxt-link>
        </div>
      </div>
      <div class="header__menu">
        <nuxt-link
          exact
          class="header__menu-item"
          active-class="header__menu-item--active"
          to="/"
        >
          {{ 'cashRanges' | localize }}
          <p class="next-page">
            <img class="header__menu_small-list--img" src="~/assets/icons/sortdown100.png">
          </p>
        </nuxt-link>
        <nuxt-link
          exact
          class="header__menu-item"
          active-class="header__menu-item--active"
          to="/tournament"
        >
          {{ 'tournamentRanges' | localize }}
          <p class="next-page">
            <img src="~/assets/icons/sort100.png">
          </p>
        </nuxt-link>
        <nuxt-link
          exact
          class="header__menu-item"
          active-class="header__menu-item--active"
          to="/store"
        >
          {{ 'rangesStore' | localize }}
          <p class="next-page">
            <img src="~/assets/icons/sort100.png">
          </p>
        </nuxt-link>
      </div>
      <router-link
        class="header__user"
        active-class="header__user--active"
        to="/profile"
      >
        <div class="header__user-logo">
          <img
            v-if="$auth.user && $auth.user.avatar"
            width="36px"
            height="36px"
            :src="`https://pokerstove.relabs.ru/${$auth.user.avatar}`"
            alt="account"
          >
          <img
            v-else
            width="36px"
            height="36px"
            src="~@/assets/icons/lk_icon.png"
            alt="account"
          >
        </div>
        <div class="header__user-main">
          <div class="header__user-name">
            {{ $auth.user ? $auth.user.username : '-' }}
          </div>
          <div class="header__user-email">
            {{ $auth.user ? $auth.user.email: '-' }}
          </div>
        </div>
      </router-link>
      <div class="header__add">
        <div class="header__menu-item header-flag">
          <div
            class="header-flag__current-flag"
            @click="showFlags = !showFlags"
          >
            <country-flag
              :country="lang | filterFlag"
            />
          </div>
          <transition name="fade">
            <div
              v-if="showFlags"
              v-click-outside="() => { showFlags = false }"
              class="header-flag__list"
            >
              <vue-custom-scrollbar
                class="scroll-area"
                :settings="settings"
              >
                <div
                  class="header-flag__item"
                  @click="_changeLanguage('ru-RU')"
                >
                  <div class="header-flag__label">
                    Russian
                  </div> - <country-flag class="header-flag__icon" country="ru" />
                </div>
                <div
                  class="header-flag__item"
                  @click="_changeLanguage('en-US')"
                >
                  <div class="header-flag__label">
                    English
                  </div> - <country-flag class="header-flag__icon" country="gb" />
                </div>
                <div
                  class="header-flag__item"
                  @click="_changeLanguage('zh-CN')"
                >
                  <div class="header-flag__label">
                    Chinese
                  </div> - <country-flag class="header-flag__icon" country="cn" />
                </div>
                <div
                  class="header-flag__item"
                  @click="_changeLanguage('es-ES')"
                >
                  <div class="header-flag__label">
                    Spanish
                  </div> - <country-flag class="header-flag__icon" country="es" />
                </div>
              </vue-custom-scrollbar>
            </div>
          </transition>
        </div>
        <div
          class="header__notifications"
          @click="_goToProfile"
        >
          <!-- <v-icon :icon="['far', 'bell']" /> -->
          <div
            v-if="count > 0"
            class="header__notifications-count"
          >
            +{{ count }}
          </div>
          <div class="header__notifications_img">
            <img src="~/assets/icons/bell.png" width="27px" height="27px">
          </div>
        </div>
        <!-- <div
          class="header__cart"
          @click="_goToCart"
        >
          <div class="header__cart_img">
            <img src="../assets/icons/cart-header.png" width="40px" height="36px">
          </div>
        </div> -->
        <div
          class="header__logout"
          @click="_logout"
        >
          <!-- <v-icon
            :icon="['fas', 'sign-out-alt']"
            label="logout"
            scale="2"
          /> -->
          <div class="header__logout_img">
            <img src="~/assets/icons/sign-out-alt.png" width="27px" height="24px">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'

export default {
  components: {
    CountryFlag,
    vueCustomScrollbar
  },
  filters: {
    filterFlag (locale) {
      const flags = {
        'ru-RU': 'ru',
        'en-US': 'gb',
        'zh-CN': 'cn',
        'es-ES': 'es'
      }
      return flags[locale] || 'gb'
    }
  },
  data () {
    return {
      width: null,
      smallMenuVisible: false,
      smallMenuElVisible: false,
      popupVisible: false,
      loading: false,
      timerId: null,
      showFlags: false,
      settings: {
        maxScrollbarLength: 60,
        wheelPropagation: false
      }
    }
  },
  computed: {
    lang () {
      return this.$auth.user ? this.$auth.user.language : 'en-US'
    },
    count () {
      return this.$store.getters['user/incomingStrategiesCount']
    }
  },
  mounted () {
    this.$store.dispatch('user/getIncomingStrategiesCount')
    this._getIncomingStrategiesCount()
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  },
  methods: {
    showMenu () {
      this.smallMenuVisible = !this.smallMenuVisible
    },
    showElMenu () {
      this.smallMenuElVisible = !this.smallMenuElVisible
    },
    showPopup () {
      this.popupVisible = !this.popupVisible
    },
    _getIncomingStrategiesCount () {
      this.timerId = setInterval(() => {
        this.$store.dispatch('user/getIncomingStrategiesCount')
      }, 10000)
    },
    _logout () {
      this.$auth.logout()
    },
    _goToProfile () {
      if (this.$route.path !== '/profile') {
        this.$router.push({
          path: '/profile',
          hash: 'strategy'
        })
      } else if (this.$route.hash !== '#strategy') {
        this.$router.push({
          path: 'profile',
          hash: 'strategy'
        })
        this.$store.dispatch('profile/setActiveTab', 'strategy')
      }
    },
    _changeLanguage (lang) {
      this.loading = true
      const data = {
        language: lang
      }
      this.$store.dispatch('user/changeLanguage', data).then(() => {
        this.showFlags = false
        this.$auth.fetchUser()
      }).finally(() => { this.loading = false })
    }
  }

}
</script>

<style lang="scss">
@import '~/assets/_variables.scss';

.next-page {
  display: none;
}
.scroll-area {
  max-height: 200px;
  position: relative;
}
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
.header__popup {
  display: none;
  position: absolute;
  left: 50px;
  &_span {
    display: block;
    width: 40px;
    height: 4px;
    background-color: #fff;
    margin: 8px 0;
    &--active {
      &:nth-child(1) {
        margin: -4px 0;
        transform: rotate(-45deg);
      }
      &:nth-child(2) {
        display: none;
      }
      &:nth-child(3) {
        margin: -5px 0;
        transform: rotate(45deg);
      }
    }
  }
  &_menu {
    &-list {
      position: absolute;
      list-style-type: none;
      width: 100%;
      max-width: 300px;
      left: -100%;
      top: 100%;
      margin: 0;
      padding: 0;
      &--active {
        left: 0;
      }
      &--el {
        display: flex;
        justify-content: center;
        height: 62.5px;
        padding: 7px 15px;
        color: #999999;
        cursor: pointer;
        transition: all 0.2s ease;
        align-items: center;
        line-height: 140%;
        text-align: center;
        text-decoration: none;
        border: 2px solid $border-color;
        background-color: #161616;
      }
    }
    &-flag {
      display: flex;
    }
  }
  &_notifications {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    color: #999;
    border-right: 2px solid $border-color;
    position: relative;
    &_img {
      text-align: center;
    }
    &-count {
      position: absolute;
      top: 20px;
      right: 120px;
      width: 22px;
      height: 22px;
      border-radius: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      background: $main-green;
      color: #fff;
      line-height: 100%;
      padding: 8px;

    }
  }
}
.header {
  height: 79px;
  max-width: 100%;
  display: flex;
  border-bottom: 2px solid $border-color;
  align-items: center;
  position: relative;
  z-index: 2;
  background: $background-color;

  &__logo {
    padding: 5px 0;
    height: 100%;
    &_small {
      display: none;
    }
  }

  &__logo-block {
    border-right: 2px solid $border-color;
    width: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 100%;
    cursor: pointer;
  }

  &__menu {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 20px;
  }
  &__menu_small {
    display: none;
    height: 100%;
    align-items: center;
    border-right: 2px solid $border-color;
    &-list {
      display: none;
      flex-direction: column;
      position: absolute;
      list-style-type: none;
      left: 280px;
      top: 0;
      height: 100%;
      margin: 0;
      padding: 0;
      &--el {
        display: flex;
        flex-direction: column;
        max-width: 150px;
        padding: 7px 30px;
        color: #999999;
        cursor: pointer;
        transition: all 0.2s ease;
        align-items: center;
        line-height: 150%;
        text-align: center;
        text-decoration: none;
        border: 2px solid $border-color;
        background-color: #161616;
      }
      &--active {
        text-align: center;
        line-height: 150%;
        color: #fff;
        background: $form-background;
        position: relative;
        transition: all 0.2s ease;
      }
    }
  }

  &__menu-item {
    padding: 0 40px;
    height: 100%;
    color: #999999;
    border-right: 2px solid $border-color;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    font-size: 18px;
    line-height: 120%;
    text-align: center;
    text-decoration: none;

    &:hover {
      background: $form-background;
    }

    &--active {
      text-align: center;
      color: #fff;
      background: $form-background;
      position: relative;
      transition: all 0.2s ease;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: -2px;
        z-index: 1;
        width: 100%;
        height: 8px;
        background: $main-green;
      }
    }
  }

  &__user {
    padding: 25px 40px;
    display: flex;
    align-items: center;
    border-right: 2px solid $border-color;
    width: 250px;
    height: 100%;
    flex-grow: 1;
    transition: all 0.2s ease;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: $form-background;
    }
    &--active {
      text-align: center;
      color: #fff;
      background: $form-background;
      position: relative;
      transition: all 0.2s ease;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: -2px;
        z-index: 1;
        width: 100%;
        height: 8px;
        background: $main-green;
      }
    }
  }

  &__user-logo {
    width: 36px;
    height: 36px;
    border-radius: 36px;
    overflow: hidden;
  }

  &__user-main {
    margin-left: 10px;
  }

  &__user-name {
    text-align: left;
    color: #fff;
    font-size: 20px;
  }

  &__user-email {
    font-size: 16px;
    color: $main-green;
    margin-top: 3px;
  }
  &__add {
    display: flex;
    height: 100%;
    align-items: center;
    &_img {
      justify-content: center;
    }
  }

  &__notifications {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 110px;
    color: #999;
    border-right: 2px solid $border-color;
    position: relative;
    &_img {
      text-align: center;
    }

    &:hover {
      background-color: $form-background;
    }
  }

  &__notifications-count {
    position: absolute;
    top: 42px;
    right: 30px;
    width: 22px;
    height: 22px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    background: $main-green;
    color: #fff;
    line-height: 100%;
    padding: 8px;
  }

  &__logout {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    border-right: 2px solid $border-color;
    width: 110px;
    color: #999;
    &_img {
      text-align: center;
    }
    &:hover {
      background-color: $form-background;
    }
  }
}

.header-flag {
  position: relative;
  width: 110px;
  padding: 0;

  &:hover {
    background: none !important;
  }

  &__current-flag {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    align-items: baseline;
  }

  &__list {
    position: absolute;
    top: 77px;
    left: 0;
    width: 150px;
    border: 2px solid $border-color;
    background: $background-color;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;

    &:hover {
      background: $form-background;
    }
  }
}
@media (min-width: 990px) and (max-width: 1390px){
  .header {
    width: 100%;
    &__menu {
      display: none;
      &-item {
        display: none;
        &--active {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 150px;
          p {
            display: flex;
            margin: 0 auto;
            transform: rotate(90deg);
          img {
            width: 25px;
            height: 20px;
          }
          }
        }
      }
    }
  }
  .header__menu_small-list {
    display: block;
    align-items: center;
    height: 100%;
    font-size: 20px;
    position: initial;
    left: 280px;
    top: 0px;
    padding: 0px;
    &--el {
      display: flex;
    }
    &--active {
      text-align: center;
      color: #fff;
      background: $form-background;
      position: relative;
      transition: all 0.2s ease;

      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: -2px;
        z-index: 1;
        width: 100%;
        height: 8px;
        background: $main-green;
      }
    }
  }
  .header__menu_small-list--head {
    display: flex;
    // flex-direction: column;
    justify-content: center;
    padding-top: 10px;
    line-height: 180%;
    width: 150px;
    align-items: center;
    border-right: 2px solid #383838;
    height: 100%;
    p {
      display: flex;
      justify-content: center;
      margin: 0 0 0 10px;
      transform: rotate(90deg);
      img {
        width: 20px;
        height: 15px;
      }
    }
  }
  .header-flag {
    display: flex;
  }
}
@media (min-width: 670px) and (max-width: 990px){
  .header {
    display: flex;
    &__logo-block {
      border-right: none;
      padding-left: 100px;
    }
    &__menu {
      display: none;
    }
    &__user {
      justify-content: flex-end;
      border-right: none;
      padding: 25px 15px;
    }
    &__notifications {
      display: none;
    }
  .header-flag {
    display: none;
  }
  }
  .header__popup {
    display: block;
    left: 5px;
    padding: 30px 20px 30px 20px;
  }
}
@media (min-width: 375px) and (max-width: 670px){
  .header {
    padding: 0;
    display: flex;
    &__logo {
      &_full{
        display: none;
      }
      &_small {
        display: block;
      }
      &-block {
        width: 80px;
        padding-left: 70px;
      }
    }
    &__menu {
      display: none;
    }
    &__logo {
      padding-left: 70px;
      &-block {
        width: 80px;
        border-right: none;
      }
    }
    &__user {
      justify-content: center;
      border-right: none;
      padding: 0;
      margin-left: 60px;
      &-email {
        display: none;
      }
      &-main {
        margin: 20px;
      }
    }
    &__notifications {
      display: none;
    }
    &__logout {
      display: none;
    }
  .header-flag {
    display: none;
  }
  }
  .header__popup {
    display: block;
    position: absolute;
    left: 30px;
    &_span {
      display: block;
      width: 30px;
      height: 3px;
      background-color: #fff;
      margin: 6px 0;
      &--active {
        &:nth-child(1) {
          margin: -3px 0;
          transform: rotate(-45deg);
        }
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          margin: -3px 0;
          transform: rotate(45deg);
        }
      }
    }
  }
}
@media (max-width: 375px){
  .header {
    display: flex;
    &__logo-block {
      border-right: none;
      padding-left: 70px;
    }
    &__logo {
      &_full{
        display: none;
      }
      &_small {
        display: block;
      }
      &-block {
        width: 80px;
        padding-left: 100px;
      }
    }
    &__menu {
      display: none;
    }
    &__user {
      justify-content: center;
      border-right: none;
      padding: 5px 5px;
      margin: 0 0 0 15px;
      &-email {
        display: none;
      }
      &-logo {
        display: none;
      }
    }
    &__notifications {
      display: none;
    }
    &__logout {
      display: none;
    }
  }
  .header-flag {
    display: none;
  }
  .header__popup {
    display: block;
    position: absolute;
    left: 20px;
    &_span {
      display: block;
      width: 30px;
      height: 3px;
      background-color: #fff;
      margin: 6px 0;
      &--active {
        &:nth-child(1) {
          margin: -3px 0;
          transform: rotate(-45deg);
        }
        &:nth-child(2) {
          display: none;
        }
        &:nth-child(3) {
          margin: -3px 0;
          transform: rotate(45deg);
        }
      }
    }
    &_menu {
      &-list {
        max-width: 100%;
      }
    }
  }
}

</style>
