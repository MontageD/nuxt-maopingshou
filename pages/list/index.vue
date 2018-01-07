<template>
  <div id="list">
    <pcHeader></pcHeader>
    <div class="container main-container view-list">
      <div class="l_title">
        <i class="material-icons">polymer</i>评论源
      </div>


      <div class="row flew">

        <div class="_col-3 margin-row">
          <a href="">
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
        <div class="_col-3 margin-row">
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

      </div>
    </div>
  </div>
</template>
<script>
  import pcHeader from '~/components/pc-header/header'

  export default {
    components: {
      pcHeader
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .margin-row
    margin .5rem
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
    padding 0 2rem 2rem
    .l_box
      padding 1rem
      background-color #ffffff
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
    /*text-overflow:ellipsis*/
    /*white-space: nowrap*/
    /*word-break break-all*/
</style>
