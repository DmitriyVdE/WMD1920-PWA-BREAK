const requestNotificationPermission = () => {
  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status)
  })
}

const sendGroupCreatedNotification = (group) => {
  navigator.serviceWorker.getRegistration().then(function(reg) {
    const options = {
      body: `Group ${group.groupName} created`,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    reg.showNotification('You created a new group ...', options)
  })
}

export default ({ app }, inject) => {
  inject('sendGroupCreatedNotification', (group) => {
    if (Notification.permission === 'granted')
      sendGroupCreatedNotification(group)
    else requestNotificationPermission()
  })
}
