<template>
  <div id="app">
    <section class="wrap">
      <section class="leftside-top">
        <header class="logo-header">
          <i :title="switchTitle" class="iconfont switchShrink" ref="switchShrink" @click="changeSwitch">
          </i>
          <div class="logo"></div>
          <a href="/search" class="logo-wrapper">
            <img src="~assets/img/logo3.png">
          </a>
          <div class="name"><p>
            MAOPING
          </p>
            <p>
              猫评手
            </p></div>
        </header>
        <section class="search-bar">
          <input type="text" placeholder="中国有嘻哈"/>
          <i title="点击搜索" class="material-icons searchIcon" ref="searchIcon">search</i>
        </section>
      </section>
      <section class="avatar">
        <div class="tools">
          <i class="iconfont tooltip">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAABj0lEQVRoQ+2b4U3DQAyFv05AuwFswgZlhG4ATABsQDfoCIwEEwATgIya6hTlRy7PJ13Eu19V4rNiv+dL/ORugC3wBBzOv6lYX8AJeBztyfD5AoT/YaX43ACvwH1FkFOmR+ChuNGtzwj4cwGy46DfgZviYobPQHeX7TMC/hHRHbaHr2F169MBC2gbYSF5zcrElBZQMaWF5JnSWa9P17BAQ9ewkDzXcG81/AFcJ39LN/EZdfcG7EX6jdvDbn1GwNFYR/96B1xVBh4ohADwPCEAxPXbZJ/yc5Yna2Ws6zR3wOvEbf5TDzVsEW9+zv4sLeIlCIMW8SpZN2nubknIorslIXnulnrrlgIRU9qUrs9AOmv8WqoH4bIjHY0W54IRNsLzMtBEcGshDFrEmwfoxer7LOKVAy1xUxEGm/q0plWJ8OrM/yXCGRNunsTrdbrPk3jCKeRvaSF5lngs8Sykj9vDhYmziCckrtyafvKb0gIy6WhY0xLQKF/s3f4/wQh3hLBFvF6n+9RJvKaC24jBKcLgL+8/6hY00XYGAAAAAElFTkSuQmCC">
            <div class="tooltip-inner">
              小工具
            </div>
          </i> <!----></div>
        <div class="user">
          <img :src="userLogo" alt="">
        </div>
      </section>
    </section>

    <keep-alive>
      <mains></mains>
    </keep-alive>


    <div class="title"></div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import mains from '~/components/main/main'
  export default {
    data () {
      return {
        switchTitle: '展开',
        rotate: 0,
        userLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAD5klEQVRoQ+2aj5ENQRCHfxcBGSACRIAIEAEiQASIABEgAkSACBABMiAC6lNvqramdmZ6umf2vbrbqXp1V/d2e/vr/zN7Z7pg6+yC8WoHPu8e3z28e/icWWDLkL4l6bKkG5kNv0n6LenLFradCQzYA0m3VyBLbMB/kPRREr8PXzOAgXzSAVmDfyXp3UjqkcD3JL2UdHWkgpJ+Snok6fMIuSOAycs3kgCeuQh1wMl394oCk6fvJ3i1BIS370fyOwKMR/EsHt5y4WE8jce7lxcYWDx7zIWnu6E9wITxpyN4Njcunr7TG969wITv1w1zthVB5PTNnkLWC0wYz67GLcj8e8Ka8DatHuBTyNsSFKFt6tM9wD+CofxHEpMTHkljI0MKhmQyu2Jy0fpFhPY1y/1W4IeHFmSRuXYNszEySkMDtQFjMJZ6F63qbetmKzCFKt/ltGSn75mFgbUsFPZCEzUUsOqyAAMKsGd9dxgKxa97HnYAru6yLMCE2mOnAuZispBPXlMvPOuFpOe1Gy3A3nBmQ89e2LOouBwY9K7mMy3Af3uferj+6aEQeW6PFMkqUwsYDzFGepYnnNNzImFN4SrmcQs4Mmy0ZLeM6I2s6qaipRQF4FlLs8L3LdktsV7gauFqKbUDt9yy+D6Sw5HefzQPm0a9ggEjVToEHClazM/erSQbjLsd0bS8NFS0Im0JJaotogAUaUmIrKZSq2ghwFstuZeJCQV6Fn3fO6HxnNDggYDIMM/97IDIZ8uK5C7yh4yWkdaUIF8fNvk16CgssodsHiItYgnIiQQnE2srmrdJZrNmWHJ4RFgjo1Y9MSr5fskS94VrTHtvK7An3DjDAoIPbabk3aX+FKv0wQg9BjD1fSswSqFw7aDt16FAUeT4WAAtDk0G4KCvZACebXpr2QNc6sl4EmWaB2gWuso1tYM+8xjbA4wu+QQELIaY8ra+AJ8f9PUcEnb/YxpWBi6FNr9j3dA72w7P83wGk3SCSqHC4Obn93oY3fKKuhV0/uLdFV0eYKDzTQXQtJ1RhSp3OgWJ91rJs8Cig+n1ylKYF3jN04QVUxlT1cjFETFy04t3l2eTQhHgBE0hW7YrvM2JZbf1MyuRm/yTzPKNB+0Hz7qLZBQYHUvtgvDmEJ99sTXUCV32wbS5vK9Sjfm7uUCthdkI4CQXj9Ay1oYTgNNAkkbVFCHpJ55cGx6oxIBGI+a/niOBEzhjKAp63w8lOYASIUMHmhnASWG8BTyet742YT+LJ4G0pkFXgZwJnCtCyJLvGCKFLlB8yEt3Ieoh3hK4R69p1+7A00x7IoJ3D5+II6apsXt4mmlPRPA/D52/PSK8M18AAAAASUVORK5CYII='
      }
    },
    created () {
    },
    methods: {
      changeSwitch () {
        if (this.rotate === 180) {
          this.rotate = 0
        } else {
          this.rotate = 180
        }
        this.$refs.switchShrink.style['transform'] = `rotate(${this.rotate}deg)`
      }
    },
    components: {
      mains
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $switch-background = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAeUlEQVRIS+2UwQ2AIBRDHxu4iY6gm+lkOoIj6AaOwM1o8lEaErh8jqS06UtDoMIJFTLwEImyhWsEVsnlLZ6A7XllhXTAUBCyA9dfSIG//dTXJSFthkud8ALMX9WaNZF454i9SQ6lW5P6u3rB5QQOdV0+4SQxn7AwPoiRdQoaQM/fOQAAAABJRU5ErkJggg=='



  section
    /*border-bottom: 1px solid #e6e9ed*/
    justify-content: space-between
    -webkit-box-pack: justify
    .leftside-top
      position: relative
      display: flex
      align-items: center
      justify-content: center
      -webkit-box-pack: center
      -webkit-box-align: center
      width: auto
      header
        width: 175px
        .iconfont
          cursor: pointer
          transition: all .25s .15s
          color: #9b9b9b
          height: 20px
          width: 20px
          display: block
        .iconfont.switchShrink
          color: #4a4a4a
          transform: rotate(0deg)
          background-image: url($switch-background)
          background-size: 100% 100%
    .search-bar
      position: relative
      margin-left: 20px
      i
        position: absolute
        right: 0
        width: 40px
        height: 40px
        line-height: 40px
        cursor: pointer
        text-align: center
        transition: all .25s
      .searchIcon:hover
        color: #fff
        background-color: #e2455b
      input
        background: #fff
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12)
        border-radius: 4px
        color: #4a4a4a
        font-size: 13px
        width: 224px
        height: 40px
        padding: 0 15px
        padding-right: 50px
    .avatar
      border-bottom: 0
      display: flex
      align-items: center
      justify-content: center
      -webkit-box-pack: center
      -webkit-box-align: center
      .tools
        position: relative
        .iconfont
          cursor: pointer
      .user
        margin-left: 35px
        position: relative
        img
          height: 35px
          width: 35px
          border-radius: 50%
          cursor: pointer

  section.wrap
    width: 100%
    height: 100px
    padding: 0 25px
    border-bottom: 1px solid #e6e9ed
    justify-content: space-between
    -webkit-box-pack: justify

  section.wrap, section.wap, .leftside-top
    display: flex
    align-items: center
    -webkit-box-align: center

  .logo-header
    position: relative
    height: 100px
    /*border-bottom: 1px solid #e6e9ed*/
    display: flex
    align-items: center
    justify-content: center
    -webkit-box-pack: center
    -webkit-box-align: center
    .logo-wrapper
      width: 50px
      height: 50px
      margin-left: 20px
      img
        width: 100%
        height: 100%
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        -webkit-box-pack: center
        -webkit-box-align: center
    .name
      margin-left: 10px
      p
        margin: 0
        color: #4a4a4a
      p:last-child
        margin-top: 7px
        font-size: 13px
        font-family: SourceHanSansCN-Medium




  .tooltip
    img
      height: 20px
      width: 20px




  .tooltip-inner
    position: absolute
    background-color: #4a4a4a
    color: #fff
    line-height: 2
    padding: 3px 10px
    max-width: 150px
    border-radius: 3px
    left: 0
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2)
    display: none
    animation: fadeIn .3s


</style>

