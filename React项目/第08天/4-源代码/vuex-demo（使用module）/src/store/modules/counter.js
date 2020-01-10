export default {
  namespaced: true,
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
  }
}
