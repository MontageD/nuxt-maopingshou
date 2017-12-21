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
  import {mapMutations, mapActions} from 'vuex'

  export default {
    created () {
      //      console.log(this.$route.params)
    },
    mounted () {
      this.insertOrderId({
        orderId: this.$route.params.id
      })
      //      this.order_id = this.$route.params.id
      //      console.log(this.order_id)
    },
    data () {
      return {
        order_id: 0
      }
    },
    methods: {
      ...mapMutations({
        setOrderId: 'SET_ORDERID'
      }),
      ...mapActions(
        ['insertOrderId']
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

