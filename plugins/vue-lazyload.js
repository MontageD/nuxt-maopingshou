import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '～assert/error.png',
  loading: '～assert/Wedges.gif',
  attempt: 1
})
