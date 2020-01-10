import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入我们的counter
import counter from './modules/counter'
import user from './modules/user'

export default new Vuex.Store({
  strict: true,
  modules: {
    counter: counter,
    user
  }
})
