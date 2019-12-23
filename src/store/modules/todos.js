/* eslint-disable */
import axios from "axios"

const state = {
  todos: []
}

const getters = {
  allTodos: (state) => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
    commit('setTodos', res.data)
  },
  async addTodo({ commit }, todo) {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', todo)
    commit('addTodo', res.data)
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit('deleteTodo', id)
  },
  async filterTodo({ commit }, limit) {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
    commit('setTodos', res.data)
  },
  async updateTodo({ commit }, updTodo) {
    // const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
    // commit('updateTodo', res.data)

    axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo)
    commit('updateTodo', updTodo)
  }
}

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  addTodo: (state, newTodo) => state.todos.unshift(newTodo),
  deleteTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id)
    if(index !== -1) {
      state.todos.splice(index, 1, updTodo)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}