<template>
  <div class="view-container">
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>


    <keep-alive>
      <pcHeader></pcHeader>
    </keep-alive>

    <header class="header-theme">
      <div class="top-header"
           :style="{'background-image': 'url(http://data.maopingshou.com/images/theme/'+ themelist.c_img+')'}">
      </div>
      <div class="bottom-header">
        <div class="bottom-avator"
             :style="{'background-image': 'url(http://data.maopingshou.com/images/theme/'+ themelist.c_img+')'}"></div>
        <div class="header-title">{{themelist.c_title}}</div>
        <div class="header-content">{{themelist.c_content}}</div>
        <a href='javaScript:void(0);' class="header-focus" @click="add_theme">+</a>
        <a href='javaScript:void(0);' class="header-focus" style="display: none">✓</a>
      </div>
    </header>


    <main class="theme-main">
      <nav class="theme-nav">

        <div @click="getIndex(index)" :class="item.active" v-for="(item,index) in menu">
          <a href="javaScript:void(0);">{{ item.name }}</a>
          <div class="bottom-item"></div>
        </div>
        <!--<div class="theme-select" @click="getIndex(index)" >-->
        <!--<a class="active">-->
        <!--精选-->
        <!--</a>-->
        <!--</div>-->
        <!--<div class="theme-square" @click="getIndex(index)" >-->
        <!--<a>-->
        <!--广场-->
        <!--</a>-->
        <!--</div>-->
      </nav>


      <div class="theme-wrapper" ref="wrapper">
        <div class="theme-ul">
          <div class="theme-li" v-for="(value,key) in themeList">
            <div class="theme-li-content">{{value.title}}</div>
            <div class="theme-li-img">

              <img v-if="value.img" :src="`http://data.maopingshou.com/images/${value.img}`" @click="clickImg($event)"/>


            </div>
            <div class="theme-li-bottom">
              <span class="theme-zan"
                    :style="{'background-image': 'url(http://data.maopingshou.com/images/extra/like_1.png)'}">
                  <b>{{value.zan}}</b>
              </span>
              <span class="theme-comment"
                    :style="{'background-image': 'url(http://data.maopingshou.com/images/extra/share_message.png)'}">
                <b>1</b>
              </span>
              <!--<span class="theme-collection"></span>-->

              <span class="theme-share" style="float: right"
                    :style="{'background-image': 'url(http://data.maopingshou.com/images/extra/icon_ty-share.png)'}"></span>
            </div>
          </div>
        </div>

        <div class="showText" v-show="showText">
          <p>话题暂时还有没有信息</p>
          <p> (°ー°〃)</p>
        </div>
      </div>


    </main>
  </div>
</template>


