import Vuex from 'vuex'
import Vue from 'vue'

import todos from './modules/todos'
import auth from './modules/auth'

/* load Vuex */
Vue.use(Vuex)

/* create store */
export default new Vuex.Store({
  // strict: true,
  modules: {
    todos,
    auth
  }
})

