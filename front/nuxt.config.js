const webpack = require("webpack");
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
    script: [
      
      
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/vars/_variables.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/isotope.js", ssr: false }
     //   {src : "~/plugins/vuetify.js"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',


   
  ],
  styleResources: {
    scss: ['./assets/vars/*.scss',
    './assets/_mixins.scss' ,
    './assets/_custom.scss' ,]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],

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
    
   //vendor: ['vuetify'],
   vendor: [ 'vueisotope'],

   vendor: ["jquery"],
   plugins: [
     new webpack.ProvidePlugin({
       $: "jquery"
     })
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
