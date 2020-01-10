/**
 * 实现一个类似于 GlobalBus 的函数模块
 * 支持注册/发布自定义事件的方式
 * 它是一种编程方式，和具体的业务无关
 */

function Watcher () {
  this.handlers = {
    // a: [处理函数，处理函数]
    // b: [处理函数]
  }
}

Watcher.prototype.$on = function (eventName, handler) {
  this.handlers[eventName] = this.handlers[eventName] || []

  this.handlers[eventName].push(handler)
}

/**
 * $emit('事件类型',123)
 * eventName 接收了第一个参数
 * ...args 接收了剩余的所有参数 [可选参数1,可选参数2,可选参数n......]
 */
Watcher.prototype.$emit = function (eventName, ...args) {
  this.handlers[eventName] &&
    this.handlers[eventName].forEach(fn => {
      // args为数组
      // fn(args)

      fn(...args)
    })
}

// var w = new Watcher()

// w.$on('a',function(data){
//   console.log('a1',data)
// })

// w.$on('a',function(data1,data2){
//   console.log('a2',data1,data2)
// })

// w.$on('a',function(){
//   console.log('a3')
// })

// w.$on('b',function(){
//   console.log('b1')
// })

// w.$on('c',function(){
//   console.log('c1')
// })

//  xxx.$on('a',处理函数)
//  xxx.$on('a',处理函数)
//  xxx.$on('b',处理函数)

//  xxx.$emit('a',可选参数)
