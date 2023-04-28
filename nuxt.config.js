import colors from 'vuetify/es5/util/colors';

export default {
  target: 'static',
  ssr: false,
  generate: {
    fallback: true,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - alibaba',
    title: 'alibaba',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://restcountries.com/v3.1',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    breakpoint: {
      mobileBreakpoint: 'xs',
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#ffffff', // card,...
          secondary: '#fafafa', // bg
          accent: '#111517', // text
          info: colors.blue.darken1,
          warning: colors.amber.accent4,
          error: colors.red.base,
          success: colors.teal.accent4,
        },
        dark: {
          primary: '#2b3945', // card,...
          secondary: '#202c37', // bg
          accent: '#fafafa', // text
          info: colors.blue.darken1,
          warning: colors.amber.accent4,
          error: colors.red.base,
          success: colors.teal.accent4,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
