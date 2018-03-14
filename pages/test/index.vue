<template>
  <div class="foods-wrapper" ref="foodsWrapper">
    <div>
      <ul class="ul">
        <li v-for="item in goods" :class="item.type==1 ? 'food-lists' : 'food-list'">
          {{item.type}}
        </li>
      </ul>
    </div>


  </div>

</template>
<script>
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        pulldown: true,
        goods: [],
        options: {
          pullDownRefresh: {
            threshold: 20, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
            stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
          },
          pullUpLoad: {
            threshold: 10 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
          },
          click: true,
          probeType: 3,
          startY: 0,
          scrollbar: false
        },
        states: false,
        searchCondition: 0
      }
    },
    created () {
      this.$nextTick(() => {
        this._initScroll()
        this.setData()
      })
    },
    methods: {
      _initScroll () {
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, this.options)
        // 下拉
        let _this = this
        this.foodsScroll.on('pullingDown', () => {
          console.log('下拉ing')
          for (var i = 0; i < 10; i++) {
            this.goods.push({type: '下拉参数'})
          }
          this.goods.push({type: '---------'})
          // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
        })
        // 上拉
        this.foodsScroll.on('pullingUp', () => {
          let __this = this
          _this.foodsScroll.refresh()
          setTimeout(function () {
            for (var i = 0; i < 20; i++) {
              __this.goods.push({type: '上拉参数'})
            }
            __this.goods.push({type: '---------'})
            console.log('上拉刷新')
            alert('上拉刷新')
            //            _this.foodsScroll.finishPullDown()
            _this.foodsScroll.finishPullUp()
            _this.foodsScroll.refresh()
          }, 2000)
        })
      },
      pullingDownUp () {
        this.foodsScroll.finishPullDown()
        this.foodsScroll.finishPullUp()
        this.foodsScroll.refresh()
      },
      setData () {
        this.goods = [
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0}, {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0}, {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0},
          {type: 1},
          {type: 0}
        ]
        this.$nextTick(() => {
          this.pullingDownUp()
        })
      }
    }
  }
</script>
<style>
  .foods-wrapper {
    border: 1px solid #000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20rem;
    width: 100%;
    text-align: center;
    overflow: hidden;
  }
</style>
