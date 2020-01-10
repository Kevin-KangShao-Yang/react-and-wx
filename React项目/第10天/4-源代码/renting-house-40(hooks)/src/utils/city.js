// 不要直接从axios包中导入，应该从自己封装好的axios文件中导入
import { axios } from './axios'

const KEY = 'hkzf_city'

// 本地保存的城市
export const setLocalCity = city => {
  window.localStorage.setItem(KEY, JSON.stringify(city))
}

// 获取本地的城市
const getLocalCity = () => {
  return window.localStorage.getItem(KEY)
}

// 这句话一定要写，否则直接写 BMap 会报错
const BMap = window.BMap

/**
 * 暴露出去返回城市对象的方法
 * 一定要记住，该方法一定要返回Promise对象
 */
export const getCity = () => {
  /**
   * if (本地没有) {
   *   // 先利用百度地图定位的API，获取城市信息(只有城市名字和经纬度)
   *   // 接下来要调用服务端的接口，根据城市名字，获取城市对象信息
   *   // 通过创建的Promise的 resolve 方法把结果传递出去 【看文档】
   *   // 保存到本地
   * } else {{
   *   // 返回一个Promise对象，并且通过Promise的 resolve 方法把结果传递出去
   * }
   */
  // 获取本地保存的城市
  const city = getLocalCity()
  if (!city) {
    // 本地没有保存
    return new Promise((resolve, reject) => {
      // 先利用百度地图定位的API，获取城市信息(只有城市名字和经纬度)

      console.log('---本地没有---')
      const myCity = new BMap.LocalCity()
      myCity.get(async result => {
        // 接下来要调用服务端的接口，根据城市名字，获取城市对象信息
        const res = await axios.get('/area/info', {
          params: {
            name: result.name
          }
        })

        // 通过创建的Promise的 resolve 方法把结果传递出去 【看文档】
        resolve(res.data.body)

        // 保存到本地
        setLocalCity(res.data.body)
      })
    })
  } else {
    // 本地保存了
    // 下面这个写法 Promise.resolve 适用于一定能够正确返回值
    return Promise.resolve(JSON.parse(city))
  }
}
