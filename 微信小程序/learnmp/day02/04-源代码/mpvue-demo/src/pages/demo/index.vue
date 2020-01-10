<template>
   <div>
      <h2>{{message}}</h2>
      <input type="text" v-model="message">
      <button @click="sayHello('joven')">点我呀</button>
   <ul>
      <li v-for="(item, index) in bookList" :key="index">
         {{item}}--{{index}}
      </li>
   </ul>
   <div class="box" :class="{red:isRed}" @click="isRed=!isRed"></div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      message: '中分还带波浪，是不是很萌',
      bookList: [
        '月亮与十六便士',
        '三体',
        '人类捡屎'
      ],
      isRed: true
    }
  },
  methods: {
    sayHello (name) {
      wx.showToast({
        title: name
      })
    }
  }
}
</script>

<style>
   .box{
      width: 100px;
      height: 100px;
      border:1px solid #666;
      border-radius: 50px;
   }
   .red{
      background-color: red;
   }
</style>