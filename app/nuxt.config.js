export default {
  name: 'linx-app',
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title:
      '',
    description:
      '',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    { src: '~/assets/css/main.scss', lang: 'scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],
  bootstrapVue: {
    icons: true,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss : null,
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
  // Server Middleware
  serverMiddleware: {
    '/api': '~/api',
  },
  // Module: sitemap
  // sitemap: {
  //   exclude: ['/development/ui', '/development/api-mock', '/404', '/500'],
  // },
  // Module: @nuxtjs/robots
  // robots: {
  //   Sitemap: './sitemap.xml',
  //   UserAgent: '*',
  //   Disallow: `${process.env.NODE_ENV == 'production' ? '' : '/'}`,
  // },
  // i18n
  // i18n: {
  //   lazy: true,
  //   skipNuxtState: true,
  //   locales: [
  //     {
  //       code: 'en',
  //       file: 'en.js',
  //     },
  //     {
  //       code: 'zh_Hant',
  //       file: 'zh_Hant.js',
  //     },
  //     {
  //       code: 'zh_Hans',
  //       file: 'zh_Hans.js',
  //     },
  //   ],
  //   langDir: 'lang/',
  //   defaultLocale: 'en',
  // },
  axios: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/api/',
  },
  // googleFonts: {
  //   download: false,
  //   families: {
  //     'Noto+Sans': true,
  //     'Noto+Sans+TC': true,
  //     'Noto+Sans+SC': true,
  //     'Titillium+Web': true,
  //     Oswald: true,
  //   },
  // },
  // colorMode: {
  //   preference: 'dark', // default value of $colorMode.preference
  //   fallback: 'dark', // fallback value if not system preference found
  //   hid: 'color-mode-script',
  //   globalName: '__NUXT_COLOR_MODE__',
  //   componentName: 'ColorScheme',
  //   classPrefix: '',
  //   classSuffix: '-mode',
  //   storageKey: 'nuxt-color-mode',
  // },
  // env: {
  //   OAUTH_GOOGLE: process.env.OAUTH_GOOGLE,
  //   OAUTH_FACEBOOK: process.env.OAUTH_FACEBOOK,
  //   OAUTH_GOOGLE_CALLBACK: process.env.OAUTH_GOOGLE_CALLBACK,
  //   OAUTH_FACEBOOK_CALLBACK: process.env.OAUTH_FACEBOOK_CALLBACK,
  // },
};
