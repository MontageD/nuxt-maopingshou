<template>
  <div class="view-container">
    <keep-alive>
      <pcHeader></pcHeader>
    </keep-alive>


    <div class="publish-all">

      <div class="publish-title">发表信息</div>
      <div class="publish-input">
        <label>标题</label>
        <input type="text" v-model="title"/>
      </div>
      <div class="publish-input">
        <label>时间</label>
        <input type="text" v-model="time"/>
      </div>
      <div class="publish-input">
        <label>内容</label>
        <input type="text" v-model="content"/>
      </div>
      <div class="publish-input">
        <label>链接</label>
        <input type="text" v-model="href"/>
      </div>
    </div>
  </div>
</template>
<script>
  import pcHeader from '~/components/pc-header/header'

  export default {
    data () {
      return {
        title: '',
        time: '',
        content: '',
        href: ''
      }
    },
    components: {
      pcHeader
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .publish-all
    display block
    margin 0 auto
    max-width 960px
    margin-top 1rem
    background-color #fff
    padding 1rem
    .publish-title
      display block
      text-align center
      margin 0 auto
      font-size 16px
    .publish-input
      width 100%
      min-height 3rem
      margin .3rem 0
      label
        height 100%
      input
        height 100%
</style>
