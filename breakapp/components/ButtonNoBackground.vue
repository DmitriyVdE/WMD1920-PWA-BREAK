<template>
  <div class="wrapper-button">
    <button type="submit" value="Submit">{{ text }}</button>
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
  button {
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

    &:hover,
    :active {
      cursor: pointer;
      transform: scale(1.02);
    }
  }
}
</style>
