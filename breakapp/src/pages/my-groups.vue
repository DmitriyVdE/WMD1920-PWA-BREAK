<template>
  <div class="wrapper-my-groups">
    <h1>
      <nuxt-link
        id="btn-back"
        to="/"
        tag="i"
        class="im im-arrow-left"
      ></nuxt-link>
      <p>My Groups</p>
    </h1>
    <div class="wrapper-colored-bar"></div>
    <div class="wrapper-groups">
      <ul v-if="groups.length">
        <li v-for="group in groups" :key="group.id">
          <nuxt-link :to="`/groups/${group.code}`" tag="p">{{
            group.name | trimString(16)
          }}</nuxt-link>
          <nuxt-link
            :to="`/groups/${group.code}/info`"
            tag="div"
            class="btn-delete"
          >
            <i class="im im-x-mark icon"></i>
          </nuxt-link>
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
      return this.$store.state.group.groups
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-my-groups {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 280px;
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
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 45px 0 30px 0;
    color: #3b3847;
    min-width: 100%;

    #btn-back {
      &:hover,
      :active {
        cursor: pointer;
      }
    }

    p {
      margin-left: 15px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 900;
      font-size: 20px;
      line-height: 23px;
    }
  }

  .wrapper-groups {
    min-width: 100%;
    ul {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      min-width: 100%;
      margin: 40px auto 0;
      min-width: 100%;
      padding: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 600px;

      &::-webkit-scrollbar {
        height: 0;
        width: 0;
      }

      &::-webkit-scrollbar-thumb {
        height: 0;
        width: 0;
      }

      &::-webkit-scrollbar-track {
        height: 0;
        width: 0;
      }

      li {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        min-width: 100%;
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

          &:hover,
          :active {
            cursor: pointer;
            text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.1);
          }
        }

        .btn-delete {
          background: #f6f5f8;
          border-radius: 14px;

          &:hover,
          :active {
            cursor: pointer;
            transform: scale(1.1);
          }

          .icon {
            color: #ff919b;
            padding: 13px;
          }
        }
      }
    }
  }

  #btn-new-group {
    margin-top: 5rem;
  }
}
</style>
