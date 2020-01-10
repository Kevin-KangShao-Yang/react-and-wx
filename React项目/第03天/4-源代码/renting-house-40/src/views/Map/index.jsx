import React, { Component } from 'react'
import styles from './index.module.scss'

// 导入NavHeader 子组件
import NavHeader from '../../components/NavHeader'

// 获取城市
import { getCity } from '../../utils/city'

const BMap = window.BMap

export default class Index extends Component {
  componentDidMount() {
    // 初始化地图
    this.initMap()
  }

  initMap = async () => {
    const { label } = await getCity()

    this.map = new BMap.Map('container')
    // 逆地址解析，根据当前的城市名称，获取它的经纬度
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          // 必须的，设置中心点和地图缩放级别
          this.map.centerAndZoom(point, 11)
        }
      },
      label
    )
  }

  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    )
  }
}
