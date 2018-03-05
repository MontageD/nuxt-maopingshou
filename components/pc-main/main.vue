<template>
  <main class="container main-container">
    <search></search>
    <div class="view timeline-index-view">
      <div class="timeline-entry-list">


        <header class="list-header">
          <nav class="list-nav">
            <ul class="nav-list left">
              <li class="nav-item " @click="getIndex(index)" :class="item.active" v-for="(item,index) in menu">
                <a href="javaScript:void(0);">{{ item.name }}</a>
              </li>
            </ul>
          </nav>


          <!--主题导航-->
          <div class="list-theme">
            <ul class="setting-list"
                v-touch:tap="tapHandler"
                v-touch:longtap="longtapHandler"
                v-touch:swipe.left="swipeLeftHandler"
                v-touch:swipe.right="swipeRightHandler">


              <li v-for="(value,key) in theme"
                  :style="{'background-image': 'url(http://data.maopingshou.com/images/theme/'+value.img+')'}">
                <p class="list-title">
                  {{value.title}}
                </p>
                <p class="list-btn">+</p>
                <div class="grey"></div>
              </li>


            </ul>

          </div>
          <!--主题导航-->


        </header>


        <transition
          name="custom-classes-transition"
          enter-active-class="animated tada">
          <ul class="entry-list" v-if="listInfo">
            <li v-for="item in listInfo">
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
                  <router-link :to="`/detail/${item.id}`" class="info-row title-row"><!----><!---->
                    <span class="title">
                    {{ item.title }}
                  </span>
                  </router-link>
                  <router-link :to="`/detail/${item.id}`" class="content" target="_blank" v-bind:data-id="item.id">
                    {{ item.content }}
                  </router-link>
                </div>
                <router-link :to="`/detail/${item.id}`" v-if="item.img" class="lazy thumb thumb loaded">
                  <i :style="{'background-image': 'url(http://data.maopingshou.com/images/'+ item.img+')'}"></i>
                </router-link>
                <router-link :to="`/detail/${item.id}`" v-else class="lazy thumb thumb loaded default_img"
                             :style="{'background-image': 'url(http://data.maopingshou.com/images/default.jpg)',backgroundPosition: (item.img_x+' '+item.img_y)}">
                </router-link>
                <!--<div class="lazy thumb thumb loaded"-->
                <!--:style="{'background-im.age': 'url(http://maopingshou.com:3002/images/'+ item.img+')'}"></div>-->
                <!--<div class="lazy thumb thumb loaded">-->
                <!--<img v-bind:src="'http://maopingshou.com:3000/images/'+item.comment_img"/>-->
                <!--</div>-->


                <!--<div class="user-action">-->
                <!--<div class="zan">-->

                <!--<img src="~assets/img/on.png"/>-->
                <!--</div>-->
                <!--<div class="cai">-->
                <!--<img src="~assets/img/up.png"/>-->
                <!--</div>-->
                <!--<div class="comment">-->

                <!--</div>-->
                <!--</div>-->

              </div>


              <!--</nuxt-link>-->
            </li>
          </ul>
        </transition>

        <div class="entry-loading" @click="loadingData">
          <img src="~assets/img/Rolling.gif" v-show="showLoading">
          <span v-show="!showLoading" ref="showLoading"> 加载更多...</span>

        </div>


      </div>

      <aside class="index-aside aside">
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
                  :style="{backgroundImage: 'url(http://data.maopingshou.com/images/'+ side.img+') '}"></div>
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
    </div>


  </main>
