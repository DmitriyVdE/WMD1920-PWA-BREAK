<template>
  <div class="wrapper-poll">
    <div class="wrapper-header">
      <heading title="Create a poll"></heading>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="post">
        <custom-input
          :value="form.question"
          @input="form.question = $event"
          placeholder="Poll"
          icon-class="im im-question"
        ></custom-input>

        <error-list :errors="form.errors"></error-list>

        <button-with-background
          id="btn-create"
          text="Create"
        ></button-with-background>
      </form>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import ButtonWithBackground from '@/components/ButtonWithBackground.vue'
import CustomInput from '@/components/CustomInput.vue'
import ErrorList from '@/components/ErrorList.vue'

import { mapActions } from 'vuex'

export default {
  middleware: 'isGroupOwner',
  components: {
    Heading,
    ButtonWithBackground,
    CustomInput,
    ErrorList
  },
  data() {
    return {
      form: {
        question: '',
        errors: []
      }
    }
  },
  methods: {
    ...mapActions({
      createPoll: 'group/createPoll'
    }),
    validateForm() {
      this.clearFormErrors()
      if (!this.form.question) {
        this.form.errors.push('Question is required')
      } else this.submitForm()
    },
    clearFormErrors() {
      this.form.errors = []
    },
    submitForm() {
      this.createPoll({
        groupCode: this.$store.state.group.currentGroup.code,
        userId: this.$store.state.auth.user.id,
        question: this.form.question
      }).then(() => {
        this.$router.push(
          `/groups/${this.$store.state.group.currentGroup.code}`
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-poll {
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

    #btn-create {
      margin-top: 5rem;
    }
  }
}
</style>
