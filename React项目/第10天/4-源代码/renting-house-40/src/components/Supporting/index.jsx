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

    let supportings = null
    if (props.data) { // 从房屋详情页面传递过来的数据
      supportings = HOUSE_PACKAGE.filter(item => props.data.includes(item.name))
    } else { // 发布房源
      supportings = HOUSE_PACKAGE
    }

    this.state = {
      supportings,
      names: []
    }
  }

  toggleSelect = name => {
    const { names } = this.state

    let newNames = names
    if (names.includes(name)) {
      newNames = names.filter(item => item !== name)
    } else {
      newNames.push(name)
    }

    this.setState(
      {
        names: newNames
      },
      () => {
        // 通过回调函数，把结果传递给父组件
        this.props.onChange(this.state.names)
      }
    )
  }

  render() {
    const { edit } = this.props
    return (
      <ul className={styles.root}>
        {this.state.supportings.map(item => {
          if (edit) {
            return (
              <li
                key={item.id}
                onClick={() => this.toggleSelect(item.name)}
                className={classNames(styles.item, {
                  [styles.active]: this.state.names.includes(item.name)
                })}
              >
                <p>
                  <i
                    className={classNames(`iconfont ${item.icon}`, styles.icon)}
                  />
                </p>
                {item.name}
              </li>
            )
          } else {
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
          }
        })}
      </ul>
    )
  }
}

Index.defaultProps = {
  edit: false
}
