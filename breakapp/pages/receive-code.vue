<template>
  <div class="wrapper-receive-code">
    <div class="wrapper-heading">
      <p>{{ groupName }}</p>
      <p class="subtitle">Your group code</p>
    </div>
    <p>{{ code }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupName: 'SomeGroupName',
      code: 'QWSJSN'
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

  p {
    font-weight: 900;
    font-size: 48px;
    line-height: 56px;
    color: #4e4cac;
  }
}
</style>
