<template>
  <div class="wrapper-group-info">
    <div class="wrapper-heading">
      <nuxt-link
        id="btn-back"
        :to="`/groups/${group.code}`"
        tag="i"
        class="im im-arrow-left"
      ></nuxt-link>
      <p class="subtitle">Disband group?</p>
    </div>

    <div class="wrapper-controls">
      <form @submit.prevent="validateForm" method="delete">
        <custom-input
          id="input-password"
          :value="password"
          @input="password = $event"
          type="password"
          placeholder="Password"
        ></custom-input>

        <error-list :errors="errors"></error-list>

        <button-with-background
          id="btn-create"
          text="Disband"
        ></button-with-background>
      </form>
    </div>
  </div>
</template>

<script>
import ButtonWithBackground from '@/components/ButtonWithBackground.vue'
import CustomInput from '@/components/CustomInput.vue'
import ErrorList from '@/components/ErrorList.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    ButtonWithBackground,
    CustomInput,
    ErrorList
  },
  middleware: 'isGroupOwner',
  data() {
    return {
      id: this.$route.params.id,
      userId: '',
      password: '',
      errors: []
    }
  },
  computed: {
    group() {
      return this.$store.state.group.currentGroup
    }
  },
  async mounted() {
    this.userId = this.$store.state.auth.user.id
    await this.getGroupInfo({
      groupCode: this.id,
      userId: this.userId
    })
  },
  methods: {
    ...mapActions({
      getGroupInfo: 'group/getGroupInfo',
      commitDelete: 'group/deleteGroup'
    }),
    validateForm() {
      this.clearFormErrors()
      if (!this.password) {
        this.errors.push('Group password is required')
      } else this.submitForm()
    },
    clearFormErrors() {
      this.errors = []
    },
    submitForm() {
      this.commitDelete({
        userId: this.userId,
        groupCode: this.id,
        password: this.password
      }).then((returned) => {
        if (String(returned).includes('status code 400')) {
          this.errors.push('Invalid password.')
        } else {
          this.$router.push(`/`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-group-info {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 280px;
  margin: 0 auto;

  .wrapper-heading {
    margin-bottom: 65px;

    p {
      font-weight: bold;
      font-size: 20px;
      line-height: 23px;
      color: #4e4cac;

      &.subtitle {
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: #c4c4c4;
      }
    }
  }

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
