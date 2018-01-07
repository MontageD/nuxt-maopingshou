<template>
  <div class="view timeline-search" style="display: none;">
    <section class="zone" ref="zone">
      <section class="inner">
        <input type="text" id="search" placeholder="" v-model="searchText" @blur="closeSearch" @focus="openSearch">
        <i class="iconfont to-go" title="点击搜索" @click="searchList">></i>
        <section class="simulation" ref="simulation">中国</section>
      </section>
      <p>大众评论分析利器</p>
    </section>

    <section class="dataZone" ref="dataZone">
      <ul>
        <li>评论1</li>
        <li>评论2</li>
        <li>评论3</li>
      </ul>
    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        searchText: ''
      }
    },
    methods: {
      openSearch () {
        this.$refs.simulation.style.display = 'none'
      },
      closeSearch () {
        if (this.searchText === '') {
          this.$refs.simulation.style.display = 'block'
        }
      },
      searchList () {
      //        this.$refs.zone.style.transform = `translate(-160%, -50%)`
      //        this.$refs.dataZone.style.display = `block`
      },
      ...mapMutations({
        setPostList: 'SET_POSTLIST',
        setPageNum: 'SET_PAGENUM',
        setSearchList: 'SET_SEARCHLIST'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .dataZone
    position absolute
    right 0
    display none
    min-height 8rem
    padding 1rem
    width 50%
    top: 50%;
    transform: translateY(-50%);
  .zone
    position: absolute
    display block
    margin 0 auto
    max-width 20rem
    left 50%
    top 50%
    transition: all 1.3s
    transform translate(-50%, -50%)
    p
      font-size: 13px
      color: #9b9b9b
      font-weight: lighter
      text-align center
    .inner
      position: relative
      margin-bottom: 15px
      width 100%
      input
        width 100%
        height 48px
        background: #fff
        color: #4a4a4a
        box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .12)
        border-radius: 4px
        border: none
        outline: none
        padding: 0 15px
        font-size: 24px
        font-weight: lighter
        text-align: center
        padding-right 3rem
      .to-go
        position: absolute
        width: 3rem
        height: 100%
        line-height: 48px
        right: 0
        top: 0
        cursor: pointer
        color: #9b9b9b
        transition: all .25s
        font-size: 30px
        text-align center
      .to-go:hover
        background: #e2455b
        color: #fff
    .simulation
      height: 100%
      line-height: 48px
      background: #fff
      position: absolute
      top: 0
      left: 50%
      transform: translateX(-50%)
      color: #cccccc
      font-style: italic
      font-size: 13px
      font-weight: lighter
    .simulation:after
      content: " "
      display: block
      height: 35%

  .timeline-search
    position relative
    margin-top 1rem
    width 100%
    background-color #fff
    padding 2rem
    padding-top 3rem
    border-radius 3px
    min-height 10rem

</style>
