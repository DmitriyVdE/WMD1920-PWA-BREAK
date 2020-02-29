// const cookieparser = process.server ? require('cookieparser') : undefined
// const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  auth: null
})

export const mutations = {
  setAuth(state, auth) {
    if (typeof auth !== 'object') auth = JSON.parse(auth)
    state.auth = auth
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    /* let auth = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = parsed.auth
      } catch (err) {
        console.log('Jwt error: ' + err)
      }
    }

    commit('setAuth', auth) */
  }
}
