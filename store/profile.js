
export const state = () => ({
  activeTab: 'purchases',
  purchases: {
    perPage: 10,
    total: 1,
    page: 1,
    list: []
  },
  referralPayments: {
    perPage: 10,
    total: 1,
    page: 1,
    list: []
  },
  inputStrategies: {
    perPage: 10,
    total: 1,
    page: 1,
    list: []
  }
})

export const mutations = {
  SET_ACTIVE_TAB (state, newTab) {
    state.activeTab = newTab
  },
  SET_PURCHASES_TOTAL (state, total) {
    state.purchases.total = total
  },
  SET_PURCHASES_LIST (state, list) {
    state.purchases.list = list
  },
  SET_PURCHASES_PAGE (state, page) {
    state.purchases.page = page
  },
  SET_REFERRAL_PAYMENTS_TOTAL (state, total) {
    state.referralPayments.total = total
  },
  SET_REFERRAL_PAYMENTS_LIST (state, list) {
    state.referralPayments.list = list
  },
  SET_REFERRAL_PAYMENTS_PAGE (state, page) {
    state.referralPayments.page = page
  },
  SET_INPUT_STRATEGIES_TOTAL (state, total) {
    state.inputStrategies.total = total
  },
  SET_INPUT_STRATEGIES_LIST (state, list) {
    state.inputStrategies.list = list
  },
  SET_INPUT_STRATEGIES_PAGE (state, page) {
    state.inputStrategies.page = page
  },
  SET_INPUT_STRATEGIES_PER_PAGE (state, perPage) {
    state.inputStrategies.per_page = perPage
  }
}

export const actions = {
  setActiveTab ({ commit }, newTab) {
    commit('SET_ACTIVE_TAB', newTab)
  },
  updateUserInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/users/userprofile/update/username', data).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  updateUserAvatar ({ commit }, formData) {
    return new Promise((resolve, reject) => {
      this.$axios.request({
        url: '/api/v1/users/userprofile/update/avatar',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
      }).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getUserPurchases ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/users/userprofile/purchases', { params }).then((response) => {
        commit('SET_PURCHASES_TOTAL', response.data.data.total)
        commit('SET_PURCHASES_PAGE', response.data.data.page)
        commit('SET_PURCHASES_LIST', response.data.data.list)
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getReferralPayments ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/users/userprofile/affiliate_purchases', { params }).then((response) => {
        commit('SET_REFERRAL_PAYMENTS_TOTAL', response.data.data.total)
        commit('SET_REFERRAL_PAYMENTS_PAGE', response.data.data.page)
        commit('SET_REFERRAL_PAYMENTS_LIST', response.data.data.list)
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getInputStrategies ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/categories/incoming', { params }).then((response) => {
        commit('SET_INPUT_STRATEGIES_TOTAL', response.data.data.total)
        commit('SET_INPUT_STRATEGIES_PAGE', response.data.data.page)
        commit('SET_INPUT_STRATEGIES_LIST', response.data.data.list)
        commit('SET_INPUT_STRATEGIES_PER_PAGE', response.data.data.per_page)
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  acceptStrategy ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/incoming/${id}/accept`).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  rejectStrategy ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/incoming/${id}/reject`).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  changePurchasesPage ({ commit }, page) {
    commit('SET_PURCHASES_PAGE', page)
  },
  changeReferralsPage ({ commit }, page) {
    commit('SET_REFERRAL_PAYMENTS_PAGE', page)
  },
  changeStrategiesPage ({ commit }, page) {
    commit('SET_INPUT_STRATEGIES_PAGE', page)
  }
}

export const getters = {
  activeTab: state => state.activeTab,
  purchases: (state) => {
    return {
      total: state.purchases.total,
      page: state.purchases.page,
      list: state.purchases.list
    }
  },
  referralPayments: (state) => {
    return {
      total: state.referralPayments.total,
      page: state.referralPayments.page,
      list: state.referralPayments.list
    }
  },
  inputStrategies: (state) => {
    return {
      total: state.inputStrategies.total,
      page: state.inputStrategies.page,
      per_page: state.inputStrategies.per_page,
      list: state.inputStrategies.list
    }
  }
}
