<template>
  <div id="list">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>
    <div class="register-view" v-if="true">
      <div class="register-title">注册</div>
      <div class="register-username">
        <input type="text" placeholder="请输入用户名" v-model="username"/>
      </div>
      <div class="register-email">
        <input type="text" placeholder="请填入邮箱" v-model="email"/>
      </div>
      <div class="register-password">
        <input type="password" placeholder="请填入密码" v-model="password"/>
      </div>
      <a class="register-btn" @click="register">
        注册
      </a>
      <router-link to="/logined" class="register-ed">
        已有账号登陆
      </router-link>
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
        email: '',
        alertNow: []
      }
    },
    computed: {},
    methods: {
      register () {
        let username = this.username
        let password = this.password

        let email = this.email
        //        if (!username.match(/^[\u4e00-\u9fa5|a-zA-Z]*$/)) {
        //          alert('用户名必须由汉字、英文字母线组成')
        //        console.log(window.utils.filter.prototype.required)
        window.utils.filter.prototype.required(username, '用户名不能为空', this)
        window.utils.filter.prototype.required(password, '密码不能为空', this)
        window.utils.filter.prototype.required(email, '邮箱不能为空', this)

        let _this = this
        axios.get('https://data.maopingshou.com/userPost?username=' + username + '&password=' + password + '&email=' + email)
          .then(function (response) {
            if (response.status === 200) {
              let message = '注册成功'
              let obj = {
                message: message
              }
              _this.alertNow.push(obj)
              setTimeout(() => {
                _this.alertNow.splice(_this.alertNow.length - 1, 1)
              }, 2000)
              let state = 1
              _this.$store.dispatch('loadLoginState', state)
            }
          })

        setTimeout(function () {
          axios.get('https://data.maopingshou.com/loginState?username=' + username + '&password=' + password)
            .then(function (res) {
              if (res.data.length > 0) {
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
                _this.$store.dispatch('loadAvator', 'https://data.maopingshou.com/images/extra/assistance.png')
                // console.log('登陆状态：' + _this.$store.state.option.loginState)
                _this.$router.push('/')
              }
            })
        }, 1000)
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
    z-index 1111

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
    display block
</style>
