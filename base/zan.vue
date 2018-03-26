<template>

  <div class="theme-li-left">
    <!--<span class="theme-zan" :data="id" @click="zan" v-bind:data-id="like" v-if="choose===0"-->
    <!--:style="{'background-image': 'url(http://data.maopingshou.com/images/extra/like_1.png)'}">-->
    <!--<b>{{like}}</b>-->
    <!--</span>-->
    <span class="theme-zan" :data="id" @click="zan" v-bind:data-id="like"
          :style="{'background-image': 'url(http://data.maopingshou.com/images/extra/like_1.png)'}">
                 <b>{{like}}</b>
              </span>
    <span class="theme-comment" @click="increment(`${id}`,`${type}`)"
          :style="{'background-image': 'url(http://data.maopingshou.com/images/extra/share_message.png)'}">
                 <b></b>
              </span>


    <span class="theme-share"
          :style="{'background-image': 'url(http://data.maopingshou.com/images/extra/icon_ty-share.png)'}"></span>


  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {
    props: [
      'id',
      'like',
      'choose',
      'type'
    ],
    created () {
    },
    computed: mapGetters({
      listInfo: 'option/getListInfo'
    }),
    methods: {
      zan (e) {
        let upId = parseInt(e.currentTarget.getAttribute('data'))
        let likeNum = parseInt(e.toElement.dataset.id)
        console.log(this.type)
        if (this.type === 1) {
          if (e.currentTarget.style.backgroundImage === 'url("http://data.maopingshou.com/images/extra/like_1.png")') {
            e.currentTarget.style.backgroundImage = 'url("http://data.maopingshou.com/images/extra/like.png")'
            e.currentTarget.firstChild.style.color = 'red'
            likeNum = likeNum + 1
            let type = 'add'
            axios.get(`/news/zan?like=${likeNum}&id=${upId}&type=${type}`)
              .then(res => {
                // 获得最新的like 并重新渲染到列表中
                let array = []
                this.listInfo.forEach((value, key) => {
                  if (value.id === upId) {
                    value.like = res.data[0].like
                    value.choose = 1
                  }
                  array[key] = Object.assign({}, value)
                })
                this.$store.commit('option/SET_LISTINFO', array)
              })
          } else {
            e.currentTarget.style.backgroundImage = 'url("http://data.maopingshou.com/images/extra/like_1.png")'
            e.currentTarget.firstChild.style.color = '#b2bac2'
            likeNum = likeNum - 1 < 0 ? 0 : likeNum - 1
            let type = 'add'
            axios.get(`/news/zan?like=${likeNum}&id=${upId}&type=${type}`)
              .then((res) => {
                // 获得最新的like 并重新渲染到列表中
                let array = []
                this.listInfo.forEach((value, key) => {
                  if (value.id === upId) {
                    value.like = res.data[0].like
                    value.choose = 0
                  }
                  array[key] = Object.assign({}, value)
                })
                this.$store.commit('option/SET_LISTINFO', array)
              })
          }
        } else {
          if (e.currentTarget.style.backgroundImage === 'url("http://data.maopingshou.com/images/extra/like_1.png")') {
            e.currentTarget.style.backgroundImage = 'url("http://data.maopingshou.com/images/extra/like.png")'
            e.currentTarget.firstChild.style.color = 'red'
            likeNum = likeNum + 1
            let type = 'add'
            axios.get(`/news/zan2?like=${likeNum}&id=${upId}&type=${type}`)
              .then(res => {
                // 获得最新的like 并重新渲染到列表中
                let array = []
                this.listInfo.forEach((value, key) => {
                  if (value.id === upId) {
                    value.like = res.data[0].like
                    value.choose = 1
                  }
                  array[key] = Object.assign({}, value)
                })
                this.$store.commit('option/SET_LISTINFO', array)
              })
          } else {
            e.currentTarget.style.backgroundImage = 'url("http://data.maopingshou.com/images/extra/like_1.png")'
            e.currentTarget.firstChild.style.color = '#b2bac2'
            likeNum = likeNum - 1 < 0 ? 0 : likeNum - 1
            let type = 'add'
            axios.get(`/news/zan2?like=${likeNum}&id=${upId}&type=${type}`)
              .then((res) => {
                // 获得最新的like 并重新渲染到列表中
                let array = []
                this.listInfo.forEach((value, key) => {
                  if (value.id === upId) {
                    value.like = res.data[0].like
                    value.choose = 0
                  }
                  array[key] = Object.assign({}, value)
                })
                this.$store.commit('option/SET_LISTINFO', array)
              })
          }
        }

      },
      increment (id, type) {
        this.$emit('increment', id, type)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .theme-li-left
    position absolute
    width 95%
    left 0
    bottom 1rem
    margin-left 1rem
    padding-top .5rem
    cursor pointer
    border-top 1px solid rgba(178, 186, 194, .15)
    .theme-comment
      float left
    .theme-share
      float right
    span
      cursor pointer
      background-size cover
      background-repeat no-repeat
      background-position center
      height 1.2rem
      width 1.2rem
      position relative
      display inline-block
    b
      font-weight 600
      color rgba(178, 186, 194, 1)
      position absolute
      right -20px
      top 50%
      transform translate(0, -50%)
    .theme-zan
      float left
      margin-right 5rem

  @media (max-width: 480px)
    .theme-li-left
      bottom .7rem
      margin-left .7rem
</style>
