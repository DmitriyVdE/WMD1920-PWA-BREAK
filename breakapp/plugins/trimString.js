import Vue from 'vue'

Vue.filter('trimString', (value, maxStringLength) => {
  if (!value) return ''

  const trimmedString = value.toString().substring(0, maxStringLength)

  return trimmedString.length > maxStringLength
    ? trimmedString.concat(' ...')
    : trimmedString
})
