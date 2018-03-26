import Vue from 'vue'
if (process.BROWSER_BUILD) {
  const Vue2Share = require('vue-social-share')
  Vue.use(Vue2Share)
}
