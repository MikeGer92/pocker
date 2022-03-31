export default {
  // server: {
  //   port: 8000,
  //   host: '0.0.0.0'
  // },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'poker-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    script: [{ src: 'https://widget.cloudpayments.ru/bundles/cloudpayments' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/base.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/fontawesome',
    '@/plugins/filters',
    '@/plugins/click-outside',
    '@/plugins/vue-slider',
    '@/plugins/slick',
    {
      src: '@/plugins/vue-context',
      ssr: false
    },
    {
      src: '@/plugins/vue-avatar-cropper',
      ssr: false
    },
    '@/plugins/show-slide'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-clipboard2',
    'qonfucius-nuxt-fontawesome'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: [
    // 'http://161.35.214.199/api/v1'
    'https://pokerstove.relabs.ru/api/v1'
  ],

  router: {
    middleware: ['auth']
  },

  loading: {
    color: '#009758'
  },

  auth: {
    redirect: {
      login: '/auth',
      logout: '/auth',
      home: '/'
    },
    strategies: {
      customStrategy: {
        scheme: '~/schemes/customStrategy',
        token: {
          property: '',
          required: false,
          maxAge: 86400
        },
        user: {
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/v1/auth/login', method: 'post' },
          logout: { url: '/api/v1/auth/logout', method: 'post' },
          user: { url: '/api/v1/auth/me', method: 'get' }
        }
      }
    },
    plugins: ['~/plugins/auth.js']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/, 'vue-avatar-cropper', 'vue-context']
  }
}
