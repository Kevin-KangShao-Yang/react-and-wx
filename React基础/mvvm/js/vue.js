function Vue (options) {
  // 监听者
  this.$watcher = new Watcher()

  // 1、把普通的 js 对象 转换成 Vue实例的 set/get
  for (const key in options.data) {
    Object.defineProperty(this, key, {
      set (value) {
        console.log(`set ${key} called`)
        // 更改数据
        options.data[key] = value

        // 发出一个事件通知，xxx 数据改变了
        this.$watcher.$emit(key, value)
      },
      get () {
        console.log(`get ${key} called`)
        return options.data[key]
      }
    })
  }

  // 2、遍历模板，监听数据改变事件，修改 Dom
  this.$watcher.$on('message', function (value) {
    document.querySelector('h1').innerText = value
  })

  this.$watcher.$on('message', function (value) {
    document.querySelector('span').innerText = value
  })

  this.$watcher.$on('count', function (value) {
    document.querySelector('p').innerText = value
  })
}
