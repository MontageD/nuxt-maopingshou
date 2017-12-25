<template>
  <div class="view-container">
    <pcHeader></pcHeader>
    <pcMain></pcMain>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcHeader from '~/components/pc-header/header'
  import pcMain from '~/components/pc-main/main'
  import axios from 'axios'
  import {mapMutations} from 'vuex'

  export default {
    asyncData ({store, params}) {
      axios.get(`http://maopingshou.com:3002/list?start=10`)
        .then((res) => {
          res.data.forEach((currentValue, index, array) => {
            res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
            res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
            res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
          })
          store.commit('SET_POSTLIST', res.data)
        })
    },
    created () {
    },
    mounted () {
      console.log(window.utils.getUrl)
    },
    components: {
      pcHeader,
      pcMain
    },
    methods: {
      ...mapMutations({
        setPostList: 'SET_POSTLIST'
      })

      //      ...mapActions([
      //        'showPostList'
      //      ])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
