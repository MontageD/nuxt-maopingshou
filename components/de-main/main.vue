<template>
  <div class="container main-container" id="main">

    <DeView></DeView>
    <Side></Side>
  </div>
</template>
<script>
  import DeView from '~/components/de-main/de-view/view'
  import Side from '~/components/de-main/de-side/side'

  export default {
    created () {
    },
    data () {
      return {}
    },
    mounted () {
    },
    computed: {
    },
    components: {
      DeView,
      Side
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
