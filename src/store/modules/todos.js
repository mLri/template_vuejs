/* eslint-disable */
import axios from "axios"
import authStore from '../../store'

const state = {
  todos: []
}

const getters = {
  allTodos: (state) => state.todos
}

const actions = {
  async fetchTodos({ commit }) {
    const res = await axios("http://localhost:3000/api/todo/", {
        method: "get",
        headers: { Authorization: `Bearer ${authStore.state.auth.token}` },
        withCredentials: true
      })
    if(res.status === 200) commit('setTodos', res.data)
  },
  async addTodo({ commit }, todo) {
    const res = await axios.post('http://localhost:3000/api/todo/add', 
      {...todo, userId: authStore.state.auth.userId }, 
      { 
        headers: { Authorization: `Bearer ${authStore.state.auth.token}` },
        withCredentials: true 
      }
    )
    if(res.status === 200) commit('addTodo', res.data)
  },
  async deleteTodo({ commit }, id) {
    const res = await axios(`http://localhost:3000/api/todo/delete/${id}`, {
        method: "delete",
        headers: { Authorization: `Bearer ${authStore.state.auth.token}` },
        withCredentials: true
      })
    if(res.status === 200) commit('deleteTodo', id)
  },
  async filterTodo({ commit }, limit) {
    const res = await axios(`http://localhost:3000/api/todo/limit/${limit}`, {
        method: "get",
        headers: { Authorization: `Bearer ${authStore.state.auth.token}` },
        withCredentials: true
      })
    if(res.status === 200) commit('setTodos', res.data)
  },
  async updateTodo({ commit }, updTodo) {
    const res = await axios.put('http://localhost:3000/api/todo/complete', 
      updTodo, 
      { 
        headers: { Authorization: `Bearer ${authStore.state.auth.token}` },
        withCredentials: true 
      }
    )
    if(res.status === 200) commit('updateTodo', updTodo)
  }
}

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  addTodo: (state, newTodo) => state.todos.unshift(newTodo),
  deleteTodo: (state, id) => state.todos = state.todos.filter(todo => todo._id !== id),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo._id === updTodo._id)
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