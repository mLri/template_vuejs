<template>
  <div>
    {{ isLoggedIn }}
    <router-link to="/">Todo</router-link>|
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <router-link v-if="isLoggedIn" to="/login"><span @click="logout">Logout</span></router-link>
  </div>
</template>

<script>
/* eslint-disable */
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('auth')

export default {
  name: "Navbar",
  methods: {
    ...mapActions(['logout'])
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
};
</script>

<style scoped>
</style>