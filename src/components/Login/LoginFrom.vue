<template>
  <div>
    <h1>Login</h1>
    <div>
      token = {{ myUser.token }}
      <br/>
      profile = {{ myProfile.firstName }}
    </div>
    <form @submit.prevent="onSubmit">
      <div>
        <input v-model="email" type="email">
      </div>
      <div>
        <input v-model="password" type="password">
      </div>
      <div>
        <input type="submit" value="submit">
      </div>
    </form>
    <input @click="getRefreshToken" type="submit" value="refreshToken">
    <input @click="myAccount" type="submit" value="myAccount">
  </div>
</template>

<script>
/* eslint-disable */
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('auth')

export default {
  name: "LoginFrom",
  data() {
    return {
      email: '',
      password: '',
      token: '',
    }
  },
  methods: {
    ...mapActions(['login', 'getRefreshToken', 'myAccount']),
    async onSubmit() {
      console.log('email -> ', this.email)
      console.log('password -> ', this.password)
      const login = await this.login({email: this.email, password: this.password})
      console.log('login -> ', login)
      this.email = ''
      this.password = ''

      /* check result from login */
      this.$router.push({ path: '/' })
    },
    refreshToekn() {
      console.log('get refresh token')
    }
  },
  computed: {
    ...mapGetters(['myUser', 'myProfile'])
  }
};
</script>

<style scoped>
</style>