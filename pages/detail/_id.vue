<template>
  <div id="app" class="">
    <pcHeader></pcHeader>
    <DeMain></DeMain>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import pcHeader from '~/components/pc-header/header'
  import DeMain from '~/components/de-main/main'
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  //  import axios from 'axios'

  export default {
    created () {
    },
    data () {
      return {
        order_id: 0
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
      pcHeader,
      DeMain
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .hello
    color: blue
</style>

