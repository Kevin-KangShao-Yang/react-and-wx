<template>
  <div class="about">
    <!-- count的值是：{{$store.state.count}} -->
    <!-- count的值是：{{count}} -->
    <!-- count的值是：{{$store.getters.getCount}} -->

    count的值是：{{getCount}}
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
  // computed: mapState({
  //   // 箭头函数可使代码更简练
  //   count: state => state.count
  // })

  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters('counter',[
      'getCount' // this.getCount ===> this.$store.getters.getCount
      // ...
    ])
  }
}
</script>
