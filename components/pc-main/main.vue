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
          <a href="/editor/drafts" class="nav-item">
            草稿
          </a>
        </ul>
      </nav>
      <div class="timeline-entry-list">
        <header class="list-header">
          <nav class="list-nav">
            <ul class="nav-list left">
              <li class="nav-item">
                <a href="">热门</a>
              </li>
              <li class="nav-item">
                <a href="">最新</a>
              </li>
            </ul>
            <!--<ul class="nav-right right">-->
            <!--<li class="nav-item">-->
            <!--<a href="">本周最热</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
            <!--<a href="">本周最新</a>-->
            <!--</li>-->
            <!--</ul>-->
          </nav>
        </header>
        <ul class="entry-list">
          <li class="item">
            <div class="content-box">
              <div class="info-box">
                <div class="info-row meta-row">
                  <ul class="meta-list">
                    <li class="item post">专栏</li>
                    <li class="item username clickable">forver</li>
                    <li class="item ">1天前</li>
                    <li class="item tag">前端/Promise</li>
                  </ul>
                </div>
                <div class="info-row title-row"><!----><!---->
                  <a href="/post/5a0c170c6fb9a0451c39eff2" target="_blank" rel=""
                     class="title">让我印象深刻的 JavaScript 面试题</a>
                </div>
              </div>
            </div>
          </li>
          <li class="item">

            <div class="content-box">
              <div class="info-box">
                <div class="info-row meta-row">
                  <ul class="meta-list">
                    <li class="item post">专栏</li>
                    <li class="item username clickable">forver</li>
                    <li class="item ">1天前</li>
                    <li class="item tag">前端/Promise</li>
                  </ul>
                </div>
                <div class="info-row title-row"><!----><!---->
                  <a href="/post/5a0c170c6fb9a0451c39eff2" target="_blank" rel=""
                     class="title">让我印象深刻的 JavaScript 面试题</a>
                </div>


              </div>


            </div>

          </li>


        </ul>


      </div>
      <aside class="index-aside aside">
        <section class="section user-section">
          <header class="user-section-header">你可能感兴趣的评论</header>
          <ul class="user-list">
            <li class="item">
              <a data-v-2b9fe4cd="" href="/user/552f20a7e4b060d72a89d87f" target="_blank" rel="" class="link">
                <div
                  class="lazy avatar avatar loaded"
                  :style="{backgroundImage: 'url(https://user-gold-cdn.xitu.io/2017/10/27/b8ab80249fb8bbd77ee22d3c0cf60c44?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1)'}"></div>
                <div class="user-info">
                  <div class="username">扔物线</div>
                  <div class="position">Android 布道师（假装） @ HenCoder</div>
                </div>
              </a>
            </li>
          </ul>
        </section>
      </aside>
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
      margin-top: 4.2rem
      width: 100%

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

  .nav-item
    position: relative
    cursor: pointer

  .nav-list
    position: relative

  .timeline-entry-list
    margin-top: 1rem
    margin-right: 21.667rem
    background-color: #ffffff
    border-radius: 2px
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)

  .list-header
    padding: 1.3rem 1rem
    border-bottom: 1px solid hsla(0, 0%, 59%, .1)
    .left
      .nav-item
        padding: 0 1.2rem
        font-size: 1rem
        border-right: 1px solid hsla(0, 0%, 59%, .2)
    .nav-list
      -webkit-box-align: center
      align-items: center
      line-height: 1px

  /*遍历内容*/
  .content-box
    -webkit-box-align: center
    align-item: center
    padding: 1.5rem 2rem

  .info-box
    -webkit-box-flex: 1
    flex: 1 1 auto
    -webkit-box-orient: vertical
    justify-content center
    min-width: 0

  .meta-row
    font-size: .7rem
    color: #b2bac2
    .post
      color: #00ccad
      font-weight: 500

  .title-row
    margin: .5rem 0 1rem
    wihte-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .title
    font-size: 1rem
    font-weight: 600
    line-height: 1.4rem
    color: #2e3135

  .meta-list
    display: flex
    -webkit-box-align: baseline
    align-items: baseline
    white-space: nowrap
    .item
      content: "\B7"
      margin: 0 .4em

  /*color: #b2bac2*/

  /*右侧边栏*/
  .index-aside
    width: 20rem
    position: absolute
    top: 0
    right: 0
    z-index: 1

  .aside
    position: absolute
    top: 4.2rem
    right: 0

  .section
    background-color: #ffffff
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)
    border-radius: 2px
    margin-bottom: 1.3rem
    font-size: 1rem
    line-height: 1.29
    color: #333
    .user-section-header
      padding: 1rem 1.3rem
      border-bottom: 1px solid hsla(0, 0%, 59%, .1)
      font-size: 1rem
    .item
      padding: .5rem .8rem
      display: flex
      -webkit-box-align: center
      align-items: center
      cursor: pointer
      .link
        padding: .5rem .8rem
        display: flex
        -webkit-box-align: center
        align-items: center
        cursor: pointer
        text-overflow: ellipsis
        overflow: hidden
        .user-info
          overflow: hidden
        .username
          color: #333333
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .position
          color: #909090
          font-size: .6rem
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        .avatar
          -webkit-box-flex: 0
          flex: 0 0 auto
          width: 3rem
          height: 3rem
          border-radius: 50%
          margin-right: .8rem
    .banner
      height: 200px

  .banner
    position: relative
    font-size: 0
    cursor: pointer
    .banner-image
      width: 100%
      height: 100%









</style>
