<template>
  <div>
    <h3>Filter</h3>
    <select @change="filterTodo($event.target.options[$event.target.options.selectedIndex].innerText)">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapActions } from 'vuex'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('todos')

export default {
  name: 'FilterTodo',
  methods: {
    ...mapActions(['filterTodo'])
  }
}
</script>

<style scoped>

</style>