export const state = () => ({
  currentGroup: {
    id: null,
    code: null,
    name: null,
    questions: [],
    users: [],
    owners: []
  }
})

export const mutations = {
  setCurrentGroup(state, data) {
    state.currentGroup = {
      id: data._id,
      code: data.groupCode,
      name: data.groupName,
      questions: data?.questions,
      users: data?.users,
      owners: data?.owners
    }
  },
  setNewQuestion(state, data) {
    state.currentGroup.questions.push(data)
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
  },

  async getGroupInfo({ commit }, groupId) {
    const request = await this.$axios
      .$get(`/api/groups/${groupId}`)
      .then((response) => {
        commit('setCurrentGroup', response)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async createPoll({ commit }, { groupId, question }) {
    console.log(`GroupId: ${groupId}`)
    console.log(`Question: ${question}`)

    const request = await this.$axios
      .$post(`/api/groups/${groupId}/questions`, question)
      .then((response) => {
        commit('setNewQuestion', response)
      })
      .catch((error) => {
        return error
      })

    return request
  }
}
