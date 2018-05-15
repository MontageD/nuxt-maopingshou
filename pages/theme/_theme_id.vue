<template>
  <div class="view-container">


    <keep-alive>
      <pcHeader></pcHeader>
    </keep-alive>


    <div v-if="send_art">
      <Articles v-on:increment="onback"></Articles>
    </div>
    <div v-else>
      <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
      <header class="header-theme">
        <div class="top-header"
             :style="{'background-image': 'url(http://data.maopingshou.com/images/theme/'+ themelist.c_img+')'}">
        </div>
        <div class="bottom-header">
          <div class="bottom-avator"
               :style="{'background-image': 'url(http://data.maopingshou.com/images/theme/'+ themelist.c_img+')'}"></div>
          <div class="header-title">{{themelist.c_title}}</div>
          <div class="header-content">{{themelist.c_content}}</div>
          <div v-if="userList===1" v-show="addshow">
            <button class="header-focus" @click="add_theme">✓</button>
          </div>
          <div v-if="userList===0" v-show="addshow">
            <button class="header-selected" @click="add_theme">+</button>

          </div>
          <!--<a href='javaScript:void(0);' class="header-focus" style="display: none">✓</a>-->
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

        <div class="theme-wrapper" ref="foodsWrapper">
          <div class="">
            <ul class="theme-ul">
              <li class="theme-li" v-for="(value,key) in themelist.aList">
                <div class="theme-li-content">{{value.title}}</div>
                <div class="theme-li-img">

                  <div v-if="themelist.c_news===1">
                    <img v-if="value.img" :src="`http://data.maopingshou.com/images/${value.img}`"
                         @click="clickImg($event)"/>
                  </div>
                  <div v-if="themelist.c_news===2">
                    <img v-if="value.img" :src="`http://data.maopingshou.com/images/news/${value.img}`"
                         @click="clickImg($event)"/>
                  </div>
                </div>
                <!--<div class="theme-li-bottom">-->
                <!--<span class="theme-zan"-->
                <!--:style="{'background-image': 'url(http://data.maopingshou.com/images/extra/like_1.png)'}">-->
                <!--<b>{{value.zan}}</b>-->
                <!--</span>-->
                <!--<span class="theme-comment"-->
                <!--:style="{'background-image': 'url(http://data.maopingshou.com/images/extra/share_message.png)'}">-->
                <!--<b></b>-->
                <!--</span>-->
                <!--&lt;!&ndash;<span class="theme-collection"></span>&ndash;&gt;-->
                <!---->
                <!--<span class="theme-share" style="float: right"-->
                <!--:style="{'background-image': 'url(http://data.maopingshou.com/images/extra/icon_ty-share.png)'}"></span>-->
                <!--</div>-->
              </li>
            </ul>
          </div>
          <div class="showText" v-show="showText">
            <p>话题暂时还有没有信息</p>
            <p> (°ー°〃)</p>
          </div>
        </div>


        <div class="entry-loading" @click="loadingData" v-show="!showText">
          <img src="~assets/img/Rolling.gif" v-show="showLoading">
          <span v-show="!showLoading" ref="showLoading">{{loadingText}}</span>
        </div>


        <!--<div class="send_article" @click="send_article">-->
        <!--<i class="material-icons">&#xE254;</i>-->
        <!--</div>-->
      </main>
    </div>
    <Alert v-show="Pshow" v-on:changePop="changePop"></Alert>
  </div>
</template>


