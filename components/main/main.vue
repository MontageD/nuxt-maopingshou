<template>
    <section class="mains">
      <!--侧边栏-->
      <Side></Side>
      <!--侧边栏-->
      <!--右侧数据分组 + 展示数据 + 选择数据源-->
      <Zone></Zone>
      <!--右侧数据分组 + 展示数据 + 选择数据源-->
    </section>
</template>
<script>
  import Side from '~/components/side/side'
  import Zone from '~/components/zone/zone'

  export default {
    components: {
      Side,
      Zone
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .mains
      height: calc(100% -100px)
      width: 100%
      display: flex

</style>
