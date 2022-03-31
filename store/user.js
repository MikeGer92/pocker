export const state = () => ({
  language: 'en-US',
  incomingStrategiesCount: 0,
  showPaymentPopup: false
})

export const mutations = {
  CHANGE_PAYMENT_POPUP_STATE (state, popupState) {
    state.showPaymentPopup = popupState
  },
  SET_INCOMING_STRATEGIES_COUNT (state, count) {
    state.incomingStrategiesCount = count
  },
  SET_LANGUAGE (state, language) {
    state.language = language
  }
}

export const actions = {
  register (_, { data, token }) {
    let url = '/api/v1/auth/register'
    if (token) {
      url += '/' + token
    }
    return new Promise((resolve, reject) => {
      this.$axios.post(url, data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  restore (_, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/recover', data).then((response) => {
        resolve(response.data)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  confirm (_, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/auth/confirm', data).then((response) => {
        resolve(response.data)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  changePaymentPopupState ({ commit }, state) {
    commit('CHANGE_PAYMENT_POPUP_STATE', state)
  },
  getIncomingStrategiesCount ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/categories/incoming/count').then((response) => {
        commit('SET_INCOMING_STRATEGIES_COUNT', response.data.data)
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  findUsers ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/users/find_users', { params }).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  changeLanguage ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/users/language', data).then((response) => {
        commit('SET_LANGUAGE', response.data.data.language)
        window.location.reload()
        resolve(response.data.language)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  changeLocalLanguage ({ commit }, lang) {
    return new Promise((resolve) => {
      commit('SET_LANGUAGE', lang)
      resolve()
    })
  }
}

export const getters = {
  incomingStrategiesCount: state => state.incomingStrategiesCount,
  language: state => state.language,
  showPaymentPopup: state => state.showPaymentPopup
}
