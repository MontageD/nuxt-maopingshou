<template>
  <main class="container main-container">
    <Search></Search>
    <div class="view timeline-index-view">
      <div class="timeline-entry-list">


        <div v-if="menuSelected!==4">
          <header class="list-header">
            <nav class="list-nav">
              <ul class="nav-list left">
                <li @click="getIndex(index)" :class="item.active" v-for="(item,index) in menu">
                  <a href="javaScript:void(0);">{{ item.name }}</a>
                  <div class="bottom-item"></div>
                </li>
              </ul>
            </nav>
          </header>
        </div>

        <!--我的关注-->
        <div v-if="menuSelected === 1">
          <Focus v-on:increment="changeTatol"></Focus>
        </div>
        <!--系统推荐-->
        <div v-else-if="menuSelected === 2">
          <!--<MenuList></MenuList>-->
          <!--<div class="show-time">-->
          <!--<div class="show-time-text" v-html="show_time_text"></div>-->
          <!--</div>-->
          <Recommend v-on:increment="changeTatol"></Recommend>
        </div>

        <!--热门信息-->
        <div v-else-if=" menuSelected===3">
          <Hoted v-on:increment="changeTatol"></Hoted>
        </div>


        <div v-else-if="menuSelected===4">
          <!--子元素响应时间-->
          <Comment :message="prosId" :type="type" v-on:increment="changeBack" v-on:alert="alert"></Comment>
        </div>


      </div>

      <aside class="index-aside aside" v-bind:style="asideStyle">
        <section>

        </section>
        <!--<section class="side_mood">-->
        <!--<p class="side_title">每日心情</p>-->
        <!--<img :src="everyImg">-->
        <!--<div class="clear"></div>-->
        <!--</section>-->

        <section class="side_hoting">
          <p class="side_title">热门标签</p>
          <div @click="shuffle">
            <transition-group name="cell" tag="ul" class="side_tag">
              <li v-for="cell in celles" :key="cell.id" class="cell">
                {{ cell.number }}
              </li>
            </transition-group>
          </div>
          <div class="clear"></div>
        </section>
        <section class="section user-section">
          <header class="user-section-header">你可能感兴趣的评论</header>
          <ul class="user-list">
            <li class="item" v-for="side in sideList">
              <router-link :to="`/detail/${side.id}`" class="link">
                <div
                  class="lazy avatar avatar loaded"
                  :style="{backgroundImage: 'url(https://maoping2.oss-cn-shenzhen.aliyuncs.com/'+ side.img+') '}"></div>
                <!--<div class="lazy avatar avatar loaded">-->

                <!--</div>-->
                <div class="user-info">
                  <div class="username">{{side.title}}</div>
                  <div class="position">{{side.content}}</div>
                </div>
              </router-link>
            </li>
          </ul>
        </section>


        <section class="follow-section">
          <header>关注我们</header>
          <ul class="account-list">
            <li class="item weibo">
              <a>
                <img src="~assets/img/bottom_weibo.png" alt="微博" class="icon">
              </a>
            </li>
            <li class="item wechat">
              <a>
                <img src="~assets/img/bottom_weixin.png" alt="微信" class="icon">
              </a>
            </li>
            <!--<li class="item zhihu"><a ><img src="https://gold-cdn.xitu.io/v3/static/img/zhuanlan.18265c6.png" alt="知乎" class="icon"></a>-->
            <!--</li>-->
            <!--<li class="item jianshu"><a ><img src="https://gold-cdn.xitu.io/v3/static/img/jianshu.80c1fdd.png" alt="简书" class="icon"></a>-->
            <!--</li>-->
          </ul>
          <ul class="more-list">
            <li class="item">
              <a target="_blank">关于</a>
              <a target="_blank">友情链接</a>
            </li>
            <li class="item"><a target="_blank">粤ICP备15044136号-2</a>
            </li>
          </ul>
        </section>


      </aside>


      <div class="bottom-record">

        <!--<span>关注我们</span>-->
        <!--<ul class="account-list">-->
        <!--<li class="item weibo">-->
        <!--<a>-->
        <!--<img src="~assets/img/bottom_weibo.png" alt="微博" class="icon">-->
        <!--</a>-->
        <!--</li>-->
        <!--<li class="item wechat">-->
        <!--<a>-->
        <!--<img src="~assets/img/bottom_weixin.png" alt="微信" class="icon">-->
        <!--</a>-->
        <!--</li>-->
        <!--</ul>-->
        <ul class="more-list">
          <li class="item">
            <a target="_blank">关于</a>
            <a target="_blank">友情链接</a>
          </li>
          <li class="item"><a target="_blank">粤ICP备15044136号-2</a>
          </li>
        </ul>


      </div>

    </div>

    <Alert v-show="Pshow" v-on:changePop="changePop"></Alert>
  </main>
