import React, { Component } from 'react'

export default class Index extends Component {
  state = {
    cityObj: null, // 左边城市数据对象
    cityIndexList: null // 右边城市索引数据
  }

  componentDidMount() {
    // 获取城市列表数据
    this.getCityListData()
  }

  getCityListData = async () => {
    const result = await this.http.get('/area/city?level=1')

    // 1、遍历服务端返回的数据
    const tempObj = {} // 临时对象
    result.data.body.forEach(item => {
      // 截取每个城市对象的简写的首字母
//substring(beginIndex , endIndex)  将 数组中 beginIndex 下标 的元素 一直 截 到 endIndex 前面一个元素，并返回 截取的新数组
      const firstLetter = item.short.substring(0, 1)
      // 判断该首字母是有已经有数据了，如果有数据了，则push，否则就把他放在一个数组中
      if (tempObj[firstLetter]) {
        tempObj[firstLetter].push(item)
      } else {
        tempObj[firstLetter] = [item]
      }
    })

    // 2、处理右边的城市索引列表数据
        //Object.keys() 方法:  一个表示给定对象的所有可枚举属性的字符串数组。
    //sort()方法: (1)字母按a-z排序,(2)sort(加/减函数)数值大小循序排列
    const cityIndexList = Object.keys(tempObj).sort()

    // 3、获取热门城市数据
    const hotResult = await this.http.get('/area/hot')
    // 取出热门城市数据
    const hotCityList = hotResult.data.body
    // 处理热门城市右边的数据
    cityIndexList.unshift('hot')
    // 处理左边的数据
    tempObj['hot'] = hotCityList

    console.log(tempObj, cityIndexList)
  }

  render() {
    return <div>城市列表</div>
  }
}
