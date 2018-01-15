<template>
  <div id="app" class="">
    <keep-alive>
      <Headers></Headers>
    </keep-alive>
    <DeMain></DeMain>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import DeMain from '~/components/de-main/main'
  import { mapMutations, mapActions, mapGetters } from 'vuex'
  import Headers from '~/components/pc-header/header'

  export default {
    created () {
    },
    data () {
      return {
        order_id: 0,
        info: {}
      }
    },
    computed: {
      ...mapGetters([
        'detaiList',
        'orderId'
      ])
    },
    methods: {
      ...mapMutations({
        setOrderId: 'SET_ORDERID',
        setDetailList: 'SET_DETAILIST'
      }),
      ...mapActions(
        ['insertOrderId', 'insertDetaiList']
      )
    },
    components: {
      Headers,
      DeMain
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .hello
    color: blue
</style>

