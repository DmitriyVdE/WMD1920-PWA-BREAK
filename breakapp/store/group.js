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
  },
  updateQuestion(state, data) {
    // eslint-disable-next-line no-console
    console.log('Updated Question')
    state.currentGroup.questions.forEach((x) => {
      if (x.questionId === data.questionId) {
        x = data
      }
    })
  },
  setGroups(state, data) {
    state.groups = data
    state.currentGroup = state.groups[0]
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

  async getGroupInfo({ commit }, { groupCode, userId }) {
    const request = await this.$axios
      .$get(`/api/groups/${groupCode}/${userId}`)
      .then((response) => {
        commit('setCurrentGroup', response)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async createPoll({ commit }, question) {
    const request = await this.$axios
      .$post(`/api/groups/${question.groupCode}/questions`, question)
      .then((response) => {
        commit('setNewQuestion', response)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async addVote({ commit }, voteInfo) {
    const request = await this.$axios
      .$post(
        `/api/groups/${voteInfo.groupCode}/questions/${voteInfo.questionId}`,
        voteInfo
      )
      .then((response) => {
        commit('updateQuestion', response)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async delVote({ commit }, voteInfo) {
    // eslint-disable-next-line no-console
    console.log(voteInfo)
    const request = await this.$axios
      .$delete(
        `/api/groups/${voteInfo.groupCode}/questions/${voteInfo.questionId}`,
        voteInfo
      )
      .then((response) => {
        commit('updateQuestion', response)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  updateGroupsFromCookie({ commit }) {
    commit('setGroups', this.$cookies.get('groups'))
  },

  editGroup({ commit }) {},
  clearVotes({ commit }) {},
  kickAllMembers({ commit }) {},
  disbandGroup({ commit }) {}
}
