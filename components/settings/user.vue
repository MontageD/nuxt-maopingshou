<template>

  <div class="major-part">
    <p class="one-mark">个人资料</p>
    <ul class="setting-list">


      <li class="items">
        <span class="title">昵称</span>
        <div class="input-box profile-input ">
          <input placeholder="填写你的昵称" v-model="nickname" class="input">
          <div class="action-box" tabindex="nickname" @click="changeData">
            <button class="btn edit-btn">
              <!--<span>保存</span>-->
            </button>
          </div>
        </div>
      </li>


      <li class="items">
        <span class="title">用户名</span>
        <div class="input-box profile-input ">
          <input placeholder="" v-model="username" class="input">
          <div class="action-box">
            <button tabindex="username" class="btn edit-btn" @click="changeData">
              <!--<span>保存</span>-->
            </button>
          </div>
        </div>
      </li>


      <li class="items">
        <span class="title">密码</span>
        <div class="input-box profile-input ">
          <input placeholder="填写你的密码" v-model="password" class="input">
          <div class="action-box">
            <button tabindex="password" class="btn edit-btn" @click="changeData">
              <!--<span>保存</span>-->
            </button>
          </div>
        </div>
      </li>







    </ul>
  </div>
</template>
<script>
  export default {
    created () {
      this.username = this.$store.state.option.userData.username
      this.nickname = this.$store.state.option.userData.nickname
      this.password = this.$store.state.option.userData.password
      console.log(this.$store.state.option.userData)
      // if (this.$store.state.option.userData) {
      //  this.$router.push({path: `/`})
      // }
    },
    data () {
      return {
        username: '',
        nickname: '',
        password: ''
      }
    },
    methods: {
      changeData (e) {
        console.log('fuck')
        console.log(e)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .action-box
    cursor pointer

  .edit-btn span
    color #007fff
    font-size 1rem

  .profile-input
    input
      outline none
      border none
      font-size .9rem

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
        padding 0 .5rem
        a.active
          box-shadow inset 0 -2px 0 #3780f7
          color #3780f7
      li.active
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