</template>
<script>
  import search from '~/components/search/search'
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    created () {
    },
    mounted () {
      axios.get(`http://data.maopingshou.com/mainSide?start=5`)
        .then((res) => {
          this.sideList = res.data
        })
      // 右侧滚动图片样式
      //      let _this = this
      //      setInterval(() => {
      //        let num = parseInt(Math.random() * 4) + 1
      //        _this.everyImg = 'http://maopingshou.com:3002/images/extra/every_' + num + '.jpg'
      //      }, 6000)
    },
    computed: mapGetters({
      listInfo: 'option/getListInfo',
      celles: 'option/getCells',
      theme: 'option/getTheme'
    }),
    data () {
      return {
        menu: [
          {name: '关注', active: 'nav-item '},
          {name: '推荐', active: 'nav-item active'},
          {name: '热门', active: 'nav-item'}
        ],
        showLoading: false,
        list: {},
        sideList: {},
        recommend: {},
        title: 'title',
        userimg: {
          backgroundImage: 'url(https://avatars.githubusercontent.com/u/19252719?v=3)'
        },
        tagList: {},
        everyImg: 'http://data.maopingshou.com/images/extra/every_1.jpg',
        pageNum: 10
      }
    },
    methods: {
      tapHandler () {
        console.log('tapHandler')
      },
      longtapHandler () {
        console.log('longtapHandler')
      },
      swipeLeftHandler () {
        console.log('swipeLeftHandler')
      },
      swipeRightHandler () {
        console.log('swipeRightHandler')
      },
      detail (e) {
        let uid = e.toElement.dataset.id
        this.$router.push({path: `/detail/${uid}`})
      },
      getIndex (index) {
        let _this = this
        _this.show = index
        this.menu.forEach((v, k) => {
          if (index === k) {
            _this.menu[k].active = 'nav-item active'
          } else {
            _this.menu[k].active = 'nav-item'
          }
        })
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
      }
    },
    components: {
      search
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
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
      .active
        a
          color: #007fff

  .view-nav
    .nav-list
      .nav-item
        flex-shrink: 0
        font-size: .9rem
        padding: 0 1rem
        font-weight: 800

  .nav-item
    &:hover
      transition all .5s
      color #007fff
      border-bottom 1px solid #007fff
      a
        color #007fff

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

  .list-header
    /*padding: 1.3rem 0*/
    height 9.6rem
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
        border-bottom 1px solid #007fff
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

  .info-box
    -webkit-box-flex: 1
    flex: 1 1 auto
    -webkit-box-orient: vertical
    justify-content center
    min-width: 0

  .meta-row
    font-size: .7rem
    color: #b2bac2
    .post
      color: #00ccad
      font-weight: 500

  .title-row
    margin: .5rem 0 .4rem
    wihte-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .title
    font-size: 1.2rem
    font-weight: 600
    line-height: 1.4rem
    color: #2e3135

  .meta-list
    display: flex
    -webkit-box-align: baseline
    align-items: baseline
    white-space: nowrap
    .item
      content: "\B7"
      margin: 0 .4em

  /*color: #b2bac2*/

  /*右侧边栏*/
  .index-aside
    width: 15rem
    position: absolute
    top: 0
    right: 0
    z-index: 1

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
    .banner
      height: 200px

  .banner
    position: relative
    font-size: 0
    cursor: pointer
    .banner-image
      width: 100%
      height: 100%

  .content
    font-size .9rem
    font-weight: 400
    display block
    line-height 1.2rem
    margin-top 3px
    cursor pointer
    max-height 2.3rem
    overflow: hidden

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

  .setting-list
    min-width 1000px
    li
      background-size cover
      background-repeat no-repeat
      background-position center
      border-radius 15px
      height 5rem
      width 5rem
      float left
      margin-right .3rem
      margin-left .3rem
      margin-top .7rem
      display inline-block
      border 1px solid #f1f1f1
      padding .5rem
      position relative
      margin-bottom 1rem
      .grey
        height 100%
        width 100%
        background-color rgba(0, 0, 0, .4)
        border-radius 15px
        position absolute
        left 0
        top 0
        z-index 1
      .list-title
        font-weight 600
        color #fff
        height 1rem
        position relative
        z-index 10
      .list-btn
        position absolute
        width 2.8rem
        left 50%
        transform translate(-50%, 0)
        height 1rem
        background-color #007fff
        color #fff
        bottom .3rem
        text-align center
        font-size 14px
        display flex
        align-items center
        justify-content center
        z-index 8
        border-radius 3px
        font-weight 600
        cursor pointer

  /*background-position: 3% 8%*/
  /*background-repeat: no-repeat*/
</style>
