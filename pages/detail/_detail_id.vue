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
    data () {
      return {
        order_id: 0,
        info: {},
        content: '222',
        keyswords: process.env.seokeywords
      }
    },
    head () {
      return {
        title: this.$store.state.article.detailList[0].title + ' - ' + '猫评聚合新闻' ,
        meta: [
          {charset: 'utf-8'},
          {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
          {
            hid: 'description',
            name: 'description',
            content: this.$store.state.article.detailList[0].types + ' - ' + this.$store.state.article.detailList[0].title
          },
          {hid: 'keyswords', name: 'keyswords', content: '猫评手,猫评网,数据,评论分析,从评论看新闻,中文,媒体,评论网站,观点,时效,即时新闻,独立社区'}
        ]
      }
    },
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
    computed: {
    },
    methods: {},
    mounted () {
      //      console.log(this.$store.state.article.detailList[0])
      // detailList
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

