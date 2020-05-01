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

    // Group already has elements
    if (state.groups?.length) {
      const groupsAlreadyContainsCurrentGroup = state.groups.some(
        (g) => g.code === state.currentGroup.code
      )

      if (!groupsAlreadyContainsCurrentGroup)
        state.groups = [...state.groups, state.currentGroup]
    } else {
      state.groups = [state.currentGroup]
    }

    this.$cookies.set('groups', state.groups, {
      path: '/',
      maxAge: 60 * 60 * 4
    })
  },
  setNewQuestion(state, data) {
    state.currentGroup.questions = data.questions
  },
  updateQuestion(state, data) {
    const questionIndex = state.currentGroup.questions
      .map((q) => q?.questionId)
      .indexOf(data?.questionId)

    Object.assign(state.currentGroup.questions[questionIndex], data)
  },
  setGroups(state, data) {
    state.groups = data
    if (state?.groups?.length) state.currentGroup = state.groups[0]
  }
}

export const actions = {
  async createGroup({ commit }, group) {
    const request = await this.$axios
      .$post('https://wmd-1920-pwa-break.appspot.com/api/groups', group)
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
      .$get(
        `https://wmd-1920-pwa-break.appspot.com/api/groups/${groupCode}/${userId}`
      )
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
      .$post(
        `https://wmd-1920-pwa-break.appspot.com/api/groups/${question.groupCode}/questions`,
        question
      )
      .then((response) => {
        commit('setNewQuestion', response)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async addVote({ commit }, voteInfo) {
    const request = await this.$axios({
      method: 'POST',
      url: `https://wmd-1920-pwa-break.appspot.com/api/groups/${voteInfo.groupCode}/questions/${voteInfo.questionId}`,
      data: voteInfo
    })
      .then((response) => {
        commit('updateQuestion', response?.data)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async removeVote({ commit }, voteInfo) {
    const request = await this.$axios({
      method: 'DELETE',
      url: `https://wmd-1920-pwa-break.appspot.com/api/groups/${voteInfo.groupCode}/questions/${voteInfo.questionId}`,
      data: voteInfo
    })
      .then((response) => {
        commit('updateQuestion', response?.data)
      })
      .catch((error) => {
        return error
      })

    return request
  },

  updateGroupsFromCookie({ commit }) {
    commit('setGroups', this.$cookies.get('groups'))
  },

  async editGroup({ commit }, group) {
    const request = await this.$axios
      .$put(
        `https://wmd-1920-pwa-break.appspot.com/api/groups/${group.groupCode}`,
        group
      )
      .then(() => {
        commit('setCurrentGroup', { name: group.name })
      })
      .catch((error) => {
        return error
      })

    return request
  },

  clearVotes({ commit }) {},

  async kickAllMembers({ commit }, group) {
    const request = await this.$axios({
      method: 'DELETE',
      url: `https://wmd-1920-pwa-break.appspot.com/api/groups/${group.groupCode}/users`,
      data: group
    })
      .then(() => {
        commit('setCurrentGroup', { userCount: 1 })
      })
      .catch((error) => {
        return error
      })

    return request
  },

  async deleteGroup({ commit }, group) {
    const request = await this.$axios({
      method: 'DELETE',
      url: `https://wmd-1920-pwa-break.appspot.com/api/groups/${group.groupCode}`,
      data: group
    })
      .then(() => {
        const currentGroups = this.state.groups
        const indexOfgroupToBeDeleted = currentGroups.findIndex((g) => {
          if (g.groupCode === group.groupCode) return g
        })
        currentGroups.splice(indexOfgroupToBeDeleted, 1)
        commit('setGroups', currentGroups)
      })
      .catch((error) => {
        return error
      })

    return request
  }
}
