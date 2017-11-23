<template>
  <div class="view-container">
    <pcHeader></pcHeader>
    <pcMain></pcMain>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcHeader from '~/components/pc-header/header'
  import pcMain from '~/components/pc-main/main'

  export default {
    components: {
      pcHeader,
      pcMain
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
