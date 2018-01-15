<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>
    <div class="container main-container view-list">
      <div class="l_title">
        <i class="material-icons">polymer</i>评论源
      </div>


      <div class="row ">

        <div class="_col-2 margin-row">
          <a href="javascript:void(0)" @click="">
            <div class="l_box">
              <div class="web-content-top">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/jiandan.jpg"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">煎蛋网</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content">
                  煎蛋以译介方式传播网络新鲜资讯
                </div>
              </div>
            </div>
          </a>
        </div>


        <div class="_col-2 margin-row">
          <a href="">
            <div class="l_box">
              <div class="web-content-top">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/wangyi.png"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">网易新闻</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content">
                  新闻,新闻中心,包含有时政新闻,国内新闻,国际新闻,社会新闻,时事评论,新闻图片,新闻专题,新闻论坛,军事,历史,的专业时事报道门户网站
                </div>
              </div>
            </div>
          </a>
        </div>


        <div class="_col-2 margin-row ">
          <div class="weihu">开发中...</div>
          <a href="javascript:void(0)">
            <div class="l_box not-pro">
              <div class="web-content-top">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/zhihu_1.jpg"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">知乎</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content">
                  发现更大的世界
                </div>
              </div>
            </div>
          </a>
        </div>


        <div class="_col-2 margin-row ">
          <div class="weihu">开发中...</div>
          <a href="javascript:void(0)">
            <div class="l_box not-pro">
              <div class="web-content-top">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/toutiao.png"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">今日头条</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content">
                  你关心的,才是头条
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="_col-2 margin-row ">
          <div class="weihu">开发中...</div>
          <a href="javascript:void(0)">
            <div class="l_box not-pro">
              <div class="web-content-top">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/weibo.jpeg"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">新浪微博</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content">
                  微博带你欣赏世界上每一个精彩瞬间，了解每一个幕后故事。分享你想表达的，让全世界都能听到你的心声！
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>







    </div>

    <div class="container main-container view-list">
      <ul class="entry-list">
        <li v-for="item in postList">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row meta-row">
                <ul class="meta-list">
                  <li class="item post">{{ item.type }}</li>
                  <li class="item username clickable">{{ item.author }}</li>
                  <li class="item ">{{ item.age }}</li>
                  <li class="item tag">{{ item.types }}</li>
                </ul>
              </div>
              <div class="info-row title-row"><!----><!---->
                <span class="title">
                    {{ item.title }}
                  </span>
                <a @click="detail" class="content" target="_blank" v-bind:data-id="item.id">{{ item.content }}
                </a>
              </div>
            </div>
            <div v-if="item.img" class="lazy thumb thumb loaded"
                 :style="{'background-image': 'url(http://maopingshou.com:3002/images/'+ item.img+')'}">
            </div>
            <div v-else class="lazy thumb thumb loaded default_img"
                 :style="{'background-image': 'url(http://maopingshou.com:3002/images/default.jpg)',backgroundPosition: (item.img_x+' '+item.img_y)}">
            </div>
          </div>
          <!--</nuxt-link>-->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Headers from '~/components/pc-header/header'
  import axios from 'axios'

  export default {
    async fetch ({store, params}) {
      let res = await axios.get(`http://maopingshou.com:3002/list?start=10`)
      res.data.forEach((currentValue, index, array) => {
        res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
        res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
        res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
      })
      store.commit('SET_POSTLIST', res.data)
      //  分割
    },
    data () {
      return {
      }
    },
    components: {
      Headers
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .weihu
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    color #000
    font-size 1rem
    font-weight 800

  .margin-row
    position relative
    margin .5rem
    display inline-block

  .flew
    display flex
    justify-content flex-start

  .view-list
    margin-top 1rem
    min-height 5rem
    background-color #fff
    i
      margin-right .5rem
    .l_title
      padding 1rem
      border-radius 4px 4px 0 0
      color #101010
      padding-left 1.5rem
      font-size 1rem
      display flex
      align-items center

  .row
    padding 0 1rem 2rem
    .l_box
      padding 1rem
      border 1px solid #e4ecf3
      margin .3rem 0 0 0
      transition all 0.3s ease
      border-radius 5px
      .web-content-top
        display flex
        align-items center
        height 3rem

  .web-logo
    width 3rem
    height 3rem
    float left
    display flex
    align-items center
    justify-content center

  img
    max-height 100%
    max-width 100%

  span.web-name
    line-height 40px
    margin-left 10px
    color #3273dc
    word-wrap break-word

  .web-content-bottom
    display: -webkit-box
    -webkit-box-reflect vertical
    overflow hidden
    font-size 13px
    color #808080
    padding 10px 0 0 0

  a
    color #3273dc
    cursor pointer
    text-decoration none
    transition-duration 300ms
    transition-property background, border-bottom-color, color

  .l_box:hover
    transform translateY(-6px)
    box-shadow 0 26px 40px -24px rgba(0, 36, 100, 0.3)
    transition all 0.3s ease

  .web-content-bottom-content
    font-size .5rem
    height 2rem
    width 100%
    overflow: hidden
    line-height 1rem

  .not-pro
    background-color: #000
    opacity .3

  /*text-overflow:ellipsis*/
  /*white-space: nowrap*/
  /*word-break break-all*/
</style>
