<template>

  <div class="major-part">
    <p class="one-mark">文章管理</p>
    <div class="open1">
      <div class="open2" @click="changeClass"></div>
    </div>


    <ul class="setting-list">


      <li class="items">
        <span class="title">文章展示</span>
        <div class="input-box profile-input ">


          <div class="wrapper">
            <input id="dn" type="checkbox"/>
            <label class="toggle" for="dn">
              <span class="toggle--handler"></span>
            </label>
          </div>


        </div>
      </li>


      <li class="items">
        <span class="title">评论展示</span>

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

  .setting-list
    li
      padding 2rem 0
      border-top 1px solid #f1f1f1

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
    padding 2.7rem 4rem 7rem

  .minor-area
    box-shadow 0 1px 2px 0 rgba(0, 0, 0, .05)
    margin-left 1rem
    flex 0 0 auto
    margin-bottom 6rem
    width 15rem
    max-height 3rem
    background-color #fff

  label > * {
    -webkit-transform: translateZ(0) scale(1, 1);
    transform: translateZ(0) scale(1, 1);
  }

  .wrapper > * {
    cursor: pointer;
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 150px;
    height: 75px;
    background: #F1F1F1;
    box-shadow: inset 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 75px;
  }

  .wrapper .toggle--handler {
    background: -webkit-linear-gradient(top, #F5515F, #CD2942);
    background: linear-gradient(to bottom, #F5515F, #CD2942);
    width: 60px;
    height: 60px;
    display: block;
    box-shadow: 0px 5px 40px rgba(245, 81, 95, 0.8);
    border-radius: 60px;
    margin: 7.5px;
    position: relative;
    z-index: 2;
    -webkit-transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition: all 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .wrapper .toggle--handler:after {
    content: "";
    position: absolute;
    border-radius: 60px;
    background: -webkit-linear-gradient(top, #468EFF, #2B68FF);
    background: linear-gradient(to bottom, #468EFF, #2B68FF);
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-transition: all 200ms;
    transition: all 200ms;
  }

  .wrapper .toggle--handler:before {
    content: "";
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    border-radius: 60px;
    background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>assets/icons/cross</title><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path d="M0 0h24v24H0z"/><path d="M13.414 11.96l6.546-6.546L18.545 4 12 10.545 5.455 4 4.04 5.414l6.546 6.546-6.89 6.89 1.414 1.413 6.89-6.89 6.89 6.89 1.414-1.414-6.89-6.89z" fill="#FFF"/></g></svg>');
    -webkit-transition: all 200ms;
    transition: all 200ms;
    -webkit-transform: translate(-50%, -50%) rotate(180deg);
    transform: translate(-50%, -50%) rotate(180deg);
  }

  .wrapper:after {
    content: "";
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 80px;
    height: 2px;
    background: #E5E5E5;
    pointer-events: none;
  }

  input {
    position: absolute;
    left: -999em;
  }

  input:checked + .toggle .toggle--handler {
    -webkit-transform: translateX(75px);
    transform: translateX(75px);
    background: -webkit-linear-gradient(top, #468EFF, #2B68FF);
    background: linear-gradient(to bottom, #468EFF, #2B68FF);
    box-shadow: 0px 5px 40px rgba(70, 142, 255, 0.8);
  }

  input:checked + .toggle .toggle--handler:after {
    opacity: 1;
  }

  input:checked + .toggle .toggle--handler:before {
    background-image: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>assets/icons/cross copy</title><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path d="M0 0h24v24H0z"/><path fill="#FFF" d="M8.293 16.707l.707.707.707-.707 11-11-1.414-1.414-11 11h1.414l-4-4-1.414 1.414z"/></g></svg>');
    z-index: 5;
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
</style>
