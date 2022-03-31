export const state = () => ({})

export const mutations = {}

export const actions = {
  getList ({ commit }, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/shop', { params }).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  getItem ({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/shop/product/${id}`).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export const getters = {}
