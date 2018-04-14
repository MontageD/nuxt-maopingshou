<template>
  <div class="comment-all">
    <div class="comment-title">
      <div class="comment-title-leave" @click="back"><i class="material-icons">&#xE15E;</i></div>
      <div class="comment-title-text">发布新动态</div>
    </div>

    <div class="comment-article">
      <div class="comment-text">
        <textarea style="height:100%;width: 100%;"></textarea>
      </div>
      <div class="comment-theme"></div>
      <div class="comment-function">
        <div class="comment-fun-left">
          <i class="material-icons">&#xE251;</i>
        </div>
        <div class="comment-fun-right">
          <b>发表</b>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$emit('increment')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  textarea, input
    -webkit-tap-highlight-color rgba(255, 0, 0, 0)
    outline none
    border 0

  .comment-all
    max-width 960px
    display block
    margin 0 auto
  .comment-function
    width 100%
    border-top 1px solid #f7f8fb
    height 2rem
    background-color #fff
    display flex
    align-items center
    justify-content space-between
    padding 0 5px
    i
      height 1.5rem
      width 1.5rem
    .comment-fun-right
      b
        padding 3px 10px
        border 1px solid #007fff
        color #007fff
        border-radius 10%

  .comment-text
    height 10rem
    width 100%
    background-color #fff
    padding 5px

  .comment-theme
    width 100%
    border-top 1px solid #f7f8fb
    height 2rem
    background-color #fff

  .comment-title
    width 100%
    height 3rem
    position relative
    background-color #fff
    .comment-title-leave
      position absolute
      left 10px
      top 50%
      transform translate(0, -50%)
      font-size 18px
      font-weight 800
      height 2rem
      width 2rem
      border-radius 50%
      display flex
      align-items center
      justify-content center
      cursor pointer
    .comment-title-message
      position absolute
      right 10px
      top 50%
      transform translate(0, -50%)
      font-size 18px
      font-weight 800
      height 2rem
      width 2rem
      border-radius 50%
      display flex
      align-items center
      justify-content center
      cursor pointer
    .comment-title-text
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      font-size 16px
      font-weight 800

</style>
