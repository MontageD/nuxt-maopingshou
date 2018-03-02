<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <form v-if="!$store.state.option.authUser" @submit.prevent="login">
      <p class="error" v-if="formError">{{ formError }}</p>
      <p><i>To login, use <b>demo</b> as username and <b>demo</b> as password.</i></p>
      <p>Username: <input type="text" v-model="formUsername" name="username"/></p>
      <p>Password: <input type="password" v-model="formPassword" name="password"/></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      Hello {{ $store.state.option.authUser.username }}!
      <pre>I am the secret content, I am shown only when the use is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">Logout</button>
    </div>
    <p>
      <nuxt-link to="/secret">Super secret page</nuxt-link>
    </p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    created () {
      axios.get('/good')
        .then((res) => {
          console.log(res)
        })
    },
    data () {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    methods: {
      login () {
        try {
          this.$store.dispatch('login', {
            username: this.formUsername,
            password: this.formPassword
          })
          console.log('$store.state.authUser' + this.$store.state.option.authUser)
          //          this.formUsername = ''
          //          this.formPassword = ''
          //          this.formError = null
        } catch (e) {
          this.formError = e.message
        }
      },
      async logout () {
        try {
          await this.$store.dispatch('logout')
        } catch (e) {
          this.formError = e.message
        }
      }
    }
  }
</script>

<style>
  .container {
    padding: 100px;
  }

  .error {
    color: red;
  }
</style>
