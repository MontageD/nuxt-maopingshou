<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>

    <div class="settings-main">
      <div class="user-info">
        <div class="major-area">
          <div class="avatar loaded"
               :style="{'background-image': 'url('+ $store.state.option.userData.avator+')'}"></div>
          <div class="info-box">
            <h1 class="username">{{$store.state.option.userData.nickname}}</h1>
            <h2 class="email">{{$store.state.option.userData.email}}</h2>
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
          <Tag></Tag>
        </div>

        <div v-if="show===1">
          <Articles></Articles>
        </div>

        <div v-if="show===2">
          <User></User>
        </div>


      </div>

      <div class="minor-area aside">


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
        <div class="clear"></div>
      </div>
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
  import axios from 'axios'

  export default {
    created () {
    },
    data () {
      return {
        alertNow: [],
        menu: [
          {name: '通知推送', active: 'active'},
          {name: '内容定制', active: ''},
          {name: '个人资料', active: ''}
          //          {name: '文章管理', active: ''},
          //          {name: '标签管理', active: ''}
        ],
        show: 0
      }
    },
    beforeMount () {
      if (!this.$cookie.get('username')) {
        this.$router.push('/logined')
      } else {
        let username = this.$cookie.get('username')
        let _this = this
        axios.get(`/api/getAlist?username=${username}`)
          .then((res) => {
            _this.$store.commit('option/SET_USERDATA', res.data[0])
          })
      }
    },
    computed: {
      portrait () {
        const avator = this.$store.state.option.avator
        return avator
      }
    },
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
      color #007fff
      font-size 1.3rem
      display block
      width 100%
      line-height 1.2
      margin-bottom 5px
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
    box-shadow 3px 6px 31px 4px rgba(0, 64, 128, .2)
    background-size cover

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
        flex 1
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
          border-bottom 1px solid #3780f7
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

  @media (max-width: 480px)
    .aside
      display none

    .major-part
      padding .7rem 1rem 7rem !important

    .user-info
      width 100%


</style>
