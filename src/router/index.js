/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Todo from '../components/views/Todo'
import Login from '../components/views/Login'
import Notfound from '../components/views/Notfound'

import store from '../store/'

Vue.use(Router)

axios.interceptors.response.use(res => {
  console.log('response intercep -> ', res)
  return res
}, async (err) => {
  console.log('err -> ', err)
  const {
    config,
    response: { status, data }
  } = err
  const originalReq = config
  // console.log('data.message -> ', data.message)

  if (data.message == 'jwt expired') {
    /* get new token */
    const objToken = await store.dispatch('auth/getRefreshToken')
    /* set token */
    originalReq.headers.Authorization = `Bearer ${objToken.accessToken}`
    console.log('call original request -> ', originalReq)
    const res = await axios(originalReq)
    console.log('res after call original request -> ', res)
    return res
  }
})

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: Todo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'Notfound',
      component: Notfound
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('isLoggedIn -> ', localStorage.getItem('isLoggedIn'))
    if (!localStorage.getItem('isLoggedIn')) {
      next({
        path: '/login'
      })
    } else {
      console.log('token beforeEach => ', store.state.auth.token)
      if (!store.state.auth.token) {
        // get new token
        console.log('get new token ...')
        store.dispatch('auth/getRefreshToken').then(res => {
          console.log('r -> ', res)
          next()
        })
      } else {
        next()
      }
      // next()
    }
  } else {
    next()
  }
})

export default router