<template>
  <div>
    <transition name="fade">
      <div class="pop-alert">
        　　　　 <!-- 遮罩层 -->
        <div class="pop-center">
          <p>请登陆后再点击评论 (..•˘_˘•..)</p>
          <div class="pop-btn" @click="changePop">
            <span class="cancel"><i class="material-icons">&#xE14C;</i></span>
            <!--<span class="login">Login</span>-->
          </div>
          <div class="pop-btn" @click="changePop">
            <router-link :to="`/logined`" class="login">登陆</router-link>
            <!--<span class="login">Login</span>-->
          </div>
          <div class="pop-btn" @click="changePop">
            <router-link :to="`/register`" class="login">注册</router-link>
            <!--<span class="login">Login</span>-->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    methods: {
      changePop () {
        // 发送事件
        this.$emit('changePop')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .pop-alert
    left 0
    top 0
    height 100%
    position fixed
    width 100%
    background-color rgba(0, 0, 0, .6)
    z-index 10000
    .pop-center
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      width 80%
      border-radius 20px
      background-color #fff
      color #000
      padding 1rem
      p
        width 100%
        margin-top 1rem
        text-align center
        display block
        font-size 16px
        font-weight 600
      .pop-btn
        height 2rem
        display flex
        justify-content center
        margin-top 1rem
        align-items center
      .cancel
        display flex
        align-items center
        justify-content center
        margin 0 auto
        border 1px solid #000
        border-radius 50%
        height 1.8rem
        width 1.8rem
      .login
        color #000
        display flex
        align-items center
        justify-content center
        margin 0 auto
        border 1px solid #000
        border-radius 50%
        height 1.8rem
        width 3rem
</style>
