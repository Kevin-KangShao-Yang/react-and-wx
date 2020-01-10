import React, { Component } from 'react'

import styles from './index.module.scss'

import classNames from 'classnames'

// 所有房屋配置项
const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]

export default class Index extends Component {
  constructor(props) {
    super()

    // 使用数组的filter方法，来从 HOUSE_PACKAGE 这10个中过滤出我们想要的数据，然后做渲染
    const supportings = HOUSE_PACKAGE.filter(item =>
      props.data.includes(item.name)
    )

    this.state = {
      supportings
    }
  }

  render() {
    return (
      <ul className={styles.root}>
        {this.state.supportings.map(item => {
          return (
            <li key={item.id} className={styles.item}>
              <p>
                <i
                  className={classNames(`iconfont ${item.icon}`, styles.icon)}
                />
              </p>
              {item.name}
            </li>
          )
        })}
      </ul>
    )
  }
}
