<template>
  <div>
    <div :class="isOnline ? 'green' : 'red'">
      Awesome Vue.js PWA
      <b>{{ isOnline ? 'is Online' : 'is Offline' }}</b>
    </div>

    <nuxt />
  </div>
</template>

<script>
/* eslint-disable */
/*
export default {
  data() {
    return {
      isOnline: window.navigator.onLine,
      notificationsSupported: false
    }
  },
  methods: {
    askPermission() {
      if (this.notificationsSupported) {
        Notification.requestPermission((result) => {
          console.log('result from permission question', result)
          if (result !== 'granted') {
            alert('You probably do not like notifications?!')
          } else {
            console.log(
              `A notification will be send from the service worker => This only works in production`
            )
          }
        })
      }
    },
    offlineNotification() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready // returns a Promise, the active SW registration
          .then((swreg) =>
            swreg.showNotification('Application offline', {
              body: `Hey, we'll be back`,
              icon: '/img/icons/unicorn-offline-600x600.png',
              image: '/img/icons/unicorn-offline-600x600.png',
              vibrate: [300, 200, 300],
              badge: '/img/icons/unicorn-offline-600x600.png'
            })
          )
      }
    },
    onlineNotification() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready // returns a Promise, the active SW registration
          .then((swreg) =>
            swreg.showNotification('Application online', {
              body: `Hey, we're back!`,
              icon: '/img/icons/unicorn-630x630.jpg',
              image: '/img/icons/unicorn-630x630.jpg',
              vibrate: [300, 200, 300],
              badge: '/img/icons/unicorn-630x630.jpg'
            })
          )
      }
    },
    established() {
      if ('Notification' in window && 'serviceWorker' in navigator) {
        this.notificationsSupported = true
      }

      this.askPermission()

      window.addEventListener('online', () => {
        this.isOnline = true
        this.onlineNotification()
      })
      window.addEventListener('offline', () => {
        this.isOnline = false
        this.offlineNotification()
      })
    }
  }
}
*/
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
