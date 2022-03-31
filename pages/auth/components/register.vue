<template>
  <el-form
    ref="registerForm"
    :model="registerForm"
    :rules="registerRules"
    class="login__reg-form"
  >
    <el-form-item prop="username">
      <el-input
        v-model="registerForm.username"
        :placeholder="'loginField' | localize"
        :disabled="loading || showCode"
      />
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="registerForm.email"
        :placeholder="'emailField' | localize"
        :disabled="loading || showCode"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="registerForm.password"
        :placeholder="'passwordField' | localize"
        type="password"
        :disabled="loading || showCode"
      />
    </el-form-item>
    <transition name="slide-top">
      <el-form-item v-if="showCode">
        <el-input
          v-model.trim="registerForm.code"
          :placeholder="'Enter the code' | localize"
          maxlength="6"
          prefix-icon="el-icon-mobile-phone"
        />
      </el-form-item>
    </transition>
    <el-form-item>
      <div class="login__submit">
        <el-button
          v-if="showCode"
          type="primary"
          :disabled="registerForm.code.length !== 6"
          :loading="loading"
          style="min-width: 200px; color: #fff;"
          round
          @click="onConfirm"
        >
          Confirm
        </el-button>
        <el-button
          v-else
          :loading="loading"
          type="primary"
          round
          style="min-width: 200px; color: #fff;"
          @click="onSubmit"
        >
          {{ 'registerField' | localize }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      token: this.$route.params.token,
      language: this.$store.getters['user/language'],
      registerForm: {
        username: '',
        email: '',
        password: '',
        code: ''
      },
      registerRules: {
        username: [{ required: true, message: this.$options.filters.localize('Username is required'), trigger: 'blur' }],
        email: [
          { required: true, message: this.$options.filters.localize('Email is required'), trigger: 'blur' },
          { type: 'email', message: this.$options.filters.localize('Incorrect email'), trigger: 'blur' }
        ],
        password: [{ required: true, message: this.$options.filters.localize('Password is required'), trigger: 'blur' }]
      },
      loading: false,
      showCode: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.onRegister()
        }
      })
    },
    onConfirm () {
      this.loading = true
      const data = {
        email: this.registerForm.email,
        code: this.registerForm.code
      }
      this.$store.dispatch('user/confirm', data).then((response) => {
        this.$auth.setUser(response.data.me)
        this.$auth.setUserToken(response.data.token)
        this.$message.success.localize('Successful registration')
      }).finally(() => {
        this.loading = false
      })
    },
    onRegister () {
      this.loading = true
      const data = Object.assign({}, this.registerForm, { language: this.language })
      this.$store.dispatch('user/register', { data, token: this.token }).then(() => {
        this.showCode = true
        this.$message.info.localize('Code was sent on your email')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
