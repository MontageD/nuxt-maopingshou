<template>
  <div class="view-container">
    <keep-alive>
      <pcHeader></pcHeader>
    </keep-alive>

    <pcMain></pcMain>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcHeader from '~/components/pc-header/header'
  import pcMain from '~/components/pc-main/main'
  import { mapGetters } from 'vuex'
  import Recommend from '~/components/pc-main/recommend'

  export default {
    head: {
      titleTemplate: '%s - 猫评聚合新闻',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'},
        {hid: 'description', name: 'description', content: '猫评网利用大量数据精确筛选用户需要的内容，内容包括要闻、 社区生活、传统文化、法律财经、教育移民、医疗健康、艺术时尚、旅游地产、美食、娱乐体育。'},
        {hid: 'description', name: 'keyswords', content: '猫评手,猫评网,数据,评论分析,从评论看新闻,中文,媒体,评论网站,观点,时效,即时新闻,独立社区'}
      ]
    },
    created () {
    },
    mounted () {
    },
    components: {
      pcHeader,
      pcMain,
      Recommend
    },
    computed: mapGetters({
      listInfo: 'option/getListInfo'
    }),
    methods: {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .view-container:after, .view-container:before
    display table
    content " "

  .view-container:after
    clear both
</style>
