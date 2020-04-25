<template>
  <div v-if="errors.length" class="error-list">
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error-list {
  ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;

    li {
      color: #ff808b;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
    }
  }
}
</style>
