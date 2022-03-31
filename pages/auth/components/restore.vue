<template>
  <el-form
    ref="restoreForm"
    :model="restoreForm"
    :rules="restoreRules"
    class="login__auth-form"
  >
    <el-form-item prop="email">
      <el-input
        v-model="restoreForm.email"
        :placeholder="'please enter email' | localize"
        :disabled="loading || showCode"
      />
    </el-form-item>
    <el-form-item v-if="showCode">
      <el-input
        v-model.trim="restoreForm.code"
        :placeholder="'enter confirm code' | localize"
        maxlength="6"
        prefix-icon="el-icon-mobile-phone"
      />
    </el-form-item>

    <el-form-item>
      <div class="login__submit">
        <el-button
          v-if="showCode"
          type="primary"
          :disabled="restoreForm.code.length !== 6"
          :loading="loading"
          style="min-width: 200px; color: #fff;"
          round
          @click="onConfirm"
        >
          {{ 'Confirm' | localize }}
        </el-button>
        <el-button
          v-else
          :loading="loading"
          type="primary"
          round
          style="min-width: 200px; color: #fff;"
          @click="onSubmit"
        >
          {{ 'restoreField' | localize }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      restoreForm: {
        email: '',
        code: ''
      },
      restoreRules: {
        email: [
          { required: true, message: this.$options.filters.localize('Email is required'), trigger: 'blur' },
          { type: 'email', message: this.$options.filters.localize('Incorrect email'), trigger: 'blur' }
        ]
      },
      showCode: false,
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.restoreForm.validate((valid) => {
        if (valid) {
          this.onRestore()
        }
      })
    },
    onRestore () {
      this.loading = true
      this.$store.dispatch('user/restore', this.restoreForm).then(() => {
        this.showCode = true
        this.$message.info.localize('Code was sent on your email')
        // this.$message.success(this.$options.filters.localize('passwordSentText'))
      }).finally(() => { this.loading = false })
    },
    onConfirm () {
      this.loading = true
      this.$store.dispatch('user/confirm', this.restoreForm).then((response) => {
        this.$auth.setUser(response.data.me)
        this.$auth.setUserToken(response.data.token)
        this.$message.success.localize('Password was sent on your email')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
