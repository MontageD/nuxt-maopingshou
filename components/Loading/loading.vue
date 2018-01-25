<template>
  <div class="load" ref="load" v-show="loading">
  </div>
</template>
<script>
  export default {
    created () {
      //            this.start()
    },
    data: () => ({
      loading: true
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      },
      changeColor () {
        let a = parseInt(Math.random() * 255)
        let b = parseInt(Math.random() * 255)
        let c = parseInt(Math.random() * 255)
        //   let opacity = parseInt((Math.random()) * 10)
        let color = 'rgba(' + a + ',' + b + ',' + c + ',' + 1 + ')'
        this.$refs.load.style.color = color
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.changeColor()
        setTimeout(() => {
          this.finish()
        }, 200)
        //        this.finish()
      })
    }
  }
</script>

<style scoped>
  .load {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    text-align: center;
    padding-top: 200px;
    font-size: 23px;
    font-family: sans-serif;
    display: block;
  }
</style>
