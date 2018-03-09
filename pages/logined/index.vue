<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>


    <div class="register-view">
      <div class="register-title">登陆</div>
      <div class="register-username">
        <input type="text" placeholder="请输入用户名" v-model="username"/>
      </div>
      <div class="register-password">
        <input type="password" placeholder="请填入密码" v-model="password"/>
      </div>
      <a class="register-btn" @click="login">
        登陆
      </a>
      <div class="register-ed">
        <span>
          <a>没有账号? </a>
          <router-link to="/register" class="blue">注册</router-link>
        </span>

        <span>
          <a class="blue">忘记密码?</a>
        </span>
      </div>
      <div class="clear"></div>
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
        info: [],
        username: '',
        password: '',
        alertNow: []
      }
    },
    computed: {},
    methods: {
      login () {
        let username = this.username
        let password = this.password
        window.utils.filter.prototype.required(username, '用户名不能为空', this)
        window.utils.filter.prototype.required(password, '密码不能为空', this)
        let _this = this
        axios.get(`/api/loginState?username=${username}&&password=${password}`)
          .then(function (res) {
            console.log(res.data)
            if (res.data[0]) {
              let expireDays = 1000 * 60 * 60 * 24 * 15
              _this.$cookie.set('username', username, expireDays)
              _this.$cookie.set('password', password, expireDays)
              _this.$store.dispatch('logining', res.data[0])

              let message = '登陆成功'
              let state = 1
              let obj = {
                message: message
              }
              _this.alertNow.push(obj)
              setTimeout(() => {
                _this.alertNow.splice(_this.alertNow.length - 1, 1)
              }, 2000)
              _this.$store.dispatch('loadLoginState', state)
              _this.$store.dispatch('loadUsername', username)
              _this.$store.dispatch('loadUserData', res.data[0])
              _this.$store.dispatch('loadAvator', 'http://data.maopingshou.com/images/extra/assistance.png')
              // console.log('登陆状态：' + _this.$store.state.option.loginState)
              _this.$router.push('/')
            } else {
              let message = '登陆失败,密码错误!'
              let obj = {
                message: message
              }
              _this.alertNow.push(obj)
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
  .alert-show
    position fixed
    height 100%
    width 30%
    top 0
    right 0
    z-index 1
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

  .blue
    color #007fff

  input
    padding 10px
    width 100%
    border 1px solid #e9e9e9
    border-radius 2px
    outline none
    box-sizing border-box
    margin-bottom 1rem

  .register-view
    background-color #fff
    margin 0 auto
    margin-top 3rem
    padding 1rem
    max-width 18rem

  .register-title
    color #000
    font-size 1.5rem
    margin-bottom 1rem
    text-align center

  .register-btn
    cursor pointer
    display flex
    align-items center
    justify-content center
    color #fff
    background-color #007fff
    padding .8rem
    font-size .9rem

  .register-ed
    margin 1rem 0
    color #007fff
    text-align center
    font-weight 800
    font-size .8rem
    display flex
    justify-content space-between

</style>
