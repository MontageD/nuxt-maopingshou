<template>
  <div class="column-view" id="view">
    <div v-for="item in info">
      <div class="container entry-view">
        <a href="/user/59c0adc66fb9a00a636a4587" target="_blank" rel="" class="post-author clearfix"
        >
          <div
            class="lazy avatar avatar loaded"
            :style="{'background-image': 'url(http://maopingshou.com:3002/images/'+item.img+')'}"></div>
          <div class="author-info float-left">
            <div class="author-name text-pointer">{{item.author}}</div>
            <div class="author-meta">{{item.time}}<!----></div>
          </div>
          <div class="tag">
            <i class="material-icons">&#xE8D2;</i>
          </div>
        </a>
      </div>
      <div class="container entry-view fb-content">
        <div class="view-title">{{item.title}}</div>
        <ul class="view-comment">
          <li> 我是评论1</li>
          <li> 我是评论2</li>
          <li> 我是评论3</li>
        </ul>
        <div class="">

        </div>
        <div class="view-content" v-html="item.content">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  export default {
    created () {
      this.$nextTick(() => {
        axios.get(`http://maopingshou.com:3002/recommend?uid=` + this.orderId)
          .then((res) => {
            this.info = Object.assign({}, res.data)
            console.log(this.info)
          })
      })
    },
    data () {
      return {
        info: {}
      }
    },
    computed: {
      ...mapGetters([
        'orderId'
      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tag
    position absolute
    right 0
    top 50%
    height 2em
    width 2em
    border-radius 3px

  .tag:hover
    transform tr

  .view-comment
    border 1px dashed #909090
    padding 1rem
    li
      height 2rem
      width 100%
      font-size 1rem
      line-height 2rem

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

  .column-view
    max-width 700px
    min-width 700px
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
