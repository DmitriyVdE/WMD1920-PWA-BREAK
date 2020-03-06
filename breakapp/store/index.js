// const cookieparser = process.server ? require('cookieparser') : undefined
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

  getUserId({ commit, dispatch }) {
    dispatch('authCookieIsSet').then((cookieIsSet) => {
      if (cookieIsSet) {
        dispatch('setAuthFromCookie').then(() => {
          console.log('state: ' + state)

          return state.auth.user.id
        })
      } else {
        return dispatch('createAnonymousUser', commit)
      }
    })
  },

  setAuthFromCookie({ commit }) {
    const authCookie = JSON.parse(Cookies.get('auth'))
    commit('setAuth', authCookie.user.id)
  },

  authCookieIsSet() {
    return Cookies.get('auth') !== undefined
  },

  async createAnonymousUser({ commit }) {
    await this.$axios
      .$post('/api/users')
      .then((response) => {
        return commit('setAuth', response._id)
      })
      .catch((error) => {
        return error
      })
  }
}
