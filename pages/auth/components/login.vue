<template>
  <el-form
    ref="form"
    :model="loginForm"
    :rules="loginRules"
    class="login__auth-form"
  >
    <el-form-item prop="email">
      <el-input
        v-model="loginForm.email"
        :placeholder="'emailField' | localize"
        :disabled="loading"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        :placeholder="'passwordField' | localize"
        type="password"
        :disabled="loading"
        @keyup.enter="onSubmit"
      />
    </el-form-item>
    <div class="login__submit">
      <el-button
        type="primary"
        round
        style="min-width: 200px; color: #fff;"
        :loading="loading"
        @click="onSubmit"
      >
        {{ 'authField' | localize }}
      </el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, message: this.$options.filters.localize('Email is required'), trigger: 'blur' },
          { type: 'email', message: this.$options.filters.localize('Incorrect email'), trigger: 'blur' }
        ],
        password: [{ required: true, message: this.$options.filters.localize('Password is required'), trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    async login () {
      this.loading = true
      const data = Object.assign({}, this.loginForm)
      try {
        await this.$auth.loginWith('customStrategy', { data })
      } catch (e) {
      }
      this.loading = false
    }
  }
}
</script>
