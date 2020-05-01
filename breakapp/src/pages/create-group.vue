<template>
  <div class="wrapper-create">
    <div class="wrapper-header">
      <heading title="Create a group"></heading>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="post">
        <custom-input :value="form.groupName" @input="form.groupName = $event" placeholder="Name"></custom-input>

        <custom-input
          id="input-password"
          :value="form.password"
          @input="form.password = $event"
          type="password"
          placeholder="Password"
        ></custom-input>

        <error-list :errors="form.errors"></error-list>

        <button-with-background id="btn-create" text="Create"></button-with-background>
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
  components: {
    Heading,
    ButtonWithBackground,
    CustomInput,
    ErrorList
  },
  data() {
    return {
      form: {
        groupName: '',
        password: '',
        errors: []
      }
    }
  },
  async mounted() {
    await this.getUserId()
  },
  methods: {
    ...mapActions({
      createGroup: 'group/createGroup',
      getUserId: 'getUserId'
    }),
    validateForm() {
      this.clearFormErrors()
      if (!this.form.groupName || !this.form.password) {
        this.form.errors.push('Group name is required')
        this.form.errors.push('Password name is required')
      } else this.submitForm()
    },
    clearFormErrors() {
      this.form.errors = []
    },
    submitForm() {
      const group = {
        groupName: this.form.groupName,
        password: this.form.password,
        userId: this.$store.state.auth?.user.id
      }

      this.createGroup(group).then(() => {
        // TODO: Check response code
        this.$router.push('/receive-code')

        if (!$nuxt.isOffline) this.$sendGroupCreatedNotification(group)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-create {
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

    form {
      #input-password {
        margin-top: 0.7rem;
      }
    }

    #btn-create {
      margin-top: 5rem;
    }
  }
}
</style>
