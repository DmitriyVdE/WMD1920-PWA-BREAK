<template>
  <div class="wrapper-start-screen">
    <logo id="logo" />

    <div class="wrapper-buttons">
      <nuxt-link to="/create-group">Create</nuxt-link>
      <nuxt-link to="/join-group">Join</nuxt-link>
      <nuxt-link id="my-groups" to="/my-groups">My groups</nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
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

      &#my-groups {
        background-color: transparent;
        color: hsla(260, 3%, 21%, 0.781);
        font-weight: 400;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
}
</style>
