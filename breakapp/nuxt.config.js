export default {
  mode: 'universal',
  pwa: {
    manifest: {
      name: 'Breakapp Raf Vanpuyvelde & Dmitriy Van der Elst',
      short_name: 'Breakapp',
      lang: 'en',
      display: 'standalone'
    }
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      },
      {
        urlPattern:
          'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
      }
    ]
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.iconmonstr.com/1.3.0/css/iconmonstr-iconic-font.min.css'
      }
    ]
  },
  server: {
    port: 3001
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/css/globals.css'],
  styleResources: {
    scss: '~assets/css/variables.scss'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/axios.js', '~/plugins/trimString.js'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // Doc:
    'cookie-universal-nuxt'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'https://wmd-1920-pwa-break.appspot.com'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
