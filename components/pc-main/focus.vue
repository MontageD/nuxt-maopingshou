<template>

  <div>
    <div class="foods-wrapper">
      <div style="position: relative;">
        <ul class="entry-list" v-if="focusList">
          <li v-for="item in focusList">



            <div v-if="item.showType===1">
              <div class="content-box">
                <div class="info-box">
                  <div class="info-row meta-row">
                    <div class="meta-list">
                      <div class="item theme">
                        <router-link :to="`/theme/${item.c_type}`"
                                     :style="{'background-image':'url(https://data.maopingshou.com/images/theme/'+item.c_img+')'}"></router-link>
                      </div>
                      <div class="item ctv">
                        <router-link :to="`/theme/${item.c_type}`" class="item post">{{ item.c_title }}</router-link>
                        <div class="item username clickable">{{ item.author }}</div>
                      </div>
                      <div class="item ">{{ item.age }}</div>
                    </div>
                  </div>
                  <router-link :to="`/detail/${item.id}`" class="info-row title-row">
                  <span class="title">
                    {{ item.title }}
                  </span>
                  </router-link>
                  <router-link :to="`/detail/${item.id}`" class="content" target="_blank" v-bind:data-id="item.id">
                    {{ item.content }}
                  </router-link>
                </div>
                <router-link :to="`/detail/${item.id}`" v-if="item.img" class="lazy thumb thumb loaded">
                  <i :style="{'background-image': 'url(https://data.maopingshou.com/images/'+ item.img+')'}"></i>
                </router-link>
                <router-link :to="`/detail/${item.id}`" v-else class="lazy thumb thumb loaded default_img"
                             :style="{'background-image': 'url(https://data.maopingshou.com/images/default.jpg)',backgroundPosition: (item.img_x+' '+item.img_y)}">
                </router-link>
              </div>

              <!--<Zan :id="item.id" :like="item.like" :choose="item.choose" :type="item.showType"-->
                   <!--v-on:increment="incrementTotal"></Zan>-->

            </div>
            <div v-if="item.showType===2">
              <div class="content-box2">
                <div class="info-box2">
                  <div class="info-row meta-row">
                    <div class="meta-list">
                      <div class="item theme">
                        <router-link :to="`/theme/${item.c_type}`"
                                     :style="{'background-image':'url(https://data.maopingshou.com/images/theme/'+item.c_img+')'}"></router-link>
                      </div>
                      <div class="item ctv">
                        <router-link :to="`/theme/${item.c_type}`" class="item post">{{ item.c_title }}</router-link>
                        <div class="item username clickable">{{ item.author }}</div>
                      </div>
                      <div class="item ">{{ item.age }}</div>
                    </div>
                  </div>

                  <a :href="`https://${item.href}`" class="content2" target="_blank" v-bind:data-id="item.id">
                    {{ item.title }}
                  </a>
                </div>


                <a :href="`${item.href}`" v-if="item.imgArr.length>1" class="lazy loaded2"
                   v-for="(v,k) in item.imgArr"
                   :style="'width:'+ (v.len*100<33 ? 33 : v.len*100) +'%;'">
                  <div class="detail_img"
                       :style="{'background-image': 'url(https://data.maopingshou.com/images/news/'+v.img+')'}"></div>
                </a>
                <a :href="`${item.href}`" v-if="item.imgArr.length==1" class="lazy loaded2"
                   v-for="(v,k) in item.imgArr"
                   style="max-width: 60%;height: 8rem;">
                  <img :src="`https://data.maopingshou.com/images/news/${v.img}`"/>
                </a>
              </div>
              <!--<Zan :id="item.id" :like="item.like" :choose="item.choose" :type="item.showType"-->
                   <!--v-on:increment="incrementTotal"></Zan>-->

            </div>
          </li>
        </ul>
        <div class="enrty-prompt" v-show="entry">
          <img src="~assets/img/loadings.gif"/>
        </div>
      </div>
    </div>

    <div class="entry-loading" @click="loadingData">
      <img src="~assets/img/Rolling.gif" v-show="showLoading">
      <span v-show="!showLoading" ref="showLoading"> 加载更多...</span>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Zan from '~/base/zan'
  import axios from 'axios'

  export default {
    created () {
      if (this.$store.state.option.focusInfo.length) {
      } else {
        this.$store.dispatch('loadFocusInfo', {
          num: '20'
        })
      }
    },
    data () {
      return {
        start: {
          'num': 1
        },
        entry: false,
        showLoading: true,
        list: {},
        sideList: {},
        recommend: {},
        tagList: {},
        everyImg: 'https://data.maopingshou.com/images/extra/every_1.jpg',
        pageNum: 20,
        themeLength: 0,
        pulldown: true,
        goods: [],
        states: false,
        searchCondition: 0
      }
    },
    computed: mapGetters({
      focusList: 'option/getFocuslist'
    }),
    methods: {
      incrementTotal (id, type) {
        this.$emit('increment', id, type)
      },
      increment (id) {
        this.$emit('increment', id)
      },
      zan (e) {
        // 根据cookie  判断点赞
        //  新闻id
        let upId = parseInt(e.currentTarget.getAttribute('data'))
        let likeNum = parseInt(e.toElement.dataset.id)

        if (e.currentTarget.style.backgroundImage === 'url("https://data.maopingshou.com/images/extra/like_1.png")') {
          // 点赞操作
          e.currentTarget.style.backgroundImage = 'url("https://data.maopingshou.com/images/extra/like.png")'
          likeNum = likeNum + 1
          let type = 'add'
          axios.get(`/news/zan?like=${likeNum}&id=${upId}&type=${type}`)
            .then(res => {
              // 获得最新的like 并重新渲染到列表中
              let array = []
              this.focusList.forEach((value, key) => {
                if (value.id === upId) {
                  value.like = res.data[0].like
                  value.choose = 1
                }
                array[key] = Object.assign({}, value)
              })
              this.$store.commit('option/SET_FOCUSINFO', array)
            })
        } else {
          // 取消点赞操作
          e.currentTarget.style.backgroundImage = 'url("https://data.maopingshou.com/images/extra/like_1.png")'
          likeNum = likeNum - 1 < 0 ? 0 : likeNum - 1
          let type = 'add'
          axios.get(`/news/zan?like=${likeNum}&id=${upId}&type=${type}`)
            .then((res) => {
              // 获得最新的like 并重新渲染到列表中
              let array = []
              this.focusList.forEach((value, key) => {
                if (value.id === upId) {
                  value.like = res.data[0].like
                  value.choose = 0
                }
                array[key] = Object.assign({}, value)
              })
              this.$store.commit('option/SET_FOCUSINFO', array)
            })
        }

        if (this.$cookie.get('mylike')) {
          // 没点过赞
          let mylike = this.$cookie.get('mylike')
          let likeArray = mylike.split('|')
          // 判断是否插入了cookie
          let pan = 1
          likeArray.forEach((value, index, array) => {
            if (parseInt(value) === parseInt(upId)) {
              // 存在于传过来的ID 相等的则不插入cookie
              pan = 0
            }
          })
          if (pan === 0) {
            // 存在就不插入 并取消 点赞logo
            mylike = mylike.replace('|' + upId, '')
            mylike = mylike.replace(upId, '')
          } else {
            // 不存在就插入 并变换点赞logo
            mylike = mylike + '|' + upId
          }
          // 排除在第一的 "|"
          mylike = mylike.substr(0, 1) === '|' ? mylike.substr(1, mylike.length - 1) : mylike
          this.$cookie.set('mylike', mylike)
        } else {
          let id = e.currentTarget.getAttribute('data')
          this.$cookie.set('mylike', id)
          // 已经点过赞 存在数据存储
        }
      },
      detail (e) {
        let uid = e.toElement.dataset.id
        this.$router.push({path: `/detail/${uid}`})
      },
      loadingData () {
        this.showLoading = !this.showLoading
        this.start.num = this.start.num + 1
        let obj = {
          'num': this.start.num * 20
        }
        let _this = this
        this.$store.dispatch('loadFocusInfo', obj).then(response => {
          _this.showLoading = !_this.showLoading
        })
        this.showLoading = !this.showLoading
      },
      loadCookie () {
        if (this.$cookie.get('mylike')) {
          let arr = this.$cookie.get('mylike').split('|')
          let array = []
          this.focusList.forEach((value, key) => {
            let choose = 0
            arr.forEach((v, k) => {
              if (parseInt(value.id) === parseInt(v)) {
                choose = 1
              }
            })
            value.choose = choose
            array[key] = Object.assign({}, value)
          })
          this.$store.commit('option/SET_FOCUSINFO', array)
        } else {
          let array = []
          if (this.focusList.length > 0) {
            this.focusList.forEach((value, key) => {
              let choose = 0
              value.choose = choose
              array[key] = Object.assign({}, value)
            })
            this.$store.commit('option/SET_FOCUSINFO', array)
          }
        }
      }
    },
    mounted () {
      let _this = this
      if (this.$store.state.option.focusInfo.length) {
        _this.showLoading = !_this.showLoading
      } else {
        this.$store.dispatch('loadFocusInfo', {num: '20'}).then(response => {
          _this.showLoading = !_this.showLoading
          this.loadCookie()
        })
      }
    },
    components: {
      Zan
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail_img
    border-radius 3px
    height 100%
    width 100%
    background-size cover
    background-position center
    background-repeat no-repeat

  .info-box2:after, .info-box2:before, .content-box2:after, .content-box2:before
    content: " "
    display table

  .info-box2:after, .content-box2:after
    clear both

  .content2
    color #14171a
    margin-top 10px
    margin-bottom 10px
    font-size 16px
    font-weight 800
    float left
    width 100%
    text-align left
    line-height 20px

  .clickable
    text-align left

  .content-box2
    .loaded2:first-child
      border-left 0

  .content-box2
    position relative
    display block
    padding: 1.5rem 1rem
    border-bottom 1px solid rgba(178, 186, 194, .15)
    align-items center
    .info-box2
      width 100%
    .loaded2
      border 5px solid #fff
      width 100%
      height 8rem
      min-height 10rem
      max-height 12rem
      display inline-block
      float left
      img
        height 9rem
        float left
        border-radius 5px
      i
        display block
        height 100%
        width 100%
        background-repeat no-repeat
        background-size cover
        background-position center

  .show-time
    width 100%
    height 3rem
    padding 1rem
    text-align left
    background-color #fff
    border-top 1px solid rgba(178, 186, 194, .15)
    border-bottom 1px solid rgba(178, 186, 194, .15)
    display flex
    align-items center
    .show-time-text
      display flex
      align-items center
      font-size 15px
      font-weight 600

  .enrty-prompt
    position absolute
    top -2rem
    left 50%
    transform translate(-50%, 0)
    height 2rem
    width 2rem
    font-size 1rem
    font-weight 800
    color #fff
    display flex
    align-items center
    background transparent
    justify-content center
    img
      height 100%
      width 100%

  .foods-wrapper
    width: 100%
    text-align: center
    top 18rem

  .theme-li-left
    position absolute
    width 95%
    left 0
    bottom 1rem
    margin-left 1rem
    padding-top .5rem
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
      right -1rem
      top 50%
      transform translate(0, -50%)
    .theme-zan
      float left
      margin-right 5rem

  .ctv
    display flex
    min-width 3rem
    height 2rem
    flex-direction column
    justify-content space-between

  .theme
    a
      border-radius 3px
      height 2rem
      width 2rem
      display block
      background-position center
      background-size cover
      background-repeat no-repeat

  .title-row
    margin: .5rem 0 .4rem
    wihte-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .entry-list
    height 100%
    overflow hidden
    li
      background-color #fff
      position relative
      margin .8rem 0

  .entry-loading
    padding 1rem
    width 100%
    min-height 2rem
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    background-color #fff
    display flex
    align-items center
    text-align center
    font-size 1rem
    justify-content center
    font-weight 800
    cursor pointer
    img
      height 2rem
      width 2rem

  .content-box
    position relative
    -webkit-box-align: center
    align-item: center
    padding: 1.5rem 1rem
    border-bottom 1px solid rgba(178, 186, 194, .15)
    align-items center
    li
      position relative

  .info-box
    -webkit-box-flex: 1
    flex: 1 1 auto
    -webkit-box-orient: vertical
    justify-content center
    min-width: 0

  .meta-list
    display: flex
    -webkit-box-align: baseline
    align-items: center
    white-space: nowrap
    .item
      content: "\B7"
      margin: 0 .4em
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap

  .meta-row
    font-size: .7rem
    color: #b2bac2
    .post
      margin-bottom 3px
      display block
      color: #00ccad
      text-align left
      font-weight: 500

  .info-box
    -webkit-box-flex: 1
    flex: 1 1 auto
    -webkit-box-orient: vertical
    justify-content center
    min-width: 0

  .title
    text-align left
    font-size: 1.2rem
    font-weight: 600
    line-height: 1.4rem
    color: #2e3135
    float left

  .content
    text-align left
    color #14171a
    font-size .9rem
    font-weight: 400
    display block
    line-height 1.2rem
    margin-top 3px
    cursor pointer
    max-height 2.3rem
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

  .thumb
    flex: 0 0 auto
    width: 5rem
    height: 5rem
    margin-left: 2rem
    background-color: transparent
    background-size: cover
    background-position: 50%
    background-repeat: no-repeat
    cursor pointer
    box-shadow 0px 10px 60px 4px rgba(0, 64, 128, .2)
    border-radius 8px
    i
      transition: all .5s;
      display block
      height 100%
      width 100%
      background-size: cover
      background-position: 50%
      background-repeat: no-repeat

  .thumb
    i:hover
      transform rotate(10deg);

  @media (max-width: 480px)
    .loaded2
      height 6rem !important
      min-height 8rem !important
      max-height 8rem !important

    .foods-wrapper
      overflow: hidden
      width: 100%
      text-align: center

    .theme-li-left
      bottom .7rem
      margin-left .7rem

    .info-box
      flex 3

    .thumb
      display block
      flex: 1
      width: 5rem
      height: 5rem
      position relative
      margin-left: 10px
      background-color: transparent
      background-size: cover
      background-position: 50%
      background-repeat: no-repeat
      cursor pointer
      box-shadow 0px 10px 60px 4px rgba(0, 64, 128, .2)
      border-radius 8px

    .content-box
      display flex

    .title
      font-size 16px

    .content
      font-size 12px

</style>
