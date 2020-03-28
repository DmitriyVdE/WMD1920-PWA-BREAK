<template>
  <div class="wrapper-group-info">
    <div class="wrapper-heading">
      <p>{{ groupName }}</p>
      <p class="subtitle">Your group code</p>
    </div>

    <p id="code">{{ code }}</p>

    <div class="wrapper-controls">
      <button id="btn-edit" @click="editGroup">Edit</button>
      <button id="btn-clear-votes" @click="clearVotes">Clear votes</button>
      <button id="btn-kick-all" @click="kickAll">Kick all</button>
      <button id="btn-disband" @click="disbandGroup">Disband</button>
    </div>

    <nuxt-link id="btn-back" to="/">Home</nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'isGroupOwner',
  methods: {
    ...mapActions({
      editGroup: 'group/editGroup',
      clearVotes: 'group/clearVotes',
      kickAll: 'group/kickAllMembers',
      disbandGroup: 'group/deleteGroup'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper-group-info {
  min-height: 100vh;
  font-family: Roboto;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .wrapper-heading {
    margin-bottom: 65px;

    p {
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;
      color: #4e4cac;

      &.subtitle {
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #c4c4c4;
      }
    }
  }

  #code {
    font-weight: 900;
    font-size: 48px;
    line-height: 56px;
    color: #4e4cac;
  }

  .wrapper-controls {
    display: flex;
    flex-flow: row wrap;
    margin-top: 75px;
    max-width: 215px;
    max-height: 215px;

    button {
      box-sizing: border-box;
      border-radius: 17px;
      min-width: 100px;
      min-height: 100px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;

      &#btn-clear-votes {
        background: #5b5ab3;
        border: 3px solid #4e4cac;
        margin: 0 0 15px 0;
      }

      &#btn-kick-all {
        background: #fef2f4;
        border: 3px solid #de8e95;
        color: #eeaab1;
      }

      &#btn-edit {
        background: #a3a6dc;
        border: 3px solid #9698d5;
        margin: 0 15px 15px 0;
      }

      &#btn-disband {
        background: #ff919b;
        border: 3px solid #ff808b;
        margin: 0 0 0 15px;
      }
    }
  }

  #btn-back {
    margin-top: 2rem;
  }
}
</style>
