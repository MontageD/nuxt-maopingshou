<template>
  <section class="side_date">
    <div class="clocks">

      <div class="date">
        <li>{{dates}}</li>
      </div>
      <canvas id="canvas" width="240px" height=" 170px"></canvas>
    </div>


  </section>

</template>


<script>
  export default {
    created () {
      let that = this
      setInterval(() => {
        var date = new Date()
        that.hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        that.minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        that.second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        that.dates = (that.hours + ':' + that.minutes + ':' + that.second)
      }, 1000)
      //      this.date = new Date('00:00:00')
    },
    data () {
      return {
        dates: '',
        hours: '',
        minutes: '',
        second: '',
        date: [],
        year: '',
        month: '',
        day: '',
        canvas: '',
        ctx: '',
        clockImage: '',
        theta: '',
        clockRadius: 100,
        w: '',
        h: '',
        iAngle: 0
      }
    },
    methods: {
      clear () { // clear canvas function
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      },
      drawScene () {
        // main drawScene function

        this.clear() // clear canvas
        // get current time
        var date = new Date()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        hours = hours > 12 ? hours - 12 : hours
        var hour = hours + minutes / 60
        var minute = minutes + seconds / 60

        this.ctx.save()
        this.ctx.translate(120, 95)
        this.ctx.beginPath()
        this.drawCircleText(this.ctx, '/////////////', 0, 0, 50, 50, true, '#000')
        // draw numbers
        // draw hour
        this.ctx.save()
        var theta = (hour - 3) * 2 * Math.PI / 12
        this.ctx.rotate(theta)
        this.ctx.beginPath()
        this.ctx.moveTo(-15, -2)
        this.ctx.lineTo(-15, 2)
        this.ctx.lineTo(this.clockRadius * 0.3, 1)
        this.ctx.lineTo(this.clockRadius * 0.3, -1)
        this.ctx.fill()
        this.ctx.restore()

        // draw minute
        this.ctx.save()
        var theta = (minute - 15) * 2 * Math.PI / 60
        this.ctx.rotate(theta)
        this.ctx.beginPath()
        this.ctx.moveTo(-15, -1)
        this.ctx.lineTo(-15, 1)
        this.ctx.lineTo(this.clockRadius * 0.4, 1)
        this.ctx.lineTo(this.clockRadius * 0.4, -1)
        this.ctx.fill()
        this.ctx.restore()

        // draw second
        this.ctx.save()
        var theta = (seconds - 15) * 2 * Math.PI / 60
        this.ctx.rotate(theta)
        this.ctx.beginPath()
        this.ctx.moveTo(-15, -1)
        this.ctx.lineTo(-15, 1)
        this.ctx.lineTo(this.clockRadius * 0.5, 1)
        this.ctx.lineTo(this.clockRadius * 0.5, -1)
        this.ctx.fillStyle = 'red'
        this.ctx.fill()
        this.ctx.restore()
        this.ctx.restore()

        //        this.ctx.restore()
      },
      drawGrid (ctx, w, h, stroke, steps) {
        this.ctx.save()
        ctx.beginPath()
        for (var i = 0.5; i < w; i += steps) {
          ctx.moveTo(i, 0)
          ctx.lineTo(i, h)
        }
        for (var i = 0.5; i < h; i += steps) {
          ctx.moveTo(0, i)
          ctx.lineTo(w, i)
        }
        ctx.strokeStyle = stroke
        ctx.stroke()
        ctx.restore()
      },
      drawCircleText (ctx, text, x, y, radius, startAngle, isFill, color) {
        // 将startAngle角度转换成弧度
        var startRad = Math.PI * startAngle / 180
        // 所绘文本的长度
        var len = text.length
        // 每个字符所对应的弧度
        var numRadsPerLetter = Math.PI * 2 / len

        ctx.save()
        // 将坐标原点移到(x, y)
        ctx.translate(x, y)
        // 将坐标旋转startRad
        ctx.rotate(startRad)

        // 对字符做操作
        for (var i = 0; i < len; i++) {
          ctx.save()
          // 每个字符旋转
          ctx.rotate(i * numRadsPerLetter)

          // isFill为true填充, false为描边
          if (isFill) {
            ctx.fillStyle = color
            ctx.fillText(text[i], 0, -radius)
          } else {
            ctx.strokeStyle = color
            ctx.strokeText(text[i], 0, -radius)
          }
          ctx.restore()
        }
        ctx.restore()
      }
    },
    mounted () {
      this.canvas = document.getElementById('canvas')

      //      if (this.canvasSupport(this.canvas)) {
      //        alert('浏览器不支持canvas')
      //        return
      //      }
      this.ctx = this.canvas.getContext('2d')
      //      this.w = this.canvas.width = window.innerWidth
      //      this.h = this.canvas.height = window.innerHeight
      this.w = 250
      this.h = 200

      setInterval(this.drawScene, 1000) // loop drawScene
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .date
    position absolute
    left 50%
    top 1rem
    display flex
    justify-content center
    align-items center
    transform translate(-50%, -50%)
    li
      padding 3px 10px
      display flex
      align-items center
      justify-content center
      text-align center
      min-height 1rem
      background-color #000
      color #fff
      border-radius 5px

  .side_date
    box-shadow 0 0px 4px 0 rgba(0, 0, 0, .05)
    margin-bottom 10px
    background-color #fff

  .clocks
    height: 170px
    margin-bottom 10px
    position: relative
    width: 100%

</style>

