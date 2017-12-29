<template>
  <main class="container main-container">
    <search></search>
    <div class="view timeline-index-view">
      <div class="timeline-entry-list">
        <header class="list-header">
          <nav class="list-nav">
            <ul class="nav-list left">
              <li class="nav-item active">
                <a href="">热门</a>
              </li>
              <!--<li class="nav-item">-->
              <!--<a href="">最新</a>-->
              <!--</li>-->
            </ul>
            <!--<ul class="nav-right right">-->
            <!--<li class="nav-item">-->
            <!--<a href="">本周最热</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
            <!--<a href="">本周最新</a>-->
            <!--</li>-->
            <!--</ul>-->
          </nav>
        </header>
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
              <!--<div class="lazy thumb thumb loaded"-->
              <!--:style="{'background-image': 'url(http://maopingshou.com:3002/images/'+ item.img+')'}"></div>-->
              <!--<div class="lazy thumb thumb loaded">-->
              <!--<img v-bind:src="'http://maopingshou.com:3000/images/'+item.comment_img"/>-->
              <!--</div>-->
            </div>
            <!--</nuxt-link>-->
          </li>
        </ul>
        <div class="entry-loading" @click="loadingData">
          <img src="~assets/img/Rolling.gif" v-show="showLoading">
          <span v-show="!showLoading" ref="showLoading"> 加载更多...</span>

        </div>
      </div>

      <aside class="index-aside aside">
        <section class="side_mood">
          <p class="side_title">每日心情</p>
          <img src="http://maopingshou.com:3002/images/extra/every_1.jpg">
          <div class="clear"></div>
        </section>

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
              <a data-id='' target="_blank" rel="" class="link">
                <div
                  class="lazy avatar avatar loaded"
                  :style="{backgroundImage: 'url(http://maopingshou.com:3002/images/'+ side.img+') '}"></div>
                <!--<div class="lazy avatar avatar loaded">-->

                <!--</div>-->
                <div class="user-info">
                  <div class="username">{{side.title}}</div>
                  <div class="position">{{side.content}}</div>
                </div>
              </a>
            </li>
            <!--<li class="item" v-for="item in recommend">-->
            <!--<a data-v-2b9fe4cd="" href="/user/552f20a7e4b060d72a89d87f" target="_blank" rel="" class="link">-->
            <!--&lt;!&ndash;<div&ndash;&gt;-->
            <!--&lt;!&ndash;class="lazy avatar avatar loaded"&ndash;&gt;-->
            <!--&lt;!&ndash;:style="{backgroundImage: 'url(http://maopingshou.com:3000/images/'+ item.comment_img+') '}"></div>&ndash;&gt;-->
            <!--<div class="lazy avatar avatar loaded"></div>-->
            <!--<div class="user-info">-->
            <!--<div class="username">{{ item.title_key }}</div>-->
            <!--<div class="position">Android 布道师（假装） @ HenCoder</div>-->
            <!--</div>-->
            <!--</a>-->
            <!--</li>-->
          </ul>
        </section>
      </aside>
    </div>
  </main>
</template>
<script>
  import search from '~/components/search/search'
  import axios from 'axios'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    created () {
    },
    mounted () {
      axios.get(`http://maopingshou.com:3002/oftenTag?num=13`)
        .then((res) => {
          let tagList = Object.assign({}, res.data)
          this.tagList = {}
          for (let key in tagList) {
            this.tagList[key] = {}
            this.tagList[key].number = tagList[key].type
            this.tagList[key].id = key
          }
          this.celles = Object.assign({}, this.tagList)
          setInterval(() => {
            this.celles = window._.shuffle(this.celles)
          }, 5000)
        })
      axios.get(`http://maopingshou.com:3002/mainSide?start=5`)
        .then((res) => {
          this.sideList = res.data
        })
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'postList',
        'pageNum'
      ])
    },
    data () {
      return {
        showLoading: false,
        list: {},
        sideList: {},
        recommend: {},
        title: 'title',
        userimg: {
          backgroundImage: 'url(https://avatars.githubusercontent.com/u/19252719?v=3)'
        },
        tagList: {},
        celles: {}
      }
    },
    methods: {
      detail (e) {
        let uid = e.toElement.dataset.id
        //        window.open(`/detail/${uid}`)
        this.$router.push({path: `/detail/${uid}`})
      },
      loadingData () {
        this.showLoading = !this.showLoading
        let PageNum = this.pageNum + 10
        this.setPageNum(PageNum)
        axios.get(`http://maopingshou.com:3002/list?start=` + PageNum).then((res) => {
          res.data.forEach((currentValue, index, array) => {
            res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
            res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
            res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
          })
          this.setPostList(res.data)
          if (PageNum !== res.data.length) {
            this.$refs.showLoading.innerText = '已经到底'
          } else {
            this.showLoading = !this.showLoading
          }
        })
      },
      shuffle () {
        this.celles = window._.shuffle(this.celles)
      },
      ...mapMutations({
        setPostList: 'SET_POSTLIST',
        setPageNum: 'SET_PAGENUM',
        setSearchList: 'SET_SEARCHLIST'
      })
    },
    components: {
      search
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .timeline-index-view
    position relative

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
    > a:before
      content: ""
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      &:hover
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
      width 100%
      min-height 2rem
      margin-top 1rem
      box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
      background-color #fff
      display flex
      align-items center
      text-align center
      font-size .8rem
      justify-content center
      font-weight 800
      cursor pointer
      img
        height 1rem
        width 1rem

  .list-header
    padding: 1.3rem 1rem
    border-bottom: 1px solid hsla(0, 0%, 59%, .1)
    background-color #ffffff
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    .left
      .nav-item
        padding: 0 1.2rem
        font-size: 1rem
        border-right: 1px solid hsla(0, 0%, 59%, .2)
    .nav-list
      -webkit-box-align: center
      align-items: center
      line-height: 1px

  /*遍历内容*/
  .content-box
    -webkit-box-align: center
    align-item: center
    padding: 1.5rem 2rem
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
    margin: .5rem 0 1rem
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

  .thumb
    flex: 0 0 auto
    width: 5rem
    height: 5rem
    margin-left: 2rem
    background-color: #fff
    background-size: cover
    background-position: 50%
    background-repeat: no-repeat
    cursor pointer
    box-shadow 0px 10px 60px 4px rgba(0, 64, 128, .2)
    border-radius 8px
    img
      height: 100%
      width 100%

  .default_img
    background-size 558%

  .side_mood
    box-shadow 0 0px 4px 0 rgba(0, 0, 0, .05)
    margin-bottom 1rem

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
