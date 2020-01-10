import React, { Component } from 'react'

import styles from './index.module.scss'

import SeachHeader from '../../components/SearchHeader'

import { getCity } from '../../utils/city'

import { Flex } from 'antd-mobile'

// 导入子组件
import Filter from './components/Filter'

export default class Index extends Component {
  state = {
    cityName: ''
  }

  async componentDidMount() {
    const { label } = await getCity()

    this.setState({
      cityName: label
    })
  }

  render() {
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i className="iconfont icon-back"></i>
          {/* 组件的className跟普通元素的className不一样
          普通元素的className是直接作用起来的，
          而组件的className只是一个属性，他需要传递给子组件 */}
          <SeachHeader
            className={styles.listSearch}
            cityName={this.state.cityName}
          />
        </Flex>
        {/* 筛选子组件 */}
        <Filter />
      </div>
    )
  }
}
