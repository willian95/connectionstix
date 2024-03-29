const webpack = require("webpack");
require('dotenv').config()
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ConnectionsTix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css"
      }
    ],
    script:[
      {
        src:'https://sandbox.web.squarecdn.com/v1/square.js'
      },
      {
        src:'https://cdn.polyfill.io/v3/polyfill.min.js'
      },
      {
        src:'https://checkout.sandbox.dev.clover.com/sdk.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/vars/_variables.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: "~plugins/isotope.js", ssr: false },
    { src: '~/plugins/paypal.js', ssr: false },
    { src: '~/plugins/vue-slick-carousel.js', ssr: false}
     //   {src : "~/plugins/vuetify.js"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/dotenv',
    'nuxt-i18n',
    '@nuxtjs/fontawesome',
    '@nuxtjs/date-fns',
   
  ],

  fontawesome: {

    component:'fa',
    imports: [
      {
      set: '@fortawesome/free-solid-svg-icons',
      icons: ['faFlask', 'faCreditCard']
      },
      {set: '@fortawesome/free-brands-svg-icons',
      icons: ['faPaypal']
      },
    ]

  },

  styleResources: {
    scss: ['./assets/vars/*.scss',
    './assets/_mixins.scss' ,
    './assets/_custom.scss' ,]
  },

  i18n: {
    lazy:true,
    langDir:'lang',
    locales: ['en', 'es'],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,  // recommended
    },
    strategy: 'prefix_except_default',
    vueI18nLoader: true,
    locales: [
      {
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'es',
        file: 'es-ES.js'
      },
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'vuetify-dialog/nuxt',
    '@nuxtjs/auth-next'
  ],

  auth: {
    strategies:{
      "local":{
        token: {
          property: 'access_token',
        },
        endpoints:{
          login:{url: '/auth', method:"post"},
          logout:{url: '/auth/logout', method:"post"},
          user:{url: '/users', method:"get"},
        },

      },
    },
    watchLoggedIn: true,
    redirect: {
      login: '/cms/login',
      logout: '/',
      callback: '/login',
      home: '/cms/dashboard'
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000',
  },

  publicRuntimeConfig: {
    axios: {
      //browserBaseURL: "http://fanshop.sytes.net/api"
      browserBaseURL: "http://localhost:8000"
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
   vendor: [ 'vueisotope'],

   vendor: ["jquery"],
   plugins: [
    
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    
   ],

   vendor: ['vueisotope'],
   extend (config, { isClient }) {
     if (isClient) {
       config.resolve.alias = Object.assign(config.resolve.alias, {
         'masonry': 'masonry-layout',
         'isotope': 'isotope-layout'
       })
     }
   }
  },

  server:{
    host: '0.0.0.0'
  }
}
