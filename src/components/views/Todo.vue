<template>
  <div>
    <AddTodo />
    <FilterTodo />
    <TodosList />
  </div>
</template>

<script>
import TodosList from '../../components/todo/TodosList'
import AddTodo from "../../components/todo/AddTodo.vue";
import FilterTodo from "../../components/todo/FilterTodo.vue";

export default {
  name: "todo",
  components: {
    TodosList,
    AddTodo,
    FilterTodo
  }
};
</script>

<style>

</style>
