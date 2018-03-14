<template>
  <div class="view-container">
    <keep-alive>
      <pcHeader></pcHeader>
    </keep-alive>

    <pcMain></pcMain>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcHeader from '~/components/pc-header/header'
  import pcMain from '~/components/pc-main/main'
  import { mapGetters } from 'vuex'
  import Recommend from '~/components/pc-main/recommend'

  export default {
    created () {
    },
    mounted () {
    },
    components: {
      pcHeader,
      pcMain,
      Recommend
    },
    computed: mapGetters({
      listInfo: 'option/getListInfo'
    }),
    methods: {}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .view-container:after, .view-container:before
    display table
    content " "

  .view-container:after
    clear both
</style>
