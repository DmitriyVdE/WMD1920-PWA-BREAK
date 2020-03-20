const Cookies = process.client ? require('js-cookie') : undefined

export const state = () => ({
  auth: null
})

export const mutations = {
  setAuth(state, data) {
    state.auth = { user: { id: data } }
    Cookies.set('auth', state.auth)
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      try {
        this.setAuthFromCookie()
      } catch (error) {
        return error
      }
    }
  },

  getUserId({ dispatch }) {
    dispatch('authCookieIsSet').then((cookieIsSet) => {
      if (cookieIsSet) {
        dispatch('setAuthFromCookie')
      } else {
        dispatch('createAnonymousUser')
      }
    })
  },

  setAuthFromCookie({ commit }) {
    const authCookie = JSON.parse(Cookies.get('auth')) // check
    commit('setAuth', authCookie.user.id)
  },

  authCookieIsSet() {
    return Cookies.get('auth') !== undefined
  },

  async createAnonymousUser({ commit }) {
    await this.$axios
      .$post('/api/users')
      .then((response) => {
        return commit('setAuth', response.userId)
      })
      .catch((error) => {
        return error
      })
  }
}
