import React, { Component } from 'react'

import styles from './index.module.scss'

// 导入封装好的子组件
import NavHeader from '../../components/NavHeader'
import HouseItem from '../../components/HouseItem'

export default class Index extends Component {
  state = {
    houses: null
  }

  componentDidMount() {
    // 获取已发布房源列表
    this.getHouses()
  }

  getHouses = async () => {
    const result = await this.http.get('/user/houses')

    if (result.data.status === 200) {
      this.setState({
        houses: result.data.body
      })
    }
  }

  renderHouses = () => {
    return (
      <div className={styles.houses}>
        {this.state.houses.map(item => {
          return <HouseItem key={item.houseCode} {...item} />
        })}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        <NavHeader>我的出租列表</NavHeader>
        {this.state.houses && this.renderHouses()}
      </div>
    )
  }
}
