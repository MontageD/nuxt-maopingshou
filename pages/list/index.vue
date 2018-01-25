<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>
    <div class="container main-container view-list" v-if="true">

      <div class="l_title">
        <i class="material-icons">polymer</i>评论源
      </div>


      <div class="row ">

        <div class="_col-2 margin-row">
          <a href="javascript:void(0)">
            <div class="l_box">
              <div class="web-content-top" data-id="煎蛋网" @click="add_news($event)">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/jiandan.jpg"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">煎蛋网</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content" data-id="煎蛋网" @click="add_news($event)">
                  煎蛋以译介方式传播网络新鲜资讯
                </div>
              </div>
            </div>
          </a>
        </div>


        <div class="_col-2 margin-row">
          <a href="javascript:void(0)">
            <div class="l_box">
              <div class="web-content-top" data-id="网易新闻" @click="add_news($event)">
                <div class="web-logo">
                  <img class="img-responsive" src="~assets/img/wangyi.png"
                       data-bd-imgshare-binded="1">
                </div>
                <span class="web-name">网易新闻</span>
              </div>
              <div class="web-content-bottom">
                <div class="dot web-content-bottom-content" data-id="网易新闻" @click="add_news($event)">
                  新闻,新闻中心,包含有时政新闻,国内新闻,国际新闻,社会新闻,时事评论,新闻图片,新闻专题,新闻论坛,军事,历史,的专业时事报道门户网站
                </div>
              </div>
            </div>
          </a>
        </div>


        <!--<div class="_col-2 margin-row ">-->
        <!--<div class="weihu">开发中...</div>-->
        <!--<a href="javascript:void(0)">-->
        <!--<div class="l_box not-pro">-->
        <!--<div class="web-content-top">-->
        <!--<div class="web-logo">-->
        <!--<img class="img-responsive" src="~assets/img/zhihu_1.jpg"-->
        <!--data-bd-imgshare-binded="1">-->
        <!--</div>-->
        <!--<span class="web-name">知乎</span>-->
        <!--</div>-->
        <!--<div class="web-content-bottom">-->
        <!--<div class="dot web-content-bottom-content">-->
        <!--发现更大的世界-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</a>-->
        <!--</div>-->


        <!--<div class="_col-2 margin-row ">-->
        <!--<div class="weihu">开发中...</div>-->
        <!--<a href="javascript:void(0)">-->
        <!--<div class="l_box not-pro">-->
        <!--<div class="web-content-top">-->
        <!--<div class="web-logo">-->
        <!--<img class="img-responsive" src="~assets/img/toutiao.png"-->
        <!--data-bd-imgshare-binded="1">-->
        <!--</div>-->
        <!--<span class="web-name">今日头条</span>-->
        <!--</div>-->
        <!--<div class="web-content-bottom">-->
        <!--<div class="dot web-content-bottom-content">-->
        <!--你关心的,才是头条-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</a>-->
        <!--</div>-->
        <!--<div class="_col-2 margin-row ">-->
        <!--<div class="weihu">开发中...</div>-->
        <!--<a href="javascript:void(0)">-->
        <!--<div class="l_box not-pro">-->
        <!--<div class="web-content-top">-->
        <!--<div class="web-logo">-->
        <!--<img class="img-responsive" src="~assets/img/weibo.jpeg"-->
        <!--data-bd-imgshare-binded="1">-->
        <!--</div>-->
        <!--<span class="web-name">新浪微博</span>-->
        <!--</div>-->
        <!--<div class="web-content-bottom">-->
        <!--<div class="dot web-content-bottom-content">-->
        <!--微博带你欣赏世界上每一个精彩瞬间，了解每一个幕后故事。分享你想表达的，让全世界都能听到你的心声！-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</a>-->
        <!--</div>-->
      </div>


    </div>


    <div class="container main-container view-list">
      <div class="search-loading" v-show="showLoading">

        <div class="lds-css ng-scope">
          <div style="width:100%;height:100%" class="lds-rolling">
            <div></div>
          </div>
        </div>
        <!--<img src="~assets/img/Rolling.gif"/>-->
        <!--<img src="/assets/img/Rolling.gif"/>-->
      </div>
      <ul class="entry-list" v-show="!showLoading">
        <li v-for="item in info">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row meta-row">
                <ul class="meta-list" >
                  <li class="item post"  v-if="item.avatar!==`没有头像`" :style="{'background-image': 'url('+ item.avatar+')'}">{{ item.type }}</li>


                  <li class="item username clickable">{{ item.author }}</li>
                  <li class="item ">{{ item.age }}</li>
                  <li class="item tag">{{ item.types }}</li>
                </ul>
              </div>

              <div class="info-row title-row"><!----><!---->
                <span class="title">
          {{ item.order_id }}
          </span>
                <a @click="detail" class="content" target="_blank" v-bind:data-id="item.id">{{ item.content }}
                </a>
              </div>
            </div>
            <div v-if="item.img" class="lazy thumb thumb loaded"
                 :style="{'background-image': 'url(http://data.maopingshou.com/images/'+ item.img+')'}">
            </div>
            <!--<div v-else class="lazy thumb thumb loaded default_img" :style="{'background-image': 'url(http://data.maopingshou.com/images/default.jpg)',backgroundPosition: (item.img_x+' '+item.img_y)}">-->
            <!--</div>-->
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
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        info: [],
        showLoading: false
      }
    },
    computed: {
      ...mapGetters([
        'postList'
      ])
    },
    methods: {
      detail (e) {
        let uid = e.toElement.dataset.id
        //        window.open(`/detail/${uid}`)
        this.$router.push({path: `/detail/${uid}`})
      },
      add_news (e) {
        console.log(e.target.getAttribute('data-id'))
        if (e.target.getAttribute('data-id')) {
          let name = e.target.getAttribute('data-id')
          let num = 10
          let _this = this
          this.showLoading = !this.showLoading
          axios.get(`http://data.maopingshou.com/news?type=${name}&num=${num}`)
            .then(function (res) {
              res.data.forEach((currentValue, index, array) => {
                res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
                res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
                res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
              })
              _this.info = res.data
              setTimeout(() => {
                _this.showLoading = !_this.showLoading
              }, 2000)
            })
        }
      }
    },
    components: {
      Headers
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .search-loading
    position absolute
    top 0
    left 50%
    transform translate(-50%, 0)
    height 5rem
    width 5rem
    background-color rgba(0, 0, 0, .4)
    border-radius 5px
    background-repeat no-repeat
    background-position center
    background-size 100%

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

  /*a*/
  /*color #3273dc*/
  /*cursor pointer*/
  /*text-decoration none*/
  /*transition-duration 300ms*/
  /*transition-property background, border-bottom-color, color*/

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

  .entry-list
    background-color #ffffff
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)

  .entry-loading
    padding 1rem
    width 100%
    min-height 2rem
    margin-top 1rem
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    background-color #fff
    display flex
    align-items center
    text-align center
    font-size 1rem
    justify-content center
    font-weight 800
    cursor pointer
    font-weight 800
    img
      height 1rem
      width 1rem

  /*遍历内容*/
  .content-box
    -webkit-box-align: center
    align-item: center
    padding: 1.5rem 2rem
    border-bottom 1px solid rgba(178, 186, 194, .15)
    align-items center

  .meta-list
    display: flex
    -webkit-box-align: baseline
    align-items: center
    white-space: nowrap
    margin-bottom .5rem
    height 2rem
    .post
      height 2rem
      width 2rem
      border-radius 50%
      background-repeat no-repeat
      background-size 100%
      background-position center
    .item
      content: "\B7"
      margin: 0 .4em

  .meta-row
    font-size: .7rem
    color: #b2bac2
    .post
      color: #00ccad
      font-weight: 500

  .title
    font-size: 1.2rem
    font-weight: 600
    line-height: 1.4rem
    color: #2e3135


  .content
    font-size .9rem
    font-weight: 400
    display block
    line-height 1.5rem
    margin-top 5px
    cursor pointer
    overflow hidden
    max-height 3.3rem


  .thumb
    flex: 0 0 auto
    width: 5rem
    height: 5rem
    margin-left: 2rem
    background-color: transparent
    background-size: cover
    background-position: 50%
    background-repeat: no-repeat
    cursor pointer
    box-shadow 0px 10px 60px 4px rgba(0, 64, 128, .2)
    border-radius 8px
    i
      transition: all .5s;
      display block
      height 100%
      width 100%
      background-size: cover
      background-position: 50%
      background-repeat: no-repeat

  .thumb
    i:hover
      transform rotate(10deg);

</style>
