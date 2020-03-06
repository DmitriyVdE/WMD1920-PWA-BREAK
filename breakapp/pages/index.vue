<template>
  <div class="wrapper-start-screen">
    <logo id="logo" />

    <div class="wrapper-buttons">
      <nuxt-link to="/create">Create</nuxt-link>
      <nuxt-link to="/join">Join</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  async mounted() {
    const userId = await this.getUserId()
    console.log('userId: ' + userId)
    return userId
  },
  methods: {
    ...mapActions({
      getUserId: 'getUserId'
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper-start-screen {
  background-color: #f6f4fc;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  #logo {
    margin: 0 0 3rem 0;
  }

  .wrapper-buttons {
    a {
      display: block;
      text-decoration: none;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      padding: 19px 76px;
      border-radius: 10px;
      text-align: center;
      color: #ffffff;

      &:first-of-type {
        background: #4e4cac;
        margin-bottom: 30px;
      }

      background: #9698d5;
    }
  }
}
</style>