<script type="text/ecmascript-6">
  import pcHeader from '~/components/pc-header/header'
  import { mapGetters } from 'vuex'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import BigImg from '~/base/BigImg'

  export default {
    async fetch ({store, params, error}) {
      return store.dispatch('loadThemeDetail', params).catch(() => {
        error({statusCode: 404, message: '众里寻他 我已不再'})
      })
    },
    data () {
      return {
        menu: [
          {name: '精选', active: 'nav-item active', model: 2}
          //          {name: '广场', active: 'nav-item', model: 3}
        ],
        themeList: [],
        selectNUm: 10,
        showImg: false,
        imgSrc: '',
        showText: false
      }
    },
    computed: mapGetters({
      themelist: 'option/getThemelist'
    }),
    methods: {
      add_theme (e) {
        console.log()
        if (e.currentTarget.getAttribute('class') === 'header-focus') {
          console.log('添加主题')
          e.currentTarget.setAttribute('class', 'header-selected')
        } else {
          console.log('删除主题')
          e.currentTarget.setAttribute('class', 'header-focus')
        }
      },
      getIndex (index) {
        let _this = this
        _this.show = index
        this.menuSelected = index + 1
        this.menu.forEach((v, k) => {
          if (index === k) {
            _this.menu[k].active = 'nav-item active'
          } else {
            _this.menu[k].active = 'nav-item'
          }
        })
      },
      clickImg (e) {
        console.log('点击图片')
        this.showImg = true
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src
      },
      viewImg () {
        this.showImg = false
      }
    },
    mounted () {
      setTimeout(() => {
        const options = {
          scrollY: true, // 因为scrollY默认为true，其实可以省略
          scrollX: false,
          click: true,
          taps: true,
          bounce: true,
          momentum: true
        }
        this.scroll = new BScroll(this.$refs.wrapper, options)
      }, 20)

      // 请求数据接受详细的新闻内容
      axios.get(`/theme/themeList?id=${this.$route.params.theme_id}&num=${this.selectNUm}`)
        .then((res) => {
          this.themeList = []
          res.data.forEach((currentValue, index, array) => {
            this.themeList[index] = Object.assign({}, res.data[index])
          })
          // 判断数据是否为空
          if (this.themeList[0].content === null) {
            this.themeList = []
            this.showText = !this.showText
          }
        })
    },
    components: {
      pcHeader,
      BigImg
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .showText
    display block
    margin 0 auto
    font-size 16px
    text-align center
    p
      font-weight 600
      height 2rem
      line-height 2rem

  .theme-ul
    background-color transparent
    .theme-li
      margin-bottom 1rem
      padding 12px
      background-color #fff
    .theme-li-bottom
      span
        background-size cover
        background-repeat no-repeat
        background-position center
        height 1.2rem
        width 1.2rem
        position relative
        display inline-block
      b
        position absolute
        right -1rem
        top 50%
        transform translate(0, -50%)
      .theme-zan
        margin-right 2rem
    .theme-li-content
      font-size 14px
      margin 11px 0
    .theme-li-img
      width 100%
      padding-bottom 10px
      margin-bottom 8px
      border-bottom 1px solid rgba(0, 64, 128, .1)
      img
        height 10rem
        max-width 100%

  .theme-main
    position relative
    display block
    margin 1rem auto
    max-width 640px
    background-color transparent

    .theme-nav
      height 2rem
      display flex
      justify-content center
      border-bottom 1px solid rgba(0, 64, 128, .1)
      margin 0
      margin-bottom 1rem
      background-color #fff
      .nav-item
        flex 1
        padding: 0 1.5rem
        display: flex
        -webkit-box-align: center
        align-items: center
        position: relative
        cursor: pointer
        justify-content center
        font-size 14px
      .active
        color #007fff
        border-bottom 1px solid transparent
        position relative
        a
          color #007fff
        .bottom-item
          position absolute
          width 100%
          bottom -1px
          left 0
          background-color #007fff
          height 1px
          animation smallbig .5s

  .header-theme:after, .header-theme:before
    content " "
    display table

  .header-theme:after
    clear both

  .bottom-header:after, .header-theme:before
    content " "
    display table

  .bottom-header:after
    clear both

  .header-theme
    position relative
    display block
    margin 1rem auto
    max-width 960px
    min-height 15rem
    .top-header
      background-repeat no-repeat
      background-size cover
      background-repeat no-repeat
      background-position center
      background-color #fff
      filter: blur(15px)
      height 5rem
      width 100%
    .bottom-header
      background-color #fff
      width 100%
      position relative
      .header-selected
        font-weight 600
        line-height 1.7rem
        text-align center
        font-size 1.3rem
        position relative
        display block
        width 5rem
        height 1.8rem
        background-color 1px solid rgba(178, 186, 194, .15)
        top 4rem
        border-radius 5px
        margin 0 auto
        margin-bottom 5rem
        color #000
        box-shadow  0 0 5px rgba(178, 186, 194, .8)
        outline none
      .header-focus
        font-weight 600
        line-height 1.7rem
        text-align center
        font-size 1.3rem
        position relative
        display block
        width 5rem
        height 1.8rem
        background-color rgba(0, 127, 255, .8)
        color #fff
        top 4rem
        border-radius 5px
        margin 0 auto
        margin-bottom 5rem
        outline none
      .header-content
        line-height 1rem
        position relative
        display block
        margin .3rem 0
        padding 0 10px
        text-align center
        top 3rem
      .header-title
        top 2.3rem
        position relative
        display block
        margin-top 1rem
        text-align center
        font-size 17px
        font-weight 600
      .bottom-avator
        height 6rem
        width 6rem
        background-repeat no-repeat
        background-size cover
        background-repeat no-repeat
        background-position center
        position absolute
        left 50%
        top -4.5rem
        border-radius 5px
        transform translate(-50%, 0)
        box-shadow 0 1px 40px 4px rgba(0, 64, 128, .2)


</style>
