<template>
  <div>
    <div class="comment-list">
      <div class="comment-title">
        <div class="comment-title-leave" @click="increment"><i class="material-icons">&#xE15E;</i></div>
        <div class="comment-title-text">消息详情</div>
        <div class="comment-title-message" @click="changeVshow">
          <i class="material-icons">&#xE254;</i>
        </div>
      </div>


      <div v-if="type==='1'">
        <ul class="entry-list">
          <li v-for="item in news">
            <div class="content-box">
              <div class="info-box">
                <div class="info-row meta-row">
                  <div class="meta-list">
                    <div class="item theme">
                      <router-link :to="`/theme/${item.c_type}`"
                                   :style="{'background-image':'url(https://maoping2.oss-cn-shenzhen.aliyuncs.com/images/theme/'+item.c_img+')'}"></router-link>
                    </div>
                    <div class="item ctv">
                      <router-link :to="`/theme/${item.c_type}`" class="item post">{{ item.c_title }}</router-link>
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
                <i :style="{'background-image': 'url(https://maoping2.oss-cn-shenzhen.aliyuncs.com/images/'+ item.img+')'}"></i>
              </router-link>
              <router-link :to="`/detail/${item.id}`" v-else class="lazy thumb thumb loaded default_img"
                           :style="{'background-image': 'url(https://maoping2.oss-cn-shenzhen.aliyuncs.com/images/default.jpg)',backgroundPosition: (item.img_x+' '+item.img_y)}">
              </router-link>
            </div>
          </li>
        </ul>

      </div>
      <div v-else>
        <ul class="entry-list">
          <li v-for="item in news">

            <div class="content-box2">
              <div class="info-box2">
                <div class="info-row meta-row">
                  <div class="meta-list">
                    <div class="item theme">
                      <router-link :to="`/theme/${item.c_type}`"
                                   :style="{'background-image':'https://maoping2.oss-cn-shenzhen.aliyuncs.com/images/theme/'+item.c_img+')'}"></router-link>
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
          </li>
        </ul>

      </div>


      <!--</li>-->


      <!--</ul>-->

      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
      >
        <div class="comment-add" v-show="vshow">
        <textarea
          class="comment-textarea" wrap="virtual"
          onpropertychange="this.style.height=this.scrollHeight + 'px'"
          oninput="this.style.height=this.scrollHeight + 'px'" v-model="textMessage"></textarea>
          <div class="comment-submits" @click="submitComment">提交</div>
        </div>
      </transition>


      <div class="comment-nav" v-if="comment.length>0">
        热门评论
      </div>

      <div class="comment-item" v-if="comment.length>0" v-for="(value,key) in comment">
        <div class="comment-item-img">
          <div class="comment-img" :style="{'background-image': 'url('+value.avator+')'}">
          </div>
        </div>
        <div class="comment-item-con">
          <div class="comment-item-title">
            <div class="comment-item-left">
              <p class="comment-item-name">{{value.nickname}}</p>
              <p class="comment-item-time">
                {{value.comment_time.substring(0, 10)}} {{value.comment_time.substring(11, 16)}}</p>
            </div>
            <!--<div class="comment-item-zan" v-if="value.avator!==null">-->
            <!--<span :style="{'background-image': 'url(https://data.maopingshou.com/images/extra/'+value.avator+'.png)'}">-->
            <!--</span>-->
            <!--<b>{{value.comment_zan}}</b>-->
            <!--</div>-->
            <div class="comment-item-zan">
              <span :style="{'background-image': 'url(https://data.maopingshou.com/images/extra/like_1.png)'}">
              </span>
              <b>{{value.comment_zan}}</b>
            </div>
          </div>
          <div class="comment-content">
            {{value.comment_text}}
          </div>
        </div>
      </div>


      <div v-if="comment.length===0" class="comment-empty">
        <div class="comment-empty-text">
          <p> 等待你补充有趣的评论</p>
          <p> ( •̀ .̫ •́ )✧</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Zan from '~/base/zan'

  export default {
    props: [
      'message',
      'type'
    ],
    data () {
      return {
        comment: [],
        textMessage: '',
        news: [],
        vshow: false
      }
    },
    created () {
      if (this.type === '1') {
        axios.get(`/news/comment?id=${this.message}`)
          .then((res) => {
            this.comment = res.data
          })
        axios.get(`/news/commentNews?id=${this.message}`)
          .then((res) => {
            res.data.forEach((currentValue, index, array) => {
              res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
              res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
              res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
            })
            this.news = res.data
          })
      } else {
        axios.get(`/news/comment?id=${this.message}`)
          .then((res) => {
            this.comment = res.data
          })
        axios.get(`/news/commentNews2?id=${this.message}`)
          .then((res) => {
            res.data.forEach((currentValue, index, array) => {
              res.data[index].img_x = '-' + (12 + parseInt(Math.random() * 4) * 71) + 'px'
              res.data[index].img_y = '-' + (31 + parseInt(Math.random() * 4) * 79) + 'px'
              res.data[index].content = res.data[index].content.replace(/<.*?>/ig, '')
            })
            this.news = res.data
          })
      }
    },
    methods: {
      changeVshow () {
        //  点开评论 需要判断是否登陆
        if (this.$cookie.get('uid')) {
          this.vshow = !this.vshow
          this.$emit('alert', 0)
        } else {
          this.$emit('alert', 1)
        }
      },
      increment () {
        this.$emit('increment')
      },
      submitComment () {
        let id = this.message
        let content = this.textMessage
        let userid = this.$cookie.get('uid')
        axios.get(`/news/commentinsert?id=${id}&content=${content}&userid=${userid}`)
          .then((res) => {
            this.comment = res.data
          })
      }
    },
    components: {
      Zan
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .content2
    color #14171a
    margin-top 10px
    margin-bottom 10px
    font-size 16px
    font-weight 800
    float left
    width 100%
    text-align left

  .comment-add
    position relative
    margin-top 10px
    padding 1rem
    display flex
    align-items center
    .comment-textarea
      background-color transparent
      outline: none
      align-items center
      border 1px solid
      word-wrap: break-word
      word-break: normal
      display block
      margin 0 auto
      border-radius 18px
      padding 5px
      flex 6
      overflow: hidden
      height 40px
    .comment-submits
      cursor pointer
      height 40px
      display flex
      flex 1
      text-align center
      justify-content center
      align-items center

  .comment-empty
    margin-top 1rem
    display flex
    background-color #fff
    width 100%
    height 5rem
    padding 5rem
    align-items center
    justify-content center
    .comment-empty-text
      p
        width 100%
        text-align center
        font-size 16px
        font-weight 600
        margin-bottom 5px

  .comment-list
    width 100%

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

  .comment-title
    width 100%
    height 3rem
    position relative
    background-color #fff
    .comment-title-leave
      position absolute
      left 10px
      top 50%
      transform translate(0, -50%)
      font-size 18px
      font-weight 800
      height 2rem
      width 2rem
      border-radius 50%
      display flex
      align-items center
      justify-content center
      cursor pointer
    .comment-title-message
      position absolute
      right 10px
      top 50%
      transform translate(0, -50%)
      font-size 18px
      font-weight 800
      height 2rem
      width 2rem
      border-radius 50%
      display flex
      align-items center
      justify-content center
      cursor pointer
    .comment-title-text
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      font-size 16px
      font-weight 800

  .comment-nav
    margin-top 10px
    height 2rem
    padding 15px
    background-color #fff
    display flex
    align-items center
    border-bottom 1px solid rgba(178, 186, 194, .15)

  .comment-item
    background-color #fff
    display flex
    padding 1rem .5rem
    border-bottom 1px solid rgba(178, 186, 194, .15)
    .comment-item-img
      flex 1
      display flex
      align-items center
      justify-content center
      .comment-img
        height 2.5rem
        width 2.5rem
        background-color #47494e
        border-radius 50%
        background-size cover
        background-repeat no-repeat
        border 1px solid #f7f8fb
        box-shadow 2px 2px 9px 1px #47494e
    .comment-item-con
      flex 5
      .comment-item-title
        height 2.5rem
        display flex
        .comment-item-left
          flex 6
          .comment-item-name
            display flex
            align-items center
            height 50%
            font-size 14px
          .comment-item-time
            height 50%
            display flex
            align-items center
            color #b2bac2
            font-size 12px
        .comment-item-zan
          flex 1
          color #b2bac2
          font-size 12px
          position relative
          display flex
          align-items center
          justify-content center
          span
            transform rotateZ(-15deg)
            cursor pointer
            background-size cover
            background-repeat no-repeat
            background-position center
            height 1rem
            width 1rem
            position relative
            display inline-block
            top -2px
          b
            font-weight 600
            color rgba(178, 186, 194, 1)
            position absolute
            right 3.3rem
            top 50%
            transform translate(0, -50%)
            font-size 12px
            font-weight 400
      .comment-content
        padding .3rem 0
        font-size 13px

  .theme
    a
      border-radius 3px
      height 1.5rem
      width 1.5rem
      display block
      background-position center
      background-size cover
      background-repeat no-repeat

  .entry-list
    li
      position relative
      margin .8rem 0
      background #fff

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

  .title
    font-size: 1.2rem
    font-weight: 600
    line-height: 1.4rem
    color: #2e3135

  .meta-list
    display: flex
    -webkit-box-align: baseline
    align-items: center
    white-space: nowrap
    margin-bottom 3px
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

  .content
    color #14171a
    font-size .9rem
    font-weight: 400
    display block
    line-height 1.2rem
    margin-top 3px
    cursor pointer
    max-height 2.3rem
    overflow: hidden
    margin-bottom 2.8rem

  .list-wrapper
    overflow hidden
    .entry-list
      li
        position relative
        margin .8rem 0
        background #fff

  .info-box2:after, .info-box2:before, .content-box2:after, .content-box2:before
    content: " "
    display table

  .info-box2:after, .content-box2:after
    clear both

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
        height 100%
        float left
        border-radius 5px
      i
        display block
        height 100%
        width 100%
        background-repeat no-repeat
        background-size cover
        background-position center

  @media (max-width: 480px)
    .comment-item-zan
      b
        right 2rem !important

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
