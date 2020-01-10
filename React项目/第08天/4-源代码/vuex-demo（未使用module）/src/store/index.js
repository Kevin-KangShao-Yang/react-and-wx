import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    count: 0
  },
  getters: {
    getCount(state) {
      return state.count + 100
    }
  },
  mutations: {
    addCount(state,payload){
      state.count += payload
    },
    minusCount(state,payload) {
      state.count -= payload
    }
  },
  actions: {
    asyncMinusCount(context,payload) {
      setTimeout(() => {
        context.commit('minusCount',payload)
      }, 2000)
    }
  },
  modules: {
  }
})
