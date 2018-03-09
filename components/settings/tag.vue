<template>

  <div class="major-part">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div v-show="show" class="major-part-li">
        <p class="one-mark">
          欢迎猫评
        </p>
        <p class="one-mark"> ꒰๑´•.̫ • `๑꒱</p>
      </div>

    </transition>
  </div>


</template>
<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.show = !this.show
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .edit-btn span
    color #007fff
    font-size 1rem

  .profile-input
    input
      outline none
      border none
      font-size .9rem

  .one-mark
    text-align center
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
    min-height 16rem
    width 100%
    padding 2.7rem 0 3rem !important
    .major-part-li
      height 100%

  .minor-area
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    margin-left 1rem
    flex 0 0 auto
    margin-bottom 6rem
    width 15rem
    max-height 3rem
    background-color #fff
</style>
