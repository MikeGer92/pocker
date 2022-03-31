<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__logo">
        <img src="~@/assets/icons/logo.png" alt="logo">
      </div>
      <div class="login__tabs">
        <rl-tabs
          :value="activeTab"
          @changeActiveTab="_changeActiveTab"
        >
          <rl-tab-item name="#register">
            {{ 'registerField' | localize }}
          </rl-tab-item>
          <rl-tab-item name="#login">
            {{ 'authField' | localize }}
          </rl-tab-item>
          <rl-tab-item name="#restore">
            {{ 'restoreField' | localize }}
          </rl-tab-item>
        </rl-tabs>
      </div>
      <div
        v-if="activeTab === '#register'"
        key="register"
        class="login__tabs-container"
      >
        <register />
      </div>
      <div
        v-if="activeTab === '#login'"
        key="login"
        class="login__tabs-container"
      >
        <login />
      </div>
      <div
        v-if="activeTab === '#restore'"
        key="restore"
        class="login__tabs-container"
      >
        <restore />
      </div>
    </div>
  </div>
</template>

<script>
import login from './components/login'
import register from './components/register'
import restore from './components/restore'

export default {
  name: 'Auth',
  components: {
    login,
    register,
    restore
  },
  layout: 'auth',
  auth: 'guest',
  head: {
    title: 'Authorization'
  },
  computed: {
    activeTab () {
      const hashes = ['#login', '#register', '#restore']
      return hashes.includes(this.$route.hash) ? this.$route.hash : '#login'
    }
  },
  mounted () {
    const token = this.$route.params.token
    if (token) {
      this.$router.push({ hash: '#register' })
    }
  },
  methods: {
    _changeActiveTab (newTab) {
      this.$router.push({ hash: newTab })
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;

  &__wrapper {
    margin-top: 97px;
    width: 390px;
    text-align: center;
  }

  &__tabs {
    margin-top: 69px;
  }

  &__tabs-container {
    margin-top: 40px;
  }
}

.fade-login-enter-active, .fade-login-leave-active {
  transition: opacity .2s;
}
.fade-login-enter, .fade-login-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
