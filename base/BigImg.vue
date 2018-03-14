<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" @click="bigImg">
      　　　　 <!-- 遮罩层 -->
      <div class="img-layer"></div>
      <div class="img">
        <img :src="imgSrc">　　　　
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['imgSrc'],
    methods: {
      bigImg () {
        // 发送事件
        this.$emit('clickit')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active
    transition all .2s linear
    transform translate3D(0, 0, 0)

  .fade-leave-active
    transition all .2s linear
    transform translate3D(0, 0, 0)

  .fade-enter-active
    transform translate3D(100%, 0, 0)

  .fade-leave-active
    transform translate3D(100%, 0, 0)


  .img-view
    height 100%
    width 100%
    position fixed
    z-index 11111
    .img
      img
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
        max-width 100%
        display block
        z-index 1000
        max-height 100%
    .img-layer
        position fixed
        z-index 999
        top 0
        background rgba(0, 0, 0, 0.95)
        width 100%
        height 100%
        overflow hidden




</style>

