<template>
  <div class="home">
    <!-- <button>-</button>&nbsp;&nbsp;&nbsp;<button @click="addCount(5)">+</button> -->
    <button @click="minus(3)">-</button>&nbsp;&nbsp;&nbsp;<button @click="add(3)">+</button>
  </div>
</template>

<script>
import { mapMutations,mapActions } from 'vuex'
export default {
  name: 'home',
  methods:{
    // 下面的方法是直接拿着 $store 去操作
    add() {
      this.$store.commit('counter/addCount',2)
    }
   // 如果mapMutations中接收的是一个数组，那么我们组件的方法 addCount 必须和 mutation的方法一样
    //  ...mapMutations([
    //    'addCount' // this.addCount(5) ===> this.$store.commit('addCount',5)
    //  ])
    // 如果组件的方法 add 和 mutation的方法不一样,则要传递一个对象
    // 如果我们使用 module 进行 store 的拆分，则需要加上 命名空间
    // ...mapMutations('counter',{
    //   add: 'addCount' // this.add ===> this.$store.commit('addCount',3)
    // }),
    // minus(num){
    //   this.$store.dispatch('asyncMinusCount',num)
    // }
    ,
    ...mapActions('counter',{
      minus: 'asyncMinusCount'
    })
  }
}
</script>
