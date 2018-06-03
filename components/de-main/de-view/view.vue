<template>
  <div id="view">


    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div v-if="detailList" v-for="item in detailList" class="column-view">
        <div class="container entry-view">
          <a class="post-author clearfix"
          >
            <div
              class="lazy avatar avatar loaded"
              :style="{'background-image': 'url('+imgUrl+'/'+item.img+')'}"></div>
            <div class="author-info float-left">
              <div class="author-name text-pointer">{{item.author}}</div>
              <div class="author-meta">{{item.time}}<!----></div>
            </div>
            <div class="view_tag" @click="tagclick">
              <i class="material-icons" ref="tags">&#xE8D2;</i>
              <div class="v_menu">
                <transition name="slide-fade">
                  <ul class="menu" v-if="menu_show">
                    <li>{{item.type}}</li>
                  </ul>
                </transition>
              </div>
            </div>
          </a>
        </div>
        <div class="container entry-view fb-content">
          <div class="view-title">{{item.title}}

            <div class="clear"></div>
          </div>


          <ul class="view-comment" ref="comment" v-if="item.aList.length !== 0 && view_show">
            <li v-for="its in item.aList">
              <span class="author">{{its.author}}</span>
              <span class="ling">:</span>
              <span v-html="its.content"></span>
            </li>


            <div class="view-open" @click="changeComment">
              <img src="https://maoping2.oss-cn-shenzhen.aliyuncs.com/icon/narrow.png"/>
            </div>
          </ul>


          <ul class="view-comment no-data" v-else>
            <div class="view-open" @click="changeComment">
              <img src="https://maoping2.oss-cn-shenzhen.aliyuncs.com/icon/narrow.png"/>
            </div>
            肥肠抱歉，没有找到你要的评论 T_T
          </ul>
          <div v-if="item.img">
            <div class="view-img">
              <img :src="`${imgUrl}/${item.img}`">
            </div>
          </div>

          <div class="view-content" v-html="item.content">
            <!--{{ item.content }}-->
          </div>


        </div>
        <!--<div class="view-like">-->
        <!--<div class="view-like-left">-->
        <!--<div class="view-like-list">-->
        <!--<p><i v-bind:class="zanClassName" ref="zan" @click='zan'-->
        <!--:style="{ 'background-image': 'url(https://data.maopingshou.com/images/extra/web_heart_animation.png)' }"></i>-->
        <!--</p>-->
        <!--<p>喜欢 <i class="view-like-num"></i></p>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="view-like-right">-->
        <!--<div class="view-like-list">-->
        <!--<p class="share_list" @click="ask_friend">-->
        <!--<i class="material-icons">&#xE80D;</i>-->
        <!--</p>-->
        <!--<p>评论</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->


        <transition
          name="custom-classes-transition"
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <div class="ask_friend" ref="askF" v-show="show">
            <div class="askF">
              <a class="ask_link">
                <img src="~assets/img/link.png"/>
              </a>
              <a class="ask_weibo">
                <img src="~assets/img/weibos_link.png"/>
              </a>
              <a class="ask_weixin">
                <img src="~assets/img/weixin_links.png"/>
              </a>
            </div>


          </div>
        </transition>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="view-comm" v-show="showBottom">
        <p class="view-comm-title">猜你喜欢</p>
        <div class="" ref="wrapper">
          <div class="view-comm-ul after-in view-ul" ref="view_ul">
            <div class="view-comm-li" v-for="like in likeInfo">
              <router-link :to="{path: '/detail/' + like.id}">
                <div class="view-comm-ul-img" @click='detail_link'
                     :style="{ 'background-image': 'url('+ imgUrl + '/' + like.img + ')' }">
                </div>
                <div class="view-comm-content">
              <span class="view-comm-content-detail after-in">
                <span class="view-comm-content-detail-title">{{ like.title }}</span>
                <!--<span class="view-comm-content-detail-details">详情</span>-->
                </span>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!--<div class="view-navigation">-->
        <!--<div class="view-navigation-left" @click="nav_left"><i class="material-icons">&#xE5CB;</i></div>-->
        <!--<div class="view-navigation-center" @click="nav_center"><i class="material-icons">&#xE5D3;</i></div>-->
        <!--<div class="view-navigation-right" @click="nav_right"><i class="material-icons">&#xE5CC;</i></div>-->
        <!--</div>-->
        <!--<p class>热点文章</p>-->

        <div class="clear"></div>

      </div>

    </transition>


  </div>
