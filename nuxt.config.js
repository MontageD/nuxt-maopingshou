module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '猫评 - 帮助你看评论的网站',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: '大众分析的数据利器'},
      {hid: 'description', name: 'keyswords', content: '猫评手,maopingshou,数据,评论分析,从评论看新闻'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  css: [
    {src: '~/assets/stylus/index.styl', lang: 'stylus'},
    {src: 'material-design-icons/iconfont/material-icons.css'}
    // {src: 'bulma-stylus/bulma.styl', lang: 'stylus'}
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/Loading/loading.vue',
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    middleware: 'stats'
  },
  plugins:
    [
      {src: '~plugins/vue-lazyload', ssr: false}
    ]
}