<script type="text/ecmascript-6">
  import pcHeader from '~/components/pc-header/header'
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import BigImg from '~/base/BigImg'
  import Articles from '~/base/article'
  import Alert from '~/base/alert'

  export default {
    async fetch ({store, params, error}) {
      return store.dispatch('loadThemeDetail', params).catch(() => {
        error({statusCode: 404, message: '众里寻他 我已不再'})
      })
    },
    data () {
      return {
        menu: [
          {name: '精选', active: 'nav-item', model: 2}
          //          {name: '广场', active: 'nav-item active', model: 3}
        ],
        themeList: [],
        selectNUm: 10,
        showImg: false,
        imgSrc: '',
        showText: false,
        disabled: true,
        headerClass: '',
        userList: 0,
        addshow: false,
        pulldown: true,
        showLoading: false,
        goods: [],
        start: {
          'num': 1
        },
        send_art: false,
        Pshow: false,
        loadingText: ' 加载更多...'
      }
    },
    computed: mapGetters({
      themelist: 'option/getThemelist'
    }),
    methods: {
      onback () {
        this.send_art = false
      },
      changePop () {
        this.Pshow = false
      },
      send_article () {
        if (this.$cookie.get('uid')) {
          this.send_art = true
        } else {
          this.Pshow = !this.Pshow
        }
      },
      loadingData () {
        if (this.loadingText === '已经到底了') {

        } else {
          this.showLoading = !this.showLoading
          this.start.num = this.start.num + 1
          let obj = {
            'limit': this.start.num * 10,
            'theme_id': this.themelist.uid
          }
          let _this = this
          let len = this.themelist.aList.length
          this.$store.dispatch('loadThemeDetail2', obj).then(response => {
            console.log(response)
            if (len === response[0].aList.length) {
              _this.loadingText = '已经到底了'
            }
            _this.showLoading = !_this.showLoading
          })
        }
      },
      add_theme (e) {
        let _this = this
        let id = this.$cookie.get('uid')
        this.disabled = false
        if (e.currentTarget.getAttribute('class') === 'header-selected') {
          axios.get(`/theme/add?id=${id}&theme=${this.themelist.uid}`)
            .then((res) => {
              _this.disabled = true
            })
          e.currentTarget.setAttribute('class', 'header-focus')
          e.currentTarget.innerText = '✓'
        } else {
          axios.get(`/theme/remove?id=${id}&theme=${this.themelist.uid}`)
            .then((res) => {
              this.disabled = true
              //              _e.currentTarget.innerText = '✓'
            })
          e.currentTarget.setAttribute('class', 'header-selected')
          e.currentTarget.innerText = '+'
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
        this.showImg = true
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src
      },
      viewImg () {
        this.showImg = false
      }
    },
    mounted () {
      if (this.$cookie.get('uid')) {
        axios.get(`/api/getIdData?id=${this.$cookie.get('uid')}`)
          .then((res) => {
            let arr = res.data[0].theme.split('|')
            let pan = 0
            arr.forEach((value, key) => {
              if (parseInt(value) === parseInt(this.themelist.uid)) {
                pan = 1
              }
            })
            if (pan === 1) {
              this.userList = 1
            } else {
              this.userList = 0
            }
            this.addshow = true
          })
      }
      // 请求数据接受详细的新闻内容
      //      axios.get(`/theme/themeList?id=${this.$route.params.theme_id}&num=${this.selectNUm}`)
      //        .then((res) => {
      //          this.themeList = []
      //          res.data.forEach((currentValue, index, array) => {
      //            this.themeList[index] = Object.assign({}, res.data[index])
      //          })
      //          // 判断数据是否为空
      //          if (this.themeList[0].content === null) {
      //            this.themeList = []
      //            this.showText = !this.showText
      //          }
      //        })
    },
    components: {
      pcHeader,
      BigImg,
      Articles,
      Alert
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .send_article
    height 2.5rem
    width 2.5rem
    position fixed
    bottom .5rem
    right 1rem
    background-color #007fff
    border-radius 50%
    opacity .8
    box-shadow 0 0 8px 0 #333333
    color #fff
    display flex
    align-items center
    justify-content center
    i
      font-size 20px

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
      line-height 22px
      font-size 17px
      margin 11px 0
      margin-bottom 20px
    .theme-li-img
      width 100%
      padding-bottom 10px
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
      height 2.5rem
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
      a
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
    max-width 640px
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
      min-height 9rem
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
        box-shadow 0 0 5px rgba(178, 186, 194, .8)
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

  .entry-loading
    padding 1rem
    width 100%
    min-height 2rem
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    background-color #fff
    display flex
    align-items center
    text-align center
    font-size 1rem
    justify-content center
    font-weight 800
    cursor pointer
    img
      height 2rem
      width 2rem

</style>
