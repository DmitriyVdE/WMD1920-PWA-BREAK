<template>
  <div class="wrapper-group">
    <div class="wrapper-heading">
      <div class="wrapper-text">
        <h1>
          <nuxt-link
            id="btn-back"
            to="/"
            tag="i"
            class="im im-arrow-left"
          ></nuxt-link
          >{{ group.name }}
        </h1>
        <p>{{ group.userCount }} member(s)</p>
      </div>
      <i
        id="icon-info"
        v-if="group.isOwner"
        @click="goToDetails()"
        class="im im-info"
      ></i>
    </div>

    <div v-if="group.questions" class="wrapper-polls">
      <ul v-if="group.questions.length">
        <li v-for="question in group.questions" :key="question.questionId">
          <p>{{ question.title }}</p>
          <p @click="toggleVote(question)" class="count">
            {{ question.votes }}
          </p>
        </li>
      </ul>
      <p id="txt-no-questions" v-else>
        No questions yet...
      </p>
    </div>

    <div v-if="group.isOwner" class="wrapper-controls">
      <button @click="addQuestion()">
        <i class="im im-plus"></i>
      </button>
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
      removeVote: 'group/removeVote'
    }),
    toggleVote(poll) {
      const { questionId, voted } = poll

      const vote = {
        groupCode: this.id,
        userId: this.$store.state.auth.user.id,
        questionId
      }

      if (!voted) this.addVote(vote)
      else this.removeVote(vote)
    },
    addQuestion() {
      this.$router.push('/poll')
    },
    goToDetails() {
      this.$router.push(`/groups/${this.id}/info`)
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
  max-width: 280px;
  margin: 0 auto;

  .wrapper-heading {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 45px;
    min-width: 100%;

    .wrapper-text {
      h1 {
        font-weight: 900;
        font-size: 20px;
        line-height: 23px;
        color: #3b3847;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        #btn-back {
          font-size: 15px;
          margin-right: 1rem;

          &:hover,
          :active {
            cursor: pointer;
          }
        }
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
      cursor: pointer;
    }
  }

  .wrapper-polls {
    min-width: 100%;

    #txt-no-questions {
      text-align: center;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 600px;

      &::-webkit-scrollbar {
        height: 0;
        width: 0;
      }

      &::-webkit-scrollbar-thumb {
        height: 0;
        width: 0;
      }

      &::-webkit-scrollbar-track {
        height: 0;
        width: 0;
      }

      li {
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

            &:hover,
            :active {
              cursor: pointer;
              transform: scale(1.01);
            }
          }
        }
      }
    }
  }

  .wrapper-controls {
    min-width: 100%;

    button {
      min-width: 100%;
      align-self: flex-end;
      margin: 50px 0 22px 0;
      font-style: normal;
      font-weight: 500;
      font-size: 36px;
      line-height: 42px;
      color: #ffffff;
      background: #5f80f5;
      border-radius: 15px;
      border: none;
      padding: 0 118px 0 118px;
      cursor: pointer;
    }
  }
}
</style>
