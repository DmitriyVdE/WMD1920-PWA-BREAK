export const state = () => ({
  currentGroup: null
})

export const mutations = {
  setCurrentGroup(state, data) {
    state.currentGroup = { code: data.groupCode, name: data.groupName }
  }
}

export const actions = {
  async createGroup({ commit }, group) {
    const request = await this.$axios
      .$post('/api/groups', group)
      .then((response) => {
        commit('setCurrentGroup', response)
      })
      .catch((error) => {
        return error
      })

    return request
  }
}
