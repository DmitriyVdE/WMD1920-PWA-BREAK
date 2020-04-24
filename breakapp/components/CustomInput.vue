<template>
  <div class="wrapper-custom-input">
    <div class="wrapper-input">
      <input
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Name'
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-custom-input {
  min-width: 100%;

  .wrapper-input {
    input {
      border: none;
      border-bottom: 2px solid #5f80f5;
      padding-bottom: 9px;
      font-family: Roboto;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: #090843;
      min-width: 100%;
    }
  }
}
</style>
