<template>
  <div class="side">
    <div class="side_section">
      <section class="side_mood">
        <p class="side_title">每日心情</p>
        <img src="http://data.maopingshou.com/images/extra/every_1.jpg">
        <div class="clear"></div>
      </section>




      <section class="side_hoting">
        <p class="side_title">热门标签</p>
        <div @click="shuffle">
          <transition-group name="cell" tag="ul" class="side_tag">
            <li v-for="cell in cells" :key="cell.id" class="cell">
              {{ cell.number }}
            </li>
          </transition-group>
        </div>
        <div class="clear"></div>
      </section>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    mounted () {
      axios.get(`http://data.maopingshou.com/oftenTag?num=13`)
        .then((res) => {
          let tagList = Object.assign({}, res.data)
          this.tagList = {}
          for (let key in tagList) {
            this.tagList[key] = {}
            this.tagList[key].number = tagList[key].type
            this.tagList[key].id = key
          }
          this.cells = Object.assign({}, this.tagList)
          setTimeout(() => {
            this.cells = window._.shuffle(this.cells)
          })
        })
    },
    methods: {
      shuffle () {
        this.cells = window._.shuffle(this.cells)
      }
    },
    data () {
      return {
        tagList: {},
        cells: {}
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .side
    position absolute
    right 0
    top 0
    width 240px
    z-index 0
    .side_section
      width 100%
      height 10rem
      .side_mood
        box-shadow 0 0px 4px 0 rgba(0,0,0,.05)
        margin-bottom 1rem
      .side_title
        text-align left
        min-height 2rem
        padding 0 1rem
        font-size .8rem
        background-color #fff
        display flex
        align-items center
        border-bottom 1px solid #f6f6f6
      .side_hoting
        box-shadow 0 0px 4px 0 rgba(0,0,0,.05)
        margin-bottom 1rem
      img
        width 100%
      .side_tag
        cursor pointer
        width 100%
        min-height 5rem
        background-color #fff
        padding .5rem
        li
          font-size .6rem
          display inline-block
          margin .3rem .2rem
          color #7e7e7e

  .cell-move {
    transition: transform 2s;
  }

  @media (max-width: 960px)
    .side_section
      display none
</style>
