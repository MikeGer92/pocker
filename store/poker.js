function getAllCards () {
  const cards = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
  const suites = ['h', 'c', 'd', 's']

  return cards.reduce((sum, current) => {
    for (let i = 0; i < suites.length; i++) {
      sum.push(current + suites[i])
    }
    return sum
  }, [])
}

export const state = () => ({
  selectedBoardCards: [],
  selectedHoleCards: [],
  display: 2,
  allCards: getAllCards(),
  weight: '100',
  statistics: [],
  totals: null,
  hand: null,
  matrix: null,
  heat: [],
  calcLoading: false,
  rangeLoading: false,
  defaultColor: '#1847BE',
  currentColor: null,
  categoryId: null,
  rootType: 'preflop_root'
})

export const mutations = {
  SET_ROOT_TYPE (state, type) {
    state.rootType = type
  },
  CHANGE_BOARD_CARD_STATE (state, card) {
    const index = state.selectedBoardCards.indexOf(card)
    if (index !== -1) {
      state.selectedBoardCards.splice(index, 1)
    } else {
      if (state.selectedBoardCards.length > 4) {
        state.selectedBoardCards.shift()
      }
      state.selectedBoardCards.push(card)
    }
  },
  CHANGE_HOLE_CARD_STATE (state, card) {
    const index = state.selectedHoleCards.indexOf(card)
    if (index !== -1) {
      state.selectedHoleCards.splice(index, 1)
    } else {
      if (state.selectedHoleCards.length > 1) {
        state.selectedHoleCards.shift()
      }
      state.selectedHoleCards.push(card)
    }
  },
  ADD_PAIR (state, pair) {
    if (state.display === 1) {
      if (pair.colors.length > 0) {
        pair.colors = []
      } else {
        pair.colors.push({
          color: state.defaultColor,
          weight: 100
        })
      }
    } else {
      const index = pair.colors.indexOf(pair.colors.filter(item => item.color === state.currentColor || item.color === state.defaultColor)[0])
      const checkIsFit = () => {
        const sum = pair.colors.reduce((acc, current) => {
          return acc + current.weight
        }, 0)

        return sum + Number(state.weight) <= 100
      }

      const pushColor = () => {
        if (checkIsFit()) {
          pair.colors.unshift({
            color: state.currentColor || state.defaultColor,
            weight: Number(state.weight)
          })
        } else {
          pair.colors.pop()
          pushColor()
        }
      }

      if (index !== -1) {
        if (pair.colors[index].weight !== Number(state.weight)) {
          pair.colors.splice(index, 1)
          pushColor()
        } else {
          pair.colors.splice(index, 1)
        }
      } else {
        pushColor()
      }
    }
  },
  CLEAR_BOARD_CARDS (state) {
    state.selectedBoardCards = []
  },
  CLEAR_HOLE_CARDS (state) {
    state.selectedHoleCards = []
  },
  CHANGE_WEIGHT (state, weight) {
    state.weight = weight
  },
  SET_LOADING_STATE (state, loadingState) {
    state.calcLoading = loadingState
  },
  CALCULATE_EQUITY (state, matrix) {
  },
  CHANGE_DISPLAY (state, display) {
    state.display = display
  },
  CHANGE_CURRENT_COLOR (state, color) {
    if (state.currentColor === color) {
      state.currentColor = null
    } else {
      state.currentColor = color
    }
  },
  SET_CATEGORY_ID (state, categoryId) {
    state.categoryId = categoryId
  },
  CLEAR_STATS (state) {
    state.statistics = []
    state.totals = null
    state.hand = null
    state.matrix = null
    state.heat = []
  },
  SET_EQUITY_DATA (state, data) {
    state.statistics = data.statistics
    state.heat = data.heat
    state.totals = data.totals
    state.hand = data.hand
    state.matrix = data.matrix
  }
}

export const actions = {
  changeBoardCardState ({ commit }, card) {
    commit('CHANGE_BOARD_CARD_STATE', card)
  },
  changeHoleCardState ({ commit }, card) {
    commit('CHANGE_HOLE_CARD_STATE', card)
  },
  getRangePairs ({ commit }, range) {
    return new Promise((resolve, reject) => {
      const params = {
        begin: range[0],
        end: range[1]
      }
      this.$axios.get('/api/v1/categories/range', { params }).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  clearBoardCards ({ commit }) {
    commit('CLEAR_BOARD_CARDS')
  },
  clearHoleCards ({ commit }) {
    commit('CLEAR_HOLE_CARDS')
  },
  changeWeight ({ commit }, weight) {
    commit('CHANGE_WEIGHT', weight)
  },
  setEquityLoadingState ({ commit }, loadingState) {
    commit('SET_LOADING_STATE', loadingState)
  },
  setEquityData ({ commit }, data) {
    commit('SET_EQUITY_DATA', data)
  },
  addPair ({ commit }, pair) {
    commit('ADD_PAIR', pair)
  },
  changeDisplay ({ commit }, display) {
    commit('CHANGE_DISPLAY', display)
  },
  changeCurrentColor ({ commit }, color) {
    commit('CHANGE_CURRENT_COLOR', color)
  },
  getPreflopTree ({ commit }) {
    commit('SET_ROOT_TYPE', 'preflop_root')
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/categories/tree', { params: { root_type: 'preflop_root' } }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getTournamentTree ({ commit }) {
    commit('SET_ROOT_TYPE', 'tournament_root')
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/v1/categories/tree', { params: { root_type: 'tournament_root' } }).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  setCategoryId ({ commit }, categoryId) {
    commit('SET_CATEGORY_ID', categoryId)
  },
  getCategory ({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/v1/categories/${categoryId}`).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  clearStats ({ commit }) {
    commit('CLEAR_STATS')
  },
  createCategory ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/categories', data).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  updateCategory ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/${data.id}`, data).then((response) => {
        resolve(response.data.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  deleteCategory ({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/api/v1/categories/${categoryId}`).then(() => {
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },
  copyCategoryUp ({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/${categoryId}/copy/up`).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  copyCategoryDown ({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/${categoryId}/copy/down`).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  moveCategoryUp ({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/${categoryId}/move/up`).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  moveCategoryDown ({ commit }, categoryId) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/v1/categories/${categoryId}/move/down`).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  shareCategory ({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/v1/categories/share', data).then((response) => {
        resolve(response)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export const getters = {
  board_cards: state => state.selectedBoardCards,
  hole_cards: state => state.selectedHoleCards,
  all_cards: state => state.allCards,
  weight: state => state.weight,
  statistics: state => state.statistics,
  heat: state => state.heat,
  totals: state => state.totals,
  hand: state => state.hand,
  matrix: state => state.matrix,
  calcLoading: state => state.calcLoading,
  rangeLoading: state => state.rangeLoading,
  display: state => state.display,
  currentColor: state => state.currentColor,
  defaultColor: state => state.defaultColor,
  categoryId: state => state.categoryId,
  rootType: state => state.rootType
}
