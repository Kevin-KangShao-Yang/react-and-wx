import React, { Component } from 'react'

import styles from './index.module.scss'

import { BASEURL } from '../../utils/url'

import { Button, Grid } from 'antd-mobile'

import { Link } from 'react-router-dom'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-index', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

export default class Index extends Component {
  state = {
    userName: '游客',
    avatar: '/img/profile/avatar.png'
  }
  render() {
    const { userName, avatar } = this.state
    return (
      <div>
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={`${BASEURL}/img/profile/bg.png`}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={`${BASEURL}${avatar}`}
                alt=""
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{userName}</div>
              <div className={styles.edit}>
                <Button
                  onClick={() => this.props.history.push('/login')}
                  size="small"
                  type="primary"
                  inline
                >
                  去登录
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={dataItem => {
            if (dataItem.to) {
              return (
                <Link to={dataItem.to}>
                  <div className={styles.menuItem}>
                    <i className={`iconfont ${dataItem.iconfont}`}></i>
                    <span>{dataItem.name}</span>
                  </div>
                </Link>
              )
            } else {
              return (
                <div className={styles.menuItem}>
                  <i className={`iconfont ${dataItem.iconfont}`}></i>
                  <span>{dataItem.name}</span>
                </div>
              )
            }
          }}
        />
        <div className={styles.ad}>
          <img src={`${BASEURL}/img/profile/join.png`} alt="" />
        </div>
      </div>
    )
  }
}
