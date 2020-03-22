export const state = () => ({
  groups: [],
  currentGroup: {
    id: null,
    code: null,
    name: null,
    questions: [],
    userCount: 0,
    isOwner: false
  }
})

export const getters = {
  getGroupsFromCookie(state) {
    return this.$cookies.get('groups')
  }
}

export const mutations = {
  setCurrentGroup(state, data) {
    state.currentGroup = {
      id: data?._id,
      code: data?.groupCode,
      name: data?.groupName,
      questions: data?.questions,
      userCount: data?.userCount,
      isOwner: data?.isOwner
    }

    state.groups.push(state.currentGroup)

    this.$cookies.set('groups', state.groups, {
      path: '/',
      maxAge: 60 * 60 * 4
    })
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
        commit('setCurrentGroup', { ...response, isOwner: true })
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
