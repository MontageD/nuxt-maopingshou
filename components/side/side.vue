<template>
  <section class="side">
    <section class="side-body">
      <ul>
        <li class="checked">
          <i class="material-icons">fingerprint</i>
          评论信息洞察
        </li>
        <li class="">
          <i class="material-icons">equalizer</i>
          数据可视化 &nbsp
        </li>
        <li class="">
          <i class="material-icons">blur_off</i>
           大众信息分析
        </li>
        <li class="unactive tooltip">
          <i  class="material-icons">all_inclusive</i>
          报告
          <div class="tooltip-inner">
            即将上线
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
  export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .side
    overflow: hidden
    flex-basis: 200px
    transition: all .2s
    height: 100%
    bacground: #fff
    .side-body
      ul
        padding: 25px 30px
        li
          display: flex
          -webkit-box-align: center
          align-items: center
          justify-content: center
          line-height: 40px
          font-size: 12px
          cursor: pointer
          transition: all .3s
          text-overflow: ellipsis
          white-space: nowrap
          i
            width: 18px
            display: block
            margin-right: 17px
            font-size: 15px
        li.checked
          color: #000
          span
            color: aqua


</style>

