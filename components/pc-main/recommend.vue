<template>
  <div>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada">
      <ul class="entry-list" v-if="listInfo">
        <li v-for="item in listInfo">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row meta-row">
                <div class="meta-list">
                  <div class="item theme">
                    <i :style="{'background-image':'url(http://data.maopingshou.com/images/theme/'+item.c_img+')'}" ></i>
                  </div>
                  <div class="item ctv">
                    <div class="item post">{{ item.c_title }}</div>
                    <div class="item username clickable">{{ item.author }}</div>
                  </div>
                  <div class="item ">{{ item.age }}</div>
                  <!--<li class="item tag">{{ item.types }}</li>-->
                </div>
              </div>
              <router-link :to="`/detail/${item.id}`" class="info-row title-row"><!----><!---->
                <span class="title">
                    {{ item.title }}
                  </span>
              </router-link>
              <router-link :to="`/detail/${item.id}`" class="content" target="_blank" v-bind:data-id="item.id">
                {{ item.content }}
              </router-link>
            </div>
            <router-link :to="`/detail/${item.id}`" v-if="item.img" class="lazy thumb thumb loaded">
              <i :style="{'background-image': 'url(http://data.maopingshou.com/images/'+ item.img+')'}"></i>
            </router-link>
            <router-link :to="`/detail/${item.id}`" v-else class="lazy thumb thumb loaded default_img"
                         :style="{'background-image': 'url(http://data.maopingshou.com/images/default.jpg)',backgroundPosition: (item.img_x+' '+item.img_y)}">
            </router-link>




            <div class="add-feature">

            </div>
            <!--<div class="lazy thumb thumb loaded"-->
            <!--:style="{'background-im.age': 'url(http://maopingshou.com:3002/images/'+ item.img+')'}"></div>-->
            <!--<div class="lazy thumb thumb loaded">-->
            <!--<img v-bind:src="'http://maopingshou.com:3000/images/'+item.comment_img"/>-->
            <!--</div>-->


            <!--<div class="user-action">-->
            <!--<div class="zan">-->

            <!--<img src="~assets/img/on.png"/>-->
            <!--</div>-->
            <!--<div class="cai">-->
            <!--<img src="~assets/img/up.png"/>-->
            <!--</div>-->
            <!--<div class="comment">-->

            <!--</div>-->
            <!--</div>-->

          </div>


          <!--</nuxt-link>-->
        </li>
      </ul>
    </transition>


    <div class="entry-loading" @click="loadingData">
      <img src="~assets/img/Rolling.gif" v-show="showLoading">
      <span v-show="!showLoading" ref="showLoading"> 加载更多...</span>

    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        showLoading: false,
        list: {},
        sideList: {},
        recommend: {},
        tagList: {},
        everyImg: 'http://data.maopingshou.com/images/extra/every_1.jpg',
        pageNum: 10
      }
    },
    computed: mapGetters({
      listInfo: 'option/getListInfo'
    }),
    methods: {
      detail (e) {
        let uid = e.toElement.dataset.id
        this.$router.push({path: `/detail/${uid}`})
      },
      loadingData () {
        this.showLoading = !this.showLoading
        this.pageNum = this.pageNum + 10
        let PageNum = {
          'num': this.pageNum
        }
        this.$store.dispatch('loadListInfo', PageNum)
        this.showLoading = !this.showLoading
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .ctv
    min-width 3rem
  .theme
    i
      border-radius 3px
      height 1.5rem
      width 1.5rem
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
    background-color #ffffff
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05)

  .entry-loading
    padding 1rem
    width 100%
    min-height 2rem
    margin-top 1rem
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    background-color #fff
    display flex
    align-items center
    text-align center
    font-size 1rem
    justify-content center
    font-weight 800
    cursor pointer
    font-weight 800
    img
      height 1rem
      width 1rem

  .content-box
    position relative
    -webkit-box-align: center
    align-item: center
    padding: 1.5rem 2rem
    padding-bottom 3rem
    border-bottom 1px solid rgba(178, 186, 194, .15)
    align-items center

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

  .meta-row
    font-size: .7rem
    color: #b2bac2
    .post
      margin-bottom 3px
      display block
      color: #00ccad
      font-weight: 500

  .info-box
    -webkit-box-flex: 1
    flex: 1 1 auto
    -webkit-box-orient: vertical
    justify-content center
    min-width: 0

  .title
    font-size: 1.2rem
    font-weight: 600
    line-height: 1.4rem
    color: #2e3135

  .content
    font-size .9rem
    font-weight: 400
    display block
    line-height 1.2rem
    margin-top 3px
    cursor pointer
    max-height 2.3rem
    overflow: hidden
    margin-bottom 2rem

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
