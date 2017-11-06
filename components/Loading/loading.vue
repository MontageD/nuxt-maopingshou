<template>
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
  export default {
    created () {
      this.start()
    },
    data: () => ({
      loading: false
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.finish()
      })
    }
  }
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
  }
</style>
