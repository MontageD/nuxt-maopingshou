<template>
  <section class="zone">
    <div class="insight">
      <div class="list">
        <p>
          检视分组
          <i class="material-icons">
            my_location
            <!--<span class="tool"></span>-->
          </i>
        </p>
        <ul>
          <li class="checked">
              <span>
                全部
              </span>
          </li>
          <li class="">
              <span class=" ellipsis">
              新闻
              </span>
            <span class="count"><span>
              153
              </span></span>
          </li>
          <li class="">
              <span class="name ellipsis">
                微博
              </span>
            <span class="count"> <span>
               93
              </span>
              </span>
          </li>
          <li class="">
              <span class="name ellipsis">
                知乎
              </span>
            <span class="count">
                <span>
                0
                </span>
              </span>
          </li>
        </ul>
        <div class="new-source">
          <button ref="sourceBtn"
                  v-on:mouseover="hoverSource"
                  v-on:mouseleave="leaveSource"
          >
            <i class="material-icons">playlist_add</i>
            添加自定义来源
          </button>
        </div>
      </div>

      <section class="info-list">
        <header>
          <ul class="default">
            <li @click="showAll">
              <span>
                        全部
              </span>
            </li>
            <li @click="showIntelligence">
              <span>
                          智能筛选
               </span>
            </li>
            <i ref="infoAfters" class="infoAfter"></i>
          </ul>
        </header>
        <div class="infos">
          <ul>
            <li>
              <section>
                <header style="none"></header>
                <article></article>
              </section>
            </li>
          </ul>
        </div>
      </section>
      <section class="content">

      </section>
    </div>
  </section>
</template>
<script>
  export default {
    methods: {
      hoverSource () {
        this.$refs.sourceBtn.className = 'hoverSource'
      },
      leaveSource () {
        console.log('leave')
        console.log(this.$refs.sourceBtn)
        this.$refs.sourceBtn.className = ''
      },
      showAll () {
        this.$refs.infoAfters.style.transition = 'all 0.4s'
        this.$refs.infoAfters.style.transform = `translate3d(0,0,0)`
      },
      showIntelligence () {
        this.$refs.infoAfters.style.transition = 'all 0.4s'
        this.$refs.infoAfters.style.transform = `translate3d(150px,0,0)`
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .zone
    flex: 1
    height: 100%
    color: #4a4a4a
    position: relative
    .insight
      height: 100%
      background-color: #f5f6f7
      display: flex
      align-content: center
      justify-content: space-between
      padding: 0

  .list
    width: 250px
    height: 100%
    padding: 15px 0
    overflow: hidden
    ul
      li.checked
        background-color: #e6e9ed
      li
        padding: 0 25px
        font-size: 12px
        line-height: 40px
        display: flex
        -webkit-box-align: center
        align-items: center
        justify-content: space-between
        cursor: pointer
        transition: all .25s
        span
          color: #e2455b
          font-size: 12px
          line-height: 40px
    p
      font-size: 15px
      margin: 12px 0
      color: #cacbcc
      padding: 0 25px
      font-weight: 800
      i
        cursor: pointer
        position: relative
        font-size: 12px
        color: #47494e
      -webkit-text-stroke-width: .2s

  .new-source
    font-size: 12px
    text-align: center
    margin-top: 10px
    button
      display: flex
      justify-content: center
      align-items: center
      margin: 0 auto
      cursor: pointer
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12)
      color: #9b9b9b

  .hoverSource
    cursor: pointer
    color: #000 !important
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .12) !important

  .info-list
    width: 360px
    height: 100%
    border-left: 1px solid #e6e9ed
    border-right: 1px solid #e6e9ed
    header
      padding-top: 20px
      .infoAfter
        left: 0
        position: absolute
        content: " "
        display: block
        top: 0
        width: 51%
        height: 100%
        z-index: 2
        border-radius: 4px
        background-color: #fff
        box-shadow: 0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451)
        tranistion: all .35s
      ul
        margin: 0 25px
        display: flex
        background: #edeef0
        position: relative
        border: 1px solid #e1eafa
        border-radius: 4px
        li
          font-size: 15px
          height: 48px
          width: 50%
          line-height: 48px
          text-align: center
          position: relative
          cursor: pointer
          z-index: 3

  .content
    width: calc(100% - 655px)
    height: calc(100% - 50px)
    margin: 20px
    padding-right: 0px
    margin-left: 25px


</style>
