<template>
  <div class="wrapper-join">
    <div class="wrapper-header">
      <heading title="Join a group"></heading>
    </div>

    <div class="wrapper-controls">
      <input-with-icon
        placeholder="Code"
        icon-class="im im-lock"
      ></input-with-icon>
      <button-with-background text="Join"></button-with-background>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import ButtonWithBackground from '@/components/ButtonWithBackground.vue'
import InputWithIcon from '@/components/InputWithIcon.vue'

export default {
  components: {
    Heading,
    ButtonWithBackground,
    InputWithIcon
  }
}
</script>

<style lang="scss" scoped>
.wrapper-join {
  .wrapper-controls {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
}
</style>
