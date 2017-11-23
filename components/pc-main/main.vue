<template>
  <main class="container main-container">
    <div class="view timeline-index-view">
      <nav class="view-nav">
        <ul class="nav-list left">
          <li class="nav-item active">
            <a href="">我关注的</a>
          </li>
          <li class="nav-item">
            <a href="">热点评论</a>
          </li>
          <li class="nav-item">
            <a href="">小道评论</a>
          </li>
        </ul>
      </nav>
      <nav class="user-action-nav user-action-nav">
        <ul class="nav-list left">
          <div class="lazy avatar loaded" :style='userimg'></div>
          <li class="nav-item">
            <a href="">写评论</a>
          </li>
          <li class="nav-item">
            <a href="">分享链接</a>
          </li>
        </ul>
        <ul class="nav-list right">
          <a tag="li" href="/editor/drafts" class="nav-item">
            <a class="title">草稿</a>
          </a>
        </ul>

      </nav>


    </div>


  </main>
</template>
<script>
  export default {
    created () {
    },
    data () {
      return {
        userimg: {
          backgroundImage: 'url(https://avatars.githubusercontent.com/u/19252719?v=3)'
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .view-nav
    width: 100%
    position: fixed
    top: 4rem
    height: 2.833rem
    z-index: 100
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    transition: all .2s
    transform: translateZ(0)

  .view-nav, .view-nav:before
    left: 0
    background-color: #fff

  .view-nav
    .nav-list
      .active
        a
          color: #007fff

  .view-nav
    .nav-list
      .nav-item
        flex-shrink: 0
        font-size: .9rem
        padding: 0 1rem
        font-weight: 800

  .nav-item
    > a:before
      content: ""
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      &:hover
        color #007fff

  .main-container
    > .view
      margin-top: 4.6rem




  .user-action-nav
    display: flex
    align-items: center
    -webkit-box-align: center
    -webkit-box-pack: justify
    justify-content: space-between
    font-size: 1rem
    margin-right: 21.667rem
    background-color: #fff
    border-radius: 2px
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    .nav-list
      .avatar
        height: 50px
        width: 50px
        margin-right: 1.5rem
        border-radius: 2px 0 0 2px
      .nav-item
        padding: 0 1.5rem
        display: flex
        -webkit-box-align: center
        align-items: center
        position: relative
        cursor: pointer
</style>