</template>
<script>
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import axios from 'axios'
  import backgroundUrl from '~/assets/img/web_heart_animation.png'
  import 'swiper/dist/css/swiper.css'
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        info: {},
        likeInfo: {},
        backgroundUrl,
        menu_show: true,
        zanClassName: 'view-like-icon heart',
        askF: 'none',
        show: false,
        showBottom: false,
        view_show: true,
        imgUrl: process.env.imgUrl,
      }
    },
    components: {},
    created () {
      /// 推荐你喜欢的文章
      axios.get(`/api/likeInfo?start=5`)
        .then((res) => {
          res.data.forEach((currentValue, index, array) => {
            res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
            res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
            res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
          })
          this.showBottom = !this.showBottom
          this.likeInfo = res.data
        })
    },
    mounted () {
      setTimeout(() => {
        const options = {
          scrollY: false, // 因为scrollY默认为true，其实可以省略
          scrollX: true,
          click: true,
          taps: true,
          bounce: true,
          momentum: true
        }
        this.scroll = new BScroll(this.$refs.wrapper, options)
      }, 20)
    },
    computed: {
      ...mapGetters({
        detailList: 'article/getDetailList'
      }),
      _getPosAndScale () {
        const x = 10
        const y = 10
        const scale = 0.13333
        return {
          x: x,
          y: y,
          scale: scale
        }
      }
    },
    methods: {
      changeComment () {
        this.view_show = !this.view_show
      },
      ask_friend () {
        //        this.show = !this.show
        //        if (!this.$refs.askF[0].style.left || this.$refs.askF[0].style.display === 'none') {
        //          this.askF = 'flex'
        //          this.$refs.askF[0].style.display = 'flex'
        //        } else {
        //          this.askF = 'none'
        //          this.$refs.askF[0].style.display = 'none'
        //        }
      },
      detail_link (e) {
      },
      zan (e) {
        if (this.$refs.zan[0].className === 'view-like-icon heart heartAnimation') {
          this.zanClassName = 'view-like-icon heart heartAnimation2'
          // 点赞
          // let _this = this
          let like = this.info[0].like
          let id = this.info[0].id
          axios.get(`https://data.maopingshou.com/zanLike?like=${like}&id=${id}`)
            .then(function (res) {
            })
        } else {
          // 不点赞
          this.zanClassName = 'view-like-icon heart heartAnimation'
        }
      },
      nav_left () {
        this.$refs.view_ul.style.transform = `translate(0,0)`
      },
      nav_center () {
        this.$refs.view_ul.style.transform = `translate(-15rem,0)`
      },
      nav_right () {
        this.$refs.view_ul.style.transform = `translate(-45rem,0)`
      },
      tagclick () {
        //        this.$refs.tag.style.transition = 'all 0.4s'
        if (this.$refs.tags[0].style.transform) {
          this.$refs.tags[0].style.transform = ``
          this.menu_show = !this.menu_show
        } else {
          this.$refs.tags[0].style.transform = `rotate(90deg)`
          this.menu_show = !this.menu_show
        }
        //        this.$refs.tag.style.transform = `10px,10px,0.133`
      },
      ...mapMutations({
        setOrderId: 'SET_ORDERID',
        setDetailList: 'SET_DETAILIST'
      }),
      ...mapActions(
        ['insertOrderId', 'insertDetaiList']
      )
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

  .ask_friend
    bottom 0
    background rgba(0, 0, 0, .8)
    width 100%
    height 3rem

    border-bottom 1px solid #eee
    border-left 1px solid #eee
    border-right 1px solid #eee
    transition all 0.5s
    .askF
      width 100%
      height 100%
      display flex
      justify-content center
      align-items center
      a
        height 1.5rem
        width 1.5rem
        margin 0 1rem
        img
          width 100%
          height 100%

  .view-like
    width 100%
    height 9rem
    border-top 1px solid #eeeeee
    border-bottom 1px solid #eeeeee
    display flex
    align-items center
    justify-content center
    > div
      display flex
      justify-content center
      align-items center
      .view-like-list
        .view-like-icon
          height 2rem
          width 5rem
        p
          display flex
          justify-content center
          margin 1rem 0
          i
            font-size 2rem
    .view-like-right
      width 50%
      height 100%

    .view-like-left
      display flex
      align-items center
      justify-content center
      margin 0 auto
      height 100%

  .view-navigation
    width 100%
    display flex
    justify-content center
    align-items center
    margin-top 1rem
    .view-navigation-center
      width 3rem
      height 100%
    .view-navigation-left
      width 3rem
      height 100%
    .view-navigation-right
      width 3rem
      height 100%

  .view-comm
    min-height 18rem
    max-width 700px
    background-color #fff
    margin-top 1.767rem
    overflow hidden
    margin-bottom 1.767rem
    padding-bottom 1rem
    .view-comm-ul
      transition all 0.5s
      display flex
      justify-content flex-start
      position relative
      left 0
      background transparent
      padding 0 1rem
      width 75rem
      .view-comm-li
        width 15rem
        min-height 150px
        background #fff
        box-shadow 0 10px 40px -7px rgba(0, 64, 128, .2)
        margin-right 1rem
        border-radius 5px
        float left
        .view-comm-ul-img
          height 7.5rem
          width 100%
          background-size 100%
          background-position center
        .view-comm-content
          display flex
          align-items center
          height 2rem
          .view-comm-content-detail
            width 100%
            display flex
            justify-content space-between
            .view-comm-content-detail-title
              height 1rem
              line-height 1rem
              overflow hidden
              font-size .8rem
              width 80%
            .view-comm-content-detail-details
              display flex
              align-items center
              justify-content center
              width 20%
              text-align center

    .view-comm-title
      padding 1.767rem
      font-size 1.1111rem
      font-weight 800

  .no-data
    text-align center

  .slide-fade-enter-active
    transition: all .3s ease

  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(10px)
    opacity: 0

  .view_tag
    position absolute
    right 0
    top 50%
    height 2em
    width 2em
    border-radius 3px
    transition all .4s
    box-shadow 0 0px 13px rgba(0, 64, 128, .2)
    .v_menu
      position relative
      .menu
        position absolute
        top -2em
        right 2em
        li
          min-width: 5rem
          height 2em
          line-height 1.6em
          text-align center
          color #1c94e0
          font-weight 800

  /*.tag:hover*/
  /*transform tr*/
  .small-comment
    animation become-small 1s

  .big-comment
    animation become-big 1s

  .view-comment
    transition all 1s
    border 1px dashed #909090
    padding 1rem
    position relative
    overflow hidden
    .view-open
      cursor pointer
      height 30px
      width 30px
      position absolute
      right 0
      top 0
      border-radius 50%
      display flex
      align-items center
      justify-content center
      background-color #fff
      img
        height 60%
        width 60%
    li
      width 100%
      font-size 1rem
      line-height 2rem
      word-break break-all
      .author
        color dodgerblue
        font-size 14px
      .ling
        padding 0 5px
      span
        font-size 13px

  .fb-content:before
    clear both

  .fb-content
    margin-top 1rem
    .view-content
      padding 1rem
    .view-title
      /*height 3rem*/
      width 100%
      text-align center
      font-size 1.2rem
      line-height 2rem
      margin-bottom 1rem
    .view-img
      /*min-height 1rem*/
      border-radius 1px
      max-width 100%
      background-repeat no-repeat
      min-height: 10rem
      display block
      margin 0 auto
      margin-top 1rem
      img
        max-width 100%
        display block
        margin 0 auto
        border-radius 8px
        box-shadow 0 0 30px #ccc

  .view-content
    padding 1rem
    line-height 1.6rem
    font-size 1rem
    letter-spacing 3px
    p
      text-align left
      word-break break-all
      word-wrap break-word
      font-size 1rem
      margin-bottom 1em
      line-height 2em
      text-indent 2em

  .column-view
    max-width 700px
    /*min-width 700px*/
    min-height 300px
    background-color #fff
    margin-top 1.767rem
    .author-info
      height 3em
      margin-left 1em
      .author-name
        height 50%
        display flex
        align-items center
        font-size 1rem
        font-weight 700
        color #333
      .author-meta
        height 50%
        display flex
        align-items center
        color #909090
        font-size .6rem
    .post-author
      position relative
      padding-top 20px
      display flex
      align-items center
      -webkit-box-align center
      .avatar
        height 3em
        width 3em
        background-position 50%
        background-size cover
        border-radius 50%
    .columen-view-main
      max-width 700px
      border 0 24px
      box-sizing border-box
    .entry-view
      position relative
      max-width 700px
      padding 0 24px
      box-sizing border-box

  @media (max-width: 992px)
    .fb-content
      .view-title
        padding 0 1rem

    .entry-view
      padding 0 !important

    .view-img
      padding 1rem !important

    .view-comment
      margin 1rem !important

    .column-view
      max-width 100% !important
      .post-author
        margin 0 1rem

  /*.lazy*/
  /*opacity 0*/
  /*pointer-events none*/
  /*.lazy:before*/
  /*content ""*/
  /*position absolute*/
  /*left 0*/
  /*top 0*/
  /*background-color inherit*/

  .avatar
    display inline-block
    background-repeat no-repeat
    background-color #eee

  .view
    margin-top 1.767rem

  /*background-color #fff*/
</style>
