export default {
  namespaced: true, // 加上命名空间
  state: {
    name: ''
  },
  getters: {
    getName(state){
      return `Hello ${state.name}`
    }
  },
  mutations: {
    setName(state,payload){
      state.name = payload
    }
  },
  actions: {
    asyncSetName({commit},payload){
      setTimeout(() => {
        commit('setName',payload)
      }, 1000);
    }
  }
}
