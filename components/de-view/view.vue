<template>
  <div class="column-view" id="view">
    <div v-for="item in info">
      <div class="container entry-view">
        <a class="post-author clearfix"
        >
          <div
            class="lazy avatar avatar loaded"
            :style="{'background-image': 'url('+item.img+')'}"></div>
          <div class="author-info float-left">
            <div class="author-name text-pointer">{{item.author}}</div>
            <div class="author-meta">{{item.time}}<!----></div>
          </div>
          <div class="tag" @click="tagclick">
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
        <div class="view-title">{{item.title}}</div>
        <ul class="view-comment">
          <li v-for="its in item.aList">
            <span class="author">{{its.author}}</span>
            <span class="ling">:</span>
            <span>{{its.content}}</span>
          </li>
        </ul>
        <div v-if="item.img">
          <div class="view-img">
            <img :src="item.img">
          </div>
        </div>

        <div class="view-content" v-html="item.content">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    created () {
      //      this.info = Object.assign({}, this.detaiList)
      //      this.info[0].img = 'http://maopingshou.com:3002/images/' + this.info[0].img

      //      this.$nextTick(() => {
      //        console.log()
      //        console.log('orderId:' + this.orderId)
      //        axios.get(`http://maopingshou.com:3002/recommend?uid=` + this.orderId)
      //          .then((res) => {
      //            this.info = Object.assign({}, res.data)
      //            this.info[0].img = 'http://maopingshou.com:3002/images/' + this.info[0].img
      //            console.log(this.info[0])
      //          })
      //      })
    },
    mounted () {
      console.log(window.utils.getUrl)
      axios.get(`http://maopingshou.com:3002/recommend?uid=` + window.utils.getUrl)
        .then((res) => {
          res.data.forEach((currentValue, index, array) => {
            res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
            res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
            res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
          })
          //          store.commit('SET_POSTLIST', res.data)
          this.insertDetaiList({
            postList: res.data
          })
          this.setDetailList(res.data)
          this.insertOrderId({
            orderId: this.$route.params.id
          })
          this.info = Object.assign({}, res.data)
          this.info[0].img = 'http://maopingshou.com:3002/images/' + this.info[0].img
          let pathname = (this.info[0].img).split('/')
          if (pathname[pathname.length - 1] === '') {
            this.info[0].img = pathname[pathname.length - 1]
          }
        })
    },
    data () {
      return {
        info: {},
        menu_show: true
      }
    },
    computed: {
      ...mapGetters([
        'orderId',
        'detaiList'
      ]),
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
  .slide-fade-enter-active
    transition: all .3s ease

  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(10px)
    opacity: 0

  .tag
    position absolute
    right 0
    top 50%
    height 2em
    width 2em
    border-radius 3px
    transition all .4s
    .v_menu
      position relative
      .menu
        position absolute
        top -2em
        right 2em
        li
          min-width: 5rem
          height 2em
          line-height 2em
          text-align center
          color #1c94e0
          font-weight 800

  /*.tag:hover*/
  /*transform tr*/

  .view-comment
    border 1px dashed #909090
    padding 1rem
    li
      width 100%
      font-size 1rem
      line-height 2rem
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
      height 3rem
      width 100%
      text-align center
      font-size 1.2rem
      line-height 3rem
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
        box-shadow 0px 0px 10px #000

  .view-content
    padding 1rem
    line-height 1.6rem
    font-size 1rem
    letter-spacing 3px
    p
      line-height 1.7em
      text-align left
      word-break break-all
      word-wrap break-word
      font-size 1rem

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
    background-color #fff
</style>
