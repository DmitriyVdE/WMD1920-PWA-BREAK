<template>
  <div class="wrapper-input-with-icon">
    <div class="wrapper-input">
      <input :placeholder="placeholder" type="text" />
      <i id="icon" :class="iconClass"></i>
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
    iconClass: {
      type: String,
      default: 'im im-users'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-input-with-icon {
  position: relative;
  top: -18px;

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
    }

    #icon {
      position: relative;
      left: -6px;
      top: 5px;
      padding-left: 10px;
      border-bottom: 2px solid #5f80f5;
      padding-bottom: 9px;
      color: #5b5ab3;
    }
  }
}
</style>
