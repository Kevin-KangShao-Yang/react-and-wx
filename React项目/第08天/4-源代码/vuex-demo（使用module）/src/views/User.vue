<template>
  <div>
    user的值是:{{myName}}<br/><br/>
    <!-- user的值是:{{getName}}<br/><br/> -->
    <input type="text" v-model="name"><br/><br/>
    <button @click="asyncSetName(name)">更改仓库中的name</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      name:''
    }
  },
  // computed: {
  //   ...mapGetters('user',['getName']) // this.getName ===> this.$store.user.getters.getname
  // },
  // computed: {
  //   ...mapState('user',{
  //     myName: 'name'
  //   }) // this.name ===> this.$store.user.state.name
  // },

  computed: mapState('user',{
      myName: 'name'
  }), // this.name ===> this.$store.user.state.name,
  methods: {
    ...mapActions('user',['asyncSetName']),
    xxx:function() {

    },
    yyy:function() {

    }
  }
  // methods: mapActions('user',['asyncSetName'])
}
</script>
