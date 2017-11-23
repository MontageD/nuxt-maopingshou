<template>
  <div id="app">
    <section class="wrap">
      <section class="leftside-top">
        <header class="logo-header">
          <i :title="switchTitle" class="iconfont switchShrink" ref="switchShrink" @click="changeSwitch">
          </i>
          <div class="logo"></div>
          <a href="/search" class="logo-wrapper">
            <img src="~assets/img/logo3.png">
          </a>
          <div class="name"><p>
            MAOPING
          </p>
            <p>
              猫评手
            </p></div>
        </header>
        <section class="search-bar">
          <input type="text" placeholder="请填写需要搜索的评论" v-model="comment"/>
          <i title="点击搜索" class="material-icons searchIcon" ref="searchIcon">search</i>
        </section>
      </section>
      <section class="avatar">
        <div class="tools">
          <i class="iconfont tooltip">
            <i class="material-icons">view_week</i>
            <div class="tooltip-inner">
              小工具
            </div>
          </i> <!----></div>
        <div class="user">
          <i class="material-icons">person</i>
        </div>
      </section>
    </section>

    <keep-alive>
      <mains></mains>
    </keep-alive>


    <div class="title"></div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import mains from '~/components/main/main'

  export default {
    data () {
      return {
        switchTitle: '展开',
        rotate: 0,
        comment: ''
      }
    },
    created () {
      this.$nextTick(() => {
        console.log('跳转')
        console.log(this.searchList)
      })
      this.comment = this.$route.params.id
    },
    computed: {
      ...mapGetters([
        'searchList'
      ])
    },
    methods: {
      changeSwitch () {
        if (this.rotate === 180) {
          this.rotate = 0
        } else {
          this.rotate = 180
        }
        this.$refs.switchShrink.style['transform'] = `rotate(${this.rotate}deg)`
      }
    },
    components: {
      mains
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $switch-background = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAeUlEQVRIS+2UwQ2AIBRDHxu4iY6gm+lkOoIj6AaOwM1o8lEaErh8jqS06UtDoMIJFTLwEImyhWsEVsnlLZ6A7XllhXTAUBCyA9dfSIG//dTXJSFthkud8ALMX9WaNZF454i9SQ6lW5P6u3rB5QQOdV0+4SQxn7AwPoiRdQoaQM/fOQAAAABJRU5ErkJggg=='

  section
    /*border-bottom: 1px solid #e6e9ed*/
    justify-content: space-between
    -webkit-box-pack: justify
    .leftside-top
      position: relative
      display: flex
      align-items: center
      justify-content: center
      -webkit-box-pack: center
      -webkit-box-align: center
      width: auto
      header
        width: 175px
        .iconfont
          cursor: pointer
          transition: all .25s .15s
          color: #9b9b9b
          height: 20px
          width: 20px
          display: block
        .iconfont.switchShrink
          color: #4a4a4a
          transform: rotate(0deg)
          background-image: url($switch-background)
          background-size: 100% 100%
    .search-bar
      position: relative
      margin-left: 20px
      i
        position: absolute
        right: 0
        width: 40px
        height: 40px
        line-height: 40px
        cursor: pointer
        text-align: center
        transition: all .25s
      .searchIcon:hover
        color: #fff
        background-color: #e2455b
      input
        background: #fff
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12)
        border-radius: 4px
        color: #4a4a4a
        font-size: 13px
        width: 224px
        height: 40px
        padding: 0 15px
        padding-right: 50px
        outline: none
    .avatar
      border-bottom: 0
      display: flex
      align-items: center
      justify-content: center
      -webkit-box-pack: center
      -webkit-box-align: center
      .tools
        position: relative
        .iconfont
          cursor: pointer
      .user
        margin-left: 35px
        position: relative
        img
          height: 35px
          width: 35px
          border-radius: 50%
          cursor: pointer

  section.wrap
    width: 100%
    height: 100px
    padding: 0 25px
    border-bottom: 1px solid #e6e9ed
    justify-content: space-between
    -webkit-box-pack: justify

  section.wrap, section.wap, .leftside-top
    display: flex
    align-items: center
    -webkit-box-align: center

  .logo-header
    position: relative
    height: 100px
    /*border-bottom: 1px solid #e6e9ed*/
    display: flex
    align-items: center
    justify-content: center
    -webkit-box-pack: center
    -webkit-box-align: center
    .logo-wrapper
      width: 50px
      height: 50px
      margin-left: 20px
      img
        width: 100%
        height: 100%
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        -webkit-box-pack: center
        -webkit-box-align: center
    .name
      margin-left: 10px
      p
        margin: 0
        color: #4a4a4a
      p:last-child
        margin-top: 7px
        font-size: 13px
        font-family: SourceHanSansCN-Medium

  .tooltip
    img
      height: 20px
      width: 20px

  .tooltip-inner
    position: absolute
    background-color: #4a4a4a
    color: #fff
    line-height: 2
    padding: 3px 10px
    max-width: 150px
    border-radius: 3px
    left: 0
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2)
    display: none
    animation: fadeIn .3s


</style>

