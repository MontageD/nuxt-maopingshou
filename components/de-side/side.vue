<template>
<div class="side">
  <div class="side_section">

  </div>
</div>
</template>
<script>
  export default {
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
      background-color #fff





  @media (max-width: 960px)
    .side_section
      display none
</style>
