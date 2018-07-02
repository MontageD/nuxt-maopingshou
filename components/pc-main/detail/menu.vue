<template>
  <div style="background-color: #fff;">
    <div ref="wrapper" class="list-wrapper">
      <div class="setting-list"  :style="'width:'+ themeLength * 5.8 +'rem;'">
        <div class="setting-list-li" v-for="(value,key) in theme" v-if="value.c_show===1"
            >
          <img :src="`https://maoping2.oss-cn-shenzhen.aliyuncs.com/theme/${value.c_img}`"/>
          <router-link :to="`/theme/${value.c_type}`" @click.native="change" class="item">
            <p class="list-title">
              {{value.c_title}}
            </p>
            <p class="list-btn" v-if="value.c_mark!==null">{{value.c_mark}}</p>
            <div class="grey"></div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { mapGetters } from 'vuex'

  export default {
    created () {
      for (let i = 0; i < this.theme.length; i++) {
        if (this.theme[i].c_show === 1) {
          this.themeLength += 1
        }
      }
    },
    data () {
      return {
        menu: [
          //          {name: '关注', active: 'nav-item ', model: 1},
          {name: '推荐', active: 'nav-item active', model: 2},
          {name: '热门', active: 'nav-item', model: 3}
        ],
        mainSelect: true,
        menuSelected: 2,
        themeLength: 0
      }
    },
    computed: mapGetters({
      theme: 'option/getTheme'
    }),
    mounted () {
      this.$nextTick(function () {
        setTimeout(() => {
          const options = {
            scrollY: false, // 因为scrollY默认为true，其实可以省略
            scrollX: true,
            click: true,
            taps: true,
            bounce: true
          }
          this.scroll = new BScroll(this.$refs.wrapper, options)
        }, 60)
      })
    },
    methods: {
      change () {
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .list-wrapper
    overflow hidden

  .setting-list
    background-color #fff
    height 7rem
    position relative
    display block
    .setting-list-li
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
      position relative
      margin-bottom 1rem
      overflow hidden
      img
        position absolute
        left 0
        top 0
        height 100%
        width 100%
      a:hover
        background-color rgba(0, 0, 0, .2)
      a
        transition all 1s
        display block
        height 100%
        width 100%
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
          color #fff
          height 3.2rem
          position relative
          z-index 10
          padding-top 10px
          margin-left 3px
          margin-right 5px
          margin-bottom 5px
          font-weight 800
        .list-btn
          display inline-block
          position relative
          float left
          padding 3px
          margin-left 10px
          background: linear-gradient(to bottom right, #ffe013 , #ffe013);
          color #000
          text-align left
          font-size 11px
          z-index 8
          border-radius 3px
          cursor pointer
          font-weight 800
          font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif

</style>
