<template>
  <div>
    <nuxt/>
    <div>这里是博客导航 {{ btn }}</div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        btn: '想不到吧，这是测试'
      }
    }
  }
</script>
