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
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
  min-width: 100%;

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
    text-align: right;
  }
}
</style>
