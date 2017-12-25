<template>
  <div class="main-header-box">
    <header class="main-header" ref="mainHeader">
      <div class="container">
        <a href="/" class="logo">
          <img src="~assets/img/233.png"/>
        </a>
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="main-nav-list">
              <div class="phone-show-menu">
                <span style="display: none;">首页</span>
                <div class="icon "></div>
              </div>
              <ul class="phone-hide show">
                <li class="nav-item link-item route-active active">
                  <a href="">
                    首页
                  </a>
                </li>
                <li class="nav-item link-item"><a href="/zhuanlan/all">最新评论</a></li>
                <!--<li class="nav-item link-item"><a href="/douban/all">豆瓣</a></li>-->
                <!--<li class="nav-item link-item"><a href="/new/all">新闻网站</a></li>-->
                <!--<li class="nav-item link-item"><a href="/zhihu/all">知乎</a></li>-->
                <!--<li class="nav-item link-item"><a href="/history/all">历史评论</a></li>-->
              </ul>
            </li>
            <!--<li class="nav-item search">最新热评</li>-->
            <!--<li class="nav-item add">发现</li>-->
          </ul>
          <!--<li class="nav-item add"></li>-->
        </nav>
      </div>
    </header>
  </div>
</template>
<script>
  export default {
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll (e) {
      //        if (window.scrollY > 0) {
      //          this.$refs.mainHeader.style.position = 'fixed'
      //        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center
    align-items: center
    height: 100%
    width: 100%
    position: relative

  .visible
    transform: translateZ(0)



  .main-header
    position fixed


  .main-header-box
    position: relative;
    height: 4rem
    display flex
    .main-header
      width 100%
      background: #fff
      border-bottom: 1px solid #f1f1f1
      height: 4rem
      z-index: 250
      .container
        max-width: 960px
        margin: auto

  @media (max-width: 960px)
    .main-header
      padding 0 1rem


  .logo
    margin-right: 2rem

  .main-nav
    height: 100%
    -webkit-box-flex: 1px
    flex: 1 0 auto
    .nav-list
      display flex
      -webkit-box-align: center
      height: 100%
      margin: 0
      -webkit-box-pack: flex-end
      position: relative
      .main-nav-list
        display: flex
        .phone-show-menu
          cursor: pointer
          display: none
        .phone-hide
          display: flex
          .active
            a
              color: #007fff

      .nav-item
        flex: 1 1 auto
        -webkit-box-pack: end
        justify-content: flex-end
        cursor: auto

  .link-item
    padding: 0 1.2rem
    height: 4rem

  .nav-item
    color: #71777c
    font-size: 1rem
    -webkit-box-pack: center
    justify-content: center
    cursor: pointer
    display: flex
    -webkit-box-align: center
    align-items: center
    margin: 0
    a
      color: #71777c

</style>
