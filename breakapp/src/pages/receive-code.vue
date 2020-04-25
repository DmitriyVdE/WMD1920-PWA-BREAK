<template>
  <div class="wrapper-receive-code">
    <div class="wrapper-code">
      <div v-if="currentGroup">
        <div class="wrapper-heading">
          <p>{{ currentGroup.name }}</p>
          <p class="subtitle">Your group code</p>
        </div>
        <p id="code">{{ currentGroup.code }}</p>
      </div>
    </div>
    <div class="wrapper-controls">
      <nuxt-link to="/poll">Create your first poll</nuxt-link>
      <nuxt-link to="/">Back to index</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'isGroupOwner',
  computed: {
    currentGroup() {
      return this.$store.state.group.currentGroup
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-receive-code {
  min-height: 100vh;
  font-family: Roboto;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .wrapper-code {
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
  }

  .wrapper-controls {
    margin-top: 4rem;
    display: flex;
    flex-flow: column nowrap;

    a {
      text-decoration: none;
      font-weight: normal;
      font-size: 18px;
      line-height: 23px;
      color: #4e4cac;
      padding: 1rem 1.6rem;

      &:first-of-type {
        font-weight: bold;
        margin-bottom: 0.5rem;
        border: 2px solid #4e4cac;
        border-radius: 6px;
      }
    }
  }
}
</style>
