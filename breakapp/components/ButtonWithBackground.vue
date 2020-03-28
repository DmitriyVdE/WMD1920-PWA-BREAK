<template>
  <div class="wrapper-button">
    <div id="button-background">
      <button type="submit" value="Submit">{{ text }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Click Me!'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-button {
  #button-background {
    margin: 0 auto;
    width: 288px;
    height: 124px;
    background-color: #f6f4fc;
    border-radius: 17px;

    button {
      position: relative;
      top: 40px;
      display: block;
      margin: 0 auto;
      font-family: Roboto;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: #ffffff;
      background: #5f80f5;
      border-radius: 10px;
      padding: 12px 88px;
      border: none;
      max-width: 234px;

      &:hover,
      :active {
        cursor: pointer;
      }
    }
  }
}
</style>
