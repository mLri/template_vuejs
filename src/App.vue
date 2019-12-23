<template>
  <div id="app">
    <div class="container">
      <Navbar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Todo from './components/views/Todo'
import Login from './components/views/Login'
import Navbar from './components/navbar'

export default {
  name: "app",
  components: {
    Todo,
    Login,
    Navbar
  }
};
</script>

<style>
body {
  font-family: "Arial Narrow", Arial, Helvetica, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
}
</style>
