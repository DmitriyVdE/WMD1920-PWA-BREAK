<template>
  <div class="wrapper-heading">
    <logo id="logo"></logo>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-heading {
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-top: 32px;
  max-width: 267.5px;

  #logo {
    max-height: 48px;
    max-width: 48px;
  }

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #4e4cac;
  }
}
</style>
