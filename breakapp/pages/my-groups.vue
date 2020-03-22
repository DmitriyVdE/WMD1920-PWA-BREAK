<template>
  <div class="wrapper-my-groups">
    <h1>My Groups</h1>
    <div class="wrapper-colored-bar"></div>
    <div class="wrapper-groups">
      <ul v-if="groups.length">
        <li v-for="group in groups" :key="group.id">
          <nuxt-link :to="`/groups/${group.code}`" tag="p">{{
            group.name | trimString(16)
          }}</nuxt-link>
          <div class="btn-delete">
            <i class="im im-x-mark icon"></i>
          </div>
        </li>
      </ul>
      <p v-else>
        No groups yet ...
      </p>
    </div>
    <nuxt-link to="/create-group">
      <button-no-background
        id="btn-new-group"
        text="New Group"
      ></button-no-background>
    </nuxt-link>
  </div>
</template>

<script>
import ButtonNoBackground from '@/components/ButtonNoBackground.vue'

export default {
  middleware: 'isGroupOwner',
  components: {
    ButtonNoBackground
  },
  computed: {
    groups() {
      return this.$cookies.get('groups')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-my-groups {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  max-width: 285px;
  margin: 0 auto;

  .wrapper-colored-bar {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 10px;
    min-width: 100%;
    background-color: #5f80f5;
  }

  h1 {
    margin: 45px 0 30px 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 23px;
    color: #3b3847;
  }

  ul {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    min-width: 85%;
    margin: 40px auto 0;
    padding: 0;

    li {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;

      &:last-of-type {
        margin-bottom: 0;
      }

      p {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 21px;
        color: #3b3847;
        overflow: hidden;
        max-width: 60%;
      }

      .btn-delete {
        background: #f6f5f8;
        border-radius: 14px;

        .icon {
          color: #ff919b;
          padding: 13px;
        }
      }
    }
  }

  #btn-new-group {
    position: absolute;
    bottom: 36px;
    left: 0;
    right: 0;
  }
}
</style>
