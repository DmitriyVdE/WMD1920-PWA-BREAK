<template>
  <div class="wrapper-join">
    <div class="wrapper-header">
      <heading title="Join a group"></heading>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="get">
        <custom-input
          :value="form.groupCode"
          @input="form.groupCode = $event"
          placeholder="Code"
        ></custom-input>

        <error-list :errors="form.errors"></error-list>

        <button-with-background
          id="btn-join"
          text="Join"
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
  components: {
    Heading,
    ButtonWithBackground,
    CustomInput,
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
      }).then((returned) => {
        if (returned === undefined) {
          this.$router.push(
            `/groups/${this.$store.state.group.currentGroup.code}`
          )
        } else {
          this.form.errors.push('Invalid group code.')
        }
      })
    }
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
