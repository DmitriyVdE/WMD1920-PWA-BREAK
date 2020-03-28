<template>
  <div class="wrapper-group">
    <div class="wrapper-header">
      <heading title="Group Home"></heading>
    </div>

    <div class="wrapper-heading">
      <div class="wrapper-text">
        <h1>{{ group.name }}</h1>
        <p>{{ group.userCount }} member(s)</p>
      </div>
      <i id="icon-info" class="im im-info"></i>
    </div>

    <div v-if="group.questions" class="wrapper-polls">
      <ul v-if="group.questions.length">
        <li
          v-for="poll in group.questions"
          :key="poll.questionId"
          @click="toggleVote(poll.questionId, poll.voted)"
        >
          <p>{{ poll.title }}</p>
          <p class="count">{{ poll.votes }}</p>
        </li>
      </ul>
      <p v-else>
        No questions yet...
      </p>
    </div>

    <div class="wrapper-controls">
      <button><i class="im im-plus"></i></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    group() {
      return this.$store.state.group.currentGroup
    }
  },
  async mounted() {
    await this.getGroupInfo({
      groupCode: this.id,
      userId: this.$store.state.auth.user.id
    })
  },
  methods: {
    ...mapActions({
      getGroupInfo: 'group/getGroupInfo',
      addVote: 'group/addVote',
      delVote: 'group/delVote'
    }),
    toggleVote(questionId, voted) {
      // eslint-disable-next-line no-console
      console.log(voted)
      if (voted) {
        this.delVote({
          groupCode: this.id,
          userId: this.$store.state.auth.user.id,
          questionId
        })
      } else {
        this.addVote({
          groupCode: this.id,
          userId: this.$store.state.auth.user.id,
          questionId
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-group {
  font-family: Roboto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .wrapper-heading {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 45px;
    min-width: 80%;

    .wrapper-text {
      h1 {
        font-weight: 900;
        font-size: 20px;
        line-height: 23px;
        color: #3b3847;
      }

      p {
        font-size: 14px;
        line-height: 16px;
        color: #acacba;
        margin-bottom: 70px;
      }
    }

    #icon-info {
      color: #6080f4;
      margin-left: 73px;
    }
  }

  .wrapper-polls {
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: scroll;

      li {
        max-width: 257px;
        min-width: 257px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: baseline;

        p {
          &:first-of-type {
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            color: #3b3847;
          }

          &.count {
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 23px;
            color: #3b3847;
            padding: 13px 19px 13px 19px;
            background-color: #f6f5f8;
            border-radius: 14px;
            margin-bottom: 30px;
          }
        }
      }
    }
  }

  .wrapper-controls {
    button {
      align-self: flex-end;
      margin: 100px 0 22px 0;
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      line-height: 42px;
      color: #ffffff;
      background: #5f80f5;
      border-radius: 15px;
      border: none;
      padding: 0 118px 0 118px;
    }
  }
}
</style>