</template>
<script>
  import Search from '~/components/search/search'
  import Recommend from '~/components/pc-main/recommend'
  import Focus from '~/components/pc-main/focus'
  import Hoted from '~/components/pc-main/hot'
  import Cross from '~/components/pc-main/detail/cross'
  import Weather from '~/components/pc-main/detail/weather'
  import MenuList from '~/components/pc-main/detail/menu'
  import Comment from '~/components/pc-main/detail/comment'
  import Alert from '~/base/alert'
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    created () {
    },
    computed: mapGetters({
      listInfo: 'option/getListInfo',
      celles: 'option/getCells',
      theme: 'option/getTheme',
      sideList: 'option/getsideList'
    }),
    data () {
      return {
        menu: [
          //          {name: '关注', active: 'nav-item ', model: 1},
          {name: '推荐', active: 'nav-item active', model: 2},
          {name: '热门', active: 'nav-item', model: 3}

        ],
        mainSelect: true,
        menuSelected: 2,
        showLoading: false,
        list: {},
        recommend: {},
        title: 'title',
        type: 1,
        userimg: {
          backgroundImage: 'url(https://avatars.githubusercontent.com/u/19252719?v=3)'
        },
        tagList: {},
        everyImg: 'https://data.maopingshou.com/images/extra/every_1.jpg',
        pageNum: 10,
        prosId: 0,
        show_time_text: '',
        day: [
          '疲倦的星期一，又来了',
          '继续耕耘的星期二。。',
          '这周过了一半，你好星期三',
          '星期四',
          '注意，今天就是星期五了',
          '假期你好，星期六',
          '很好，下周你好，星期日'],
        Pshow: false,
        asideStyle: {}
      }
    },
    methods: {
      changeTatol (id) {
        console.log('参数传活来')
        this.prosId = id
        this.menuSelected = 4
      },
      changePop () {
        this.Pshow = false
      },
      alert (id) {
        if (id === 1) {
          this.Pshow = true
        } else {
          this.Pshow = false
        }
      },
      changeBack () {
        this.menuSelected = 2
      },
      detail (e) {
        let uid = e.toElement.dataset.id
        this.$router.push({path: `/detail/${uid}`})
      },
      loadingData () {
        this.showLoading = !this.showLoading
        this.pageNum = this.pageNum + 10
        let PageNum = {
          'num': this.pageNum
        }
        this.$store.dispatch('loadListInfo', PageNum)
        this.showLoading = !this.showLoading
      },
      shuffle () {
        this.$store.commit('option/SET_CELLS', window._.shuffle(this.celles))
      },
      getIndex (index) {
        let _this = this
        _this.show = index
        this.menuSelected = index + 2

        this.menu.forEach((v, k) => {
          if (index === k) {
            _this.menu[k].active = 'nav-item active'
          } else {
            _this.menu[k].active = 'nav-item'
          }
        })
      }
    },
    mounted () {
      // 初始化日期
      this.show_time_text = this.day[new Date().getDay()]
      //      axios.get(`https://data.maopingshou.com/mainSide?start=5`)
      //        .then((res) => {
      //          this.sideList = res.data
      //        })
      const that = this
      window.onresize = () => {
        if (parseInt(document.body.clientWidth) > 910) {
          that.asideStyle = Object.assign({}, {
            right: parseInt(document.body.clientWidth) - 480 - 480 + 'px'
          })
        }
      }
    },
    components: {
      Search,
      Recommend,
      Focus,
      Hoted,
      Cross,
      Weather,
      MenuList,
      Comment,
      Alert
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .bottom-record
    display block
    .more-list
      display block
      padding-left 1rem
      li
        display block
        margin-bottom 1rem;
        a
          color #000
          font-size 1rem

  .show-time
    width 100%
    height 3rem
    padding 1rem
    text-align left
    background-color #fff
    border-top 1px solid rgba(178, 186, 194, .15)
    border-bottom 1px solid rgba(178, 186, 194, .15)
    display flex
    align-items center
    .show-time-text
      display flex
      align-items center
      font-size 15px
      font-weight 600

  .all-list
    position relative
    width 100%
    overflow hidden

  .user-action
    position absolute
    bottom 1rem
    display flex
    div
      display flex
      align-items center
      height 2rem
      width 4rem
      img
        height 1rem
        width 1rem
        display block
    .zan
      background-color #e8f3ff
      margin-right .5rem
    .cai
      margin 0 .5rem
      background-color #e8f3ff
    .comment
      margin 0 .5rem
      background-color #e8f3ff

  .follow-section
    background transparent
    text-align center
    color #909090
    box-shadow none
    overflow visible
    header
      font-size 1.1em
    .more-list
      margin .5rem 0
      li
        margin .5rem 0
    .account-list
      display flex
      justify-content center
      margin 1rem 0
      li
        margin 0 .3rem
        a
          height 24px
          width 24px
          display block
          img
            height 100%
            width 100%

  .timeline-index-view
    position relative
    width 100%

  .view-nav
    width: 100%
    position: fixed
    top: 4rem
    height: 2.833rem
    z-index: 100
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    transition: all .2s
    transform: translateZ(0)

  .view-nav, .view-nav:before
    left: 0
    background-color: #fff

  .view-nav
    .nav-list
      a
        color: #007fff

  .view-nav
    .nav-list
      .nav-item
        flex-shrink: 0
        font-size: .9rem
        padding: 0 1rem
        font-weight: 800

  .main-container
    > .view.thumb
      margin-top: 4.2rem
      width: 100%

  .user-action-nav
    display: flex
    align-items: center
    -webkit-box-align: center
    -webkit-box-pack: justify
    justify-content: space-between
    font-size: 1rem
    margin-right: 15.667rem
    background-color: #fff
    border-radius: 2px
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    .nav-list
      .avatar
        height: 50px
        width: 50px
        margin-right: 1.5rem
        border-radius: 2px 0 0 2px
      .nav-item
        padding: 0 1.5rem
        display: flex
        -webkit-box-align: center
        align-items: center
        position: relative
        cursor: pointer

  .nav-item
    position: relative
    cursor: pointer

  .nav-list
    position: relative

  .timeline-entry-list
    margin-top: 1rem
    margin-right: 15.667rem
    border-radius: 2px
    margin-bottom 3rem

  .list-header
    /*padding: 1.3rem 0*/
    height 2.6rem
    border-bottom: 1px solid hsla(0, 0%, 59%, .1)
    background-color #ffffff
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    overflow hidden
    .list-nav
      border-bottom 1px solid rgba(178, 186, 194, .15)
      display flex
      height 2.6rem
      .active
        color #007fff
        border-bottom 1px solid transparent
        position relative
        .bottom-item
          position absolute
          width 100%
          bottom -1px
          left 0
          background-color #007fff
          height 1px
          animation smallbig .5s
        a
          color #007fff
    .left
      .nav-item
        padding: 0 1.2rem
        font-size: 1rem
    .nav-list
      -webkit-box-align: center
      align-items: center
      line-height: 1px
      display flex
      height 100%
      width 100%
      li
        height 100%
        flex 1
        display flex
        align-content center
        justify-content center
        a
          height 100%
          width 100%
          line-height 2.6rem
          display flex
          align-content center
          justify-content center

  /*遍历内容*/
  .content-box
    position relative
    -webkit-box-align: center
    align-item: center
    padding: 1.5rem 2rem
    padding-bottom 3rem
    border-bottom 1px solid rgba(178, 186, 194, .15)
    align-items center

  /*color: #b2bac2*/

  /*右侧边栏*/
  .index-aside
    width: 15rem
    position: fixed !important
    top: 5rem !important
    left: 50%
    z-index: 1
    transform translate(100%, 0)

  .aside
    position: absolute
    top: 0
    right: 0

  .section
    background-color: #ffffff
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    border-radius: 2px
    margin-bottom: 1.3rem
    font-size: 1rem
    line-height: 1.29
    color: #333
    .user-section-header
      padding: 1rem 1.3rem
      border-bottom: 1px solid hsla(0, 0%, 59%, .1)
      font-size: 1rem
    .item
      padding: .5rem .8rem
      display: flex
      -webkit-box-align: center
      align-items: center
      cursor: pointer
      .link
        padding: .5rem .8rem
        display: flex
        -webkit-box-align: center
        align-items: center
        cursor: pointer
        text-overflow: ellipsis
        overflow: hidden
        .user-info
          overflow: hidden
        .username
          color: #333333
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          font-size .8rem
        .position
          color: #909090
          font-size: .6rem
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .avatar
          -webkit-box-flex: 0
          flex: 0 0 auto
          width: 2rem
          height: 2rem
          border-radius: 50%
          margin-right: .8rem
          background-size 100% 100%
    .banner
      height: 200px

  .banner
    position: relative
    font-size: 0
    cursor: pointer
    .banner-image
      width: 100%
      height: 100%

  @media (max-width: 480px)
    .thumb
      width 100%
      height 10rem
      margin-left 0

    .content-box
      display block

  .default_img
    background-size 558%

  .side_mood
    box-shadow 0 0px 4px 0 rgba(0, 0, 0, .05)
    margin-bottom 1rem
    img
      max-height 20rem

  .side_title
    text-align left
    min-height 2rem
    padding 0 1rem
    font-size .8rem
    background-color #fff
    display flex
    align-items center
    border-bottom 1px solid #f6f6f6

  .side_hoting
    box-shadow 0 0px 4px 0 rgba(0, 0, 0, .05)
    margin-bottom 1rem

  img
    width 100%

  .side_tag
    cursor pointer
    width 100%
    min-height 5rem
    background-color #fff
    padding .5rem
    li
      font-size .6rem
      display inline-block
      margin .3rem .2rem
      color #7e7e7e

  .cell-move
    transition: transform 2s;

  /*background-position: 3% 8%*/
  /*background-repeat: no-repeat*/
</style>
