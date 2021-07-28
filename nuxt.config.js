import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'Dikram',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/cloudinary',
    'nuxt-stripe-module'
  ],
  stripe: {
    publishableKey: 'pk_test_51JFfnHJ36Z0ScWohD0DyqidwRSS4dkTphWT0vDMkPPdG63xKqpKRJnvi7xbizCBaasfR19fe2KDtl35bPwljZ9eZ00pzOj4UPp'
  },
  cloudinary: {
    cloudName: process.env.CLOUDNAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    useComponent: true
  },
  hooks: {
    'content:file:beforeInsert': async (document) => {
      if (document.extension !== '.md' || !document.image) return

      const { $cloudinary } = require('@nuxtjs/cloudinary')
      const publicId = `${document.slug}-cover`

      /* Get existing image from Cloudinary based on publicId */
      let asset = await $cloudinary.explicit(publicId, {
        type: 'upload'
      })

      /* There is no image uploaded yet, so upload and save it */
      if (!asset) {
        asset = await $cloudinary.upload(
          path.join(__dirname, `content/posts/${document.image}`),
          {
            public_id: publicId
          }
        )
      }

      /* Replace image with the return object */
      document.image = asset || {}
    }
  },
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/explore'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
          type: false
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: false,
          user: { url: '/auth/user', method: 'get' }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://dikramback.herokuapp.com/api'
    // baseURL: 'http://localhost:8080/api'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          'first': '#158085', // Dark blue
          'second': '#D1EDF2', // Light blue
          'third': '#7EF0F5', // Blue (chillón)
          'fourth': '#A31D5E', // Magenta
          'fifth': '#D6AEBC', // Pinky 
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
