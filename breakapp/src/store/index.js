export const state = () => ({
  auth: {
    user: {
      id: null
    }
  }
})

export const mutations = {
  setAuth(state, data) {
    state.auth.user.id = data
    this.$cookies.set('auth', state.auth, {
      path: '/',
      maxAge: 60 * 60 * 4
    })
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    await dispatch('getUserId')
    await dispatch('group/updateGroupsFromCookie')
  },

  async getUserId({ dispatch }) {
    await dispatch('authCookieIsSet').then(async (cookieIsSet) => {
      if (cookieIsSet) {
        dispatch('setAuthFromCookie')
      } else {
        await dispatch('createAnonymousUser')
      }
    })
  },

  setAuthFromCookie({ commit }) {
    const authCookie = this.$cookies.get('auth')
    commit('setAuth', authCookie.user.id)
  },

  authCookieIsSet() {
    return this.$cookies.get('auth') !== undefined
  },

  async createAnonymousUser({ commit }) {
    await this.$axios
      .$post('https://wmd-1920-pwa-break.appspot.com/api/users')
      .then((response) => {
        return commit('setAuth', response.userId)
      })
      .catch((error) => {
        return error
      })
  }
}
