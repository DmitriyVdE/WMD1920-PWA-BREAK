<template>
  <div class="wrapper-join">
    <div class="wrapper-header">
      <heading title="Join a group"></heading>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="get">
        <input-with-icon
          :value="form.groupCode"
          @input="form.groupCode = $event"
          placeholder="Code"
          icon-class="im im-lock"
        ></input-with-icon>

        <error-list :errors="form.errors"></error-list>

        <button-with-background text="Join"></button-with-background>
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
  components: {
    Heading,
    ButtonWithBackground,
    InputWithIcon,
    ErrorList
  },
  data() {
    return {
      form: {
        groupCode: '',
        errors: []
      }
    }
  },
  async mounted() {
    await this.getUserId()
  },
  methods: {
    ...mapActions({
      getGroupInfo: 'group/getGroupInfo',
      getUserId: 'getUserId'
    }),
    validateForm() {
      this.clearFormErrors()
      if (!this.form.groupCode) {
        this.form.errors.push('Group code is required')
      } else this.submitForm()
    },
    clearFormErrors() {
      this.form.errors = []
    },
    submitForm() {
      this.getGroupInfo({
        groupCode: this.form.groupCode,
        userId: this.$store.state.auth?.user.id
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
