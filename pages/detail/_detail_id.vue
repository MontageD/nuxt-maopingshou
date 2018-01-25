<template>
  <div id="app" class="">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>

    <DeMain></DeMain>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import DeMain from '~/components/de-main/main'
  import Headers from '~/components/pc-header/header'

  export default {
    fetch ({store, params, error}) {
      return store.dispatch('loadArticleDetail', params).catch(() => {
        error({statusCode: 404, message: '众里寻他 我已不再'})
      })
    },
    transition (to, from) {
      if (!from) return 'slide-left'
      return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    },
    created () {
    },
    data () {
      return {
        order_id: 0,
        info: {}
      }
    },
    computed: {
    },
    methods: {
    },
    components: {
      Headers,
      DeMain
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .hello
    color: blue
</style>

