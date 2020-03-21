<template>
  <div class="wrapper-poll">
    <div class="wrapper-header">
      <heading title="Create a poll"></heading>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="post">
        <input-with-icon
          :value="form.question"
          @input="form.question = $event"
          placeholder="Poll"
          icon-class="im im-question"
        ></input-with-icon>

        <error-list :errors="form.errors"></error-list>

        <button-with-background text="Create"></button-with-background>
      </form>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import ButtonWithBackground from '@/components/ButtonWithBackground.vue'
import InputWithIcon from '@/components/InputWithIcon.vue'
import ErrorList from '@/components/ErrorList.vue'

import { mapActions } from 'vuex'

export default {
  middleware: 'isGroupOwner',
  components: {
    Heading,
    ButtonWithBackground,
    InputWithIcon,
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
  async mounted() {
    await this.getGroupId()
  },
  methods: {
    ...mapActions({
      createPoll: 'group/createPoll',
      getGroupId: 'getGroupId'
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
        groupId: this.$store.state.group.currentGroup?.id,
        question: this.form.question
      }).then(() => {
        // this.$router.push(`/groups/${this.groupId}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-poll {
  .wrapper-controls {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }
}
</style>
