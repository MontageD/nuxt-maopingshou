<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>

    <div class="settings-main">
      <div class="user-info">
        <div class="major-area">
          <div class="avatar loaded"
               :style="{'background-image': 'url(https://user-gold-cdn.xitu.io/2018/1/25/1612db19e54f7c80?imageView2/1/w/90/h/90/q/85/format/webp/interlace/1)'}"></div>
          <div class="info-box">
            <h1 class="username">{{username}}</h1>
            <div class="position">
              <span></span>
              <!--<span class="content">-->
                  <!--<span>web</span>-->
                  <!--<span class="split"></span>-->
                  <!--<span>web</span>-->
              <!--</span>-->
            </div>
            <div class="intro">
              <!--<span class="content">web</span>-->
            </div>
          </div>
        </div>


        <div class="major-options">
          <ul class="major-menu">
            <li v-for="(value,key) in menu">
              <a :data="key" :class="value.active" @click="changeMenu">
                {{value.name}}
              </a>
            </li>
          </ul>
          <div class="major-content"></div>
        </div>


        <div v-if="show===0">
          <User></User>
        </div>

        <div v-if="show===1">
          <Articles></Articles>
        </div>

        <div v-if="show===2">
          <Tag></Tag>
        </div>


      </div>

      <div class="minor-area"></div>
    </div>


    <div class="alert-show">
      <ul>
        <li class="active" v-for="al in alertNow">
          <a href="javascript:void(0)">
            {{al.message}}
          </a>
        </li>
        <!--<li>请输入密码</li>-->
        <!--<li>请输入密码</li>-->
        <!--<li>请输入密码</li>-->
      </ul>
    </div>
  </div>
</template>
<script>
  import Headers from '~/components/pc-header/header'
  import User from '~/components/settings/user.vue'
  import Tag from '~/components/settings/tag.vue'
  import Articles from '~/components/settings/article.vue'

  export default {
    created () {
      this.username = this.$store.state.option.userData.nickname
    },
    data () {
      return {
        alertNow: [],
        menu: [
          {name: '个人资料', active: 'active'}
          //          {name: '文章管理', active: ''},
          //          {name: '标签管理', active: ''}
        ],
        show: 0,
        username: ''
      }
    },
    computed: {},
    methods: {
      changeMenu (e) {
        let tag = parseInt(e.currentTarget.getAttribute('data'))
        let _this = this
        _this.show = tag
        this.menu.forEach((v, k) => {
          if (tag === k) {
            _this.menu[k].active = 'active'
          } else {
            _this.menu[k].active = ''
          }
        })
      }
    },
    components: {
      Headers,
      User,
      Tag,
      Articles
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .profile-input
    input
      outline none
      border none

  .one-mark
    font-size 1.5rem
    margin 1rem 0
    font-weight 800

  .setting-list
    li
      padding 1rem 0
      border-top 1px solid #f1f1f1

  .items
    display flex
    .title
      display flex
      align-items center
      width 10rem
      color #333
      font-size 1rem
      flex 1
    .profile-input
      flex 3
      display flex
      justify-content space-around

  .info-box
    height 100%
    display flex
    align-items flex-start
    .username
      font-size 1.3rem
      display block
      width 100%
      line-height 1.2
    .position
      display block
      width 100%
      line-height 1.3
      margin-top .4rem
      font-size 1rem
    .intro
      display block
      width 100%
      line-height 1.3
      margin-top .4rem
      font-size 1rem

  .avatar
    height 4rem
    width 4rem
    display block
    border-radius 50%
    margin-right 1rem

  .settings-main
    max-width 960px
    width 100%
    position relative
    margin 0 auto
    min-height 5rem
    margin-top 1.2rem
    display flex
    margin-bottom 6rem

  .user-info
    flex 1 1 auto

  .major-area
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    min-width 0
    min-height 3rem
    padding 2rem 2.5rem
    background-color #fff
    display flex
    align-items center

  .major-options
    width 100%
    background-color #fff
    min-height 3rem
    margin-top 1rem
    .major-menu
      width 100%
      box-shadow inset 0 -1px 0 hsla(240, 2%, 90%, .5)
      height 3.167rem
      position relative
      display flex
      align-items center
      li
        width 5.5rem
        flex 0 0 auto
        display flex
        height 100%
        align-items center
        justify-content center
        color #31445b
        font-size .9rem
        a
          height 100%
          width 100%
          display flex
          align-items center
          justify-content center
          cursor pointer
        a.active
          box-shadow inset 0 -2px 0 #3780f7
          color #3780f7

  .major-part
    background-color #fff
    min-height 10rem
    width 100%
    padding 2.7rem 4rem 7rem

  .minor-area
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    margin-left 1rem
    flex 0 0 auto
    margin-bottom 6rem
    width 15rem
    max-height 3rem
    background-color #fff


</style>
