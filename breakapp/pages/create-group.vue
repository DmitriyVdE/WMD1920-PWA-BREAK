<template>
  <div class="wrapper-create">
    <div class="wrapper-header">
      <heading title="Create a group"></heading>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="post">
        <input-with-icon
          :value="form.groupName"
          @input="form.groupName = $event"
          icon-class="im im-users"
          placeholder="Name"
        ></input-with-icon>

        <input-with-icon
          id="input-password"
          :value="form.password"
          @input="form.password = $event"
          type="password"
          icon-class="im im-lock"
          placeholder="Password"
        ></input-with-icon>

        <div v-if="form.errors.length" class="form-errors">
          <ul>
            <li v-for="error in form.errors" :key="error">{{ error }}</li>
          </ul>
        </div>

        <button-with-background text="Create"></button-with-background>
      </form>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/Heading.vue'
import ButtonWithBackground from '@/components/ButtonWithBackground.vue'
import InputWithIcon from '@/components/InputWithIcon.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    Heading,
    ButtonWithBackground,
    InputWithIcon
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
      if (
        this.form.groupName === null ||
        this.form.groupName === '' ||
        this.form.password === null ||
        this.form.password === ''
      ) {
        this.form.errors.push('Group name is required')
        this.form.errors.push('Password name is required')
      } else this.submitForm()
    },
    clearFormErrors() {
      this.form.errors = []
    },
    submitForm() {
      this.createGroup({
        groupName: this.form.groupName,
        password: this.form.password,
        userId: this.$store.state.auth?.user.id
      }).then(() => {
        this.$router.push('/receive-code')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-create {
  .wrapper-controls {
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    form {
      #input-password {
        margin-top: 0.7rem;
      }

      .form-errors {
        ul {
          list-style: none;
          padding: 0;

          li {
            color: #ff808b;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
