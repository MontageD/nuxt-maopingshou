<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>


    <div class="div-container">
      <div class="user-data">
        <input type="text" class="user-name" placeholder="name.*" v-model="userName">
        <input type="text" class="user-email" placeholder="email.*" v-model="email">
      </div>


      <input class="div-trearea" placeholder="Let me see your comments." v-model="advice">
      <button class="div-btn" @click="submit">提交</button>
    </div>


    <div class="alert-show">
      <ul>
        <li class="active" v-for="al in alertNow">{{al.message}}</li>
        <!--<li>请输入密码</li>-->
        <!--<li>请输入密码</li>-->
        <!--<li>请输入密码</li>-->
      </ul>
    </div>


  </div>
</template>
<script>
  import Headers from '~/components/pc-header/header'
  import axios from 'axios'

  export default {
    data () {
      return {
        userName: '',
        email: '',
        advice: '',
        alertNow: []
      }
    },
    computed: {},
    methods: {
      submit () {
        let username = this.userName
        let email = this.email
        let advice = this.advice
        let _this = this
        axios.get('https://data.maopingshou.com/postAdvice?username=' + username + '&advice=' + advice + '&email=' + email)
          .then(function (response) {
            if (response.status === 200) {
              let message = '提交建议成功,感谢你的支持！'
              let obj = {
                message: message
              }
              _this.alertNow.push(obj)
              setTimeout(() => {
                _this.alertNow.splice(_this.alertNow.length - 1, 1)
                _this.userName = ''
                _this.email = ''
                _this.advice = ''
              }, 2000)
              //              let state = 1
              //              _this.$store.dispatch('loadLoginState', state)
            }
          })
      }
    },
    components: {
      Headers
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  ul
    position absolute
    right 10px
    top 5rem
    li.active
      background-color #e6f3ff
      color #007fff
      padding 1.5rem
      display flex
      align-items center
      justify-content center
      box-shadow 0 1px 1px 0 hsla(0, 0%, 80%, .5)
      margin-bottom 10px
    li:after,
    li:before
      content ' '
      display table
    li:after
      clear both

  .alert-show
    position fixed
    height 100%
    width 30%
    top 0
    right 0
    z-index 1

  .user-data
    max-width 800px
    margin 0 auto
    margin-top 1rem
    margin-bottom 1rem
    min-height 3rem
    input
      width 100%
      display block
      background-color #fff
      border-radius 5px
      font-size 16px
      padding 1rem
      outline none
    .user-name
      margin-bottom .5rem
    .user-email
      color #000


  .div-container
    max-width 800px
    display block
    margin 0 auto
    margin-top 1rem
    min-height 10rem
    padding 0 1rem

  .div-trearea
    height 8rem
    width 100%
    background-color #fff
    display block
    margin 0 auto
    margin-bottom 1rem
    outline none
    padding 1rem
    border-radius 5px
    font-size 16px
    overflow scroll

  .div-btn
    background-color #007fff
    color #fff
    display block
    margin 0 auto
    width 100%
</style>
