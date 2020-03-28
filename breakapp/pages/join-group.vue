<template>
  <div class="wrapper-join">
    <div class="wrapper-header">
      <heading title="Join a group"></heading>
    </div>

    <div class="wrapper-controls">
      <custom-input placeholder="Code"></custom-input>
      <button-with-background
        id="btn-join"
        text="Join"
      ></button-with-background>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import ButtonWithBackground from '@/components/ButtonWithBackground.vue'
import CustomInput from '@/components/CustomInput.vue'

export default {
  components: {
    Heading,
    ButtonWithBackground,
    CustomInput
  }
}
</script>

<style lang="scss" scoped>
.wrapper-join {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 280px;
  margin: 0 auto;

  .wrapper-header {
    min-width: 100%;
  }

  .wrapper-controls {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    #btn-join {
      margin-top: 5rem;
    }
  }
}
</style>
