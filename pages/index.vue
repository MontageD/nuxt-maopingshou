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
  import axios from 'axios'

  import {mapMutations, mapActions} from 'vuex'

  export default {
    async fetch ({store, params}) {
      let res = await axios.get(`http://maopingshou.com:3002/list?start=10`)
      res.data.forEach((currentValue, index, array) => {
        res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
        res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
        res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
      })
      store.commit('SET_POSTLIST', res.data)
      //  分割
    },
    created () {
    },
    mounted () {
    },
    components: {
      pcHeader,
      pcMain
    },
    methods: {
      ...mapMutations({
        setPostList: 'SET_POSTLIST'
      }),
      ...mapActions(
        ['insertPostList']
      )
      //      ...mapActions([
      //        'showPostList'
      //      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
