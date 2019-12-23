/* eslint-disable */
// axios.get('your_url', {withCredentials: true}); //for GET
// axios.post('your_url', data, {withCredentials: true}); //for POST
// axios.put('your_url', data, {withCredentials: true}); //for PUT
// axios.delete('your_url', data, {withCredentials: true}); //for Delete
import axios from "axios"
import { longStackSupport } from "q"

const state = {
  isLoggedIn: false,
  email: '',
  token: '',
  profile: {}
}

const getters = {
  myUser: (state) => state,
  isLoggedIn: (state) => {
    if(localStorage.getItem('isLoggedIn')) {
      state.isLoggedIn = true
    }
    return state.isLoggedIn
  },
  myProfile: (state) => state.profile
}

const actions = {
  async myAccount({ commit, state}) {
    console.log('state -> ', state)
    console.log(state.token)
    return new Promise(async (resolve, reject) => {
      const res = await axios("http://localhost:3000/api/user/account", {
        method: "get",
        headers: { Authorization: `Bearer ${state.token}` },
        withCredentials: true
      })
      console.log('res in action -> ', res)
      if(res && res.data) {
        commit('setProfile', res.data)
        resolve(res.data)
      }
    })
  },
  async login({ commit }, data) {
    const res = await axios.post('http://localhost:3000/api/user/signin', 
      data, 
      { withCredentials: true }
    )
    console.log('res -> ', res)
    if(res.status === 200) {
      commit('setUser', res.data)
    }
  },
  async getRefreshToken({ commit }) {
    // const res = await axios.post('http://localhost:3000/api/user/refresh_token',{}, {credentials: 'include'})
    // console.log('res -> ', res)
    return new Promise(async (resolve, reject) => {
      const res = await axios("http://localhost:3000/api/user/refresh_token", {
        method: "post",
        withCredentials: true
      })
      if(res.status === 200) {
        commit('setNewToken', res.data.accessToken)
        resolve(res.data.accessToken)
      }
    })
  },
  async logout({ commit }) {
    return new Promise(async (resolve, reject) => {
      const res = await axios("http://localhost:3000/api/user/logout", {
        method: "post",
        withCredentials: true
      })
      console.log('res -> ', res)
      commit('logout')
      resolve(res.data)
    }) 
  }
}

const mutations = {
  setNewToken: (state, newToken) => {
    state.token = newToken
  },
  setUser: (state, user) => {
    state.email = user.email
    state.token = user.accessToken
    state.isLoggedIn = true
    localStorage.setItem("isLoggedIn", true);
    return state
  },
  setProfile: (state, profile) => {
    return state.profile = profile
  },
  logout: (state) => {
    localStorage.removeItem("isLoggedIn")
    state.isLoggedIn = false
    state.token = ''
    state.profile = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}