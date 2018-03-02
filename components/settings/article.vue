<template>

  <div class="major-part">
    <p class="one-mark">我关注的主题</p>
    <div class="open1">
      <div class="open2" @click="changeClass"></div>
    </div>


    <ul class="setting-list">


      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>






      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>





      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>






      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



      <li
        :style="{'background-image': 'url(http://data.maopingshou.com/images/TxEgmgB4gqxGRKp8woYimt9Qu1ClhxnkhBoFLwfMq0hKx1517731476102.jpg)'}">
        <p class="list-title">
          这道题我不会做
        </p>
        <p class="list-btn">+</p>
        <div class="grey"></div>
      </li>



    </ul>


  </div>
</template>
<script>
  export default {
    mounted () {
    },
    methods: {
      changeClass () {
        console.log('hello')
        let div2 = document.getElementsByClassName('open1')[0]
        let div1 = document.getElementsByClassName('open2')[0]
        div1.className = (div1.className === 'close1') ? 'open1' : 'close1'
        div2.className = (div2.className === 'close2') ? 'open2' : 'close2'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .edit-btn span
    color #007fff
    font-size 1rem

  .profile-input
    position relative
    input
      outline none
      border none
      font-size .9rem

  .one-mark
    font-size 1.5rem
    margin 1rem 0
    font-weight 800
    margin-bottom 2rem

  .setting-list:after, .setting-list:before
    content: " "
    display table

  .setting-list:after
    clear both

  .setting-list
    li
      background-size cover
      background-repeat no-repeat
      background-position center
      border-radius 15px
      height 5rem
      width 5rem
      float left
      margin-right 2rem
      display inline-block
      border 1px solid #f1f1f1
      padding .5rem
      position relative
      margin-bottom 1rem
      .grey
        height 100%
        width 100%
        background-color rgba(0, 0, 0, .4)
        border-radius 15px
        position absolute
        left 0
        top 0
        z-index 1
      .list-title
        font-weight 600
        color #fff
        height 1rem
        position relative
        z-index 10
      .list-btn
        position absolute
        width 2.8rem
        left 50%
        transform translate(-50%, 0)
        height 1rem
        background-color #007fff
        color #fff
        bottom .3rem
        text-align center
        font-size 14px
        display flex
        align-items center
        justify-content center
        z-index 8
        border-radius 3px
        font-weight 600
        cursor pointer

  .items
    display flex
    .title
      display flex
      align-items center
      width 10rem
      color #333
      font-size 1rem
      flex 1
    .profile-input
      flex 3
      display flex
      justify-content space-around

  .info-box
    height 100%
    display flex
    align-items flex-start
    .username
      font-size 1.3rem
      display block
      width 100%
      line-height 1.2
    .position
      display block
      width 100%
      line-height 1.3
      margin-top .4rem
      font-size 1rem
    .intro
      display block
      width 100%
      line-height 1.3
      margin-top .4rem
      font-size 1rem

  .avatar
    height 4rem
    width 4rem
    display block
    border-radius 50%
    margin-right 1rem

  .settings-main
    max-width 960px
    width 100%
    position relative
    margin 0 auto
    min-height 5rem
    margin-top 1.2rem
    display flex
    margin-bottom 6rem

  .user-info
    flex 1 1 auto

  .major-area
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    min-width 0
    min-height 3rem
    padding 2rem 2.5rem
    background-color #fff
    display flex
    align-items center

  .major-options
    width 100%
    background-color #fff
    min-height 3rem
    margin-top 1rem
    .major-menu
      width 100%
      box-shadow inset 0 -1px 0 hsla(240, 2%, 90%, .5)
      height 3.167rem
      position relative
      display flex
      align-items center
      li
        width 5.5rem
        flex 0 0 auto
        display flex
        height 100%
        align-items center
        justify-content center
        color #31445b
        font-size .9rem
        padding 0 .5rem
        a.active
          box-shadow inset 0 -2px 0 #3780f7
          color #3780f7
      li.active
        box-shadow inset 0 -2px 0 #3780f7
        color #3780f7

  .major-part
    background-color #fff
    min-height 10rem
    width 100%
    padding .7rem 4rem 7rem

  .minor-area
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    margin-left 1rem
    flex 0 0 auto
    margin-bottom 6rem
    width 15rem
    max-height 3rem
    background-color #fff

</style>
