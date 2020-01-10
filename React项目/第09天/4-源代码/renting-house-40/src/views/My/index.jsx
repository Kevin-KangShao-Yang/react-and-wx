import React, { Component } from 'react'

import styles from './index.module.scss'

import { BASEURL } from '../../utils/url'

import { Button, Grid, Modal } from 'antd-mobile'

import { Link } from 'react-router-dom'

import { removeToken } from '../../utils/token'

const alert = Modal.alert

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
    avatar: '/img/profile/avatar.png',
    isLogin: false
  }

  componentDidMount() {
    // 获取用户信息
    this.getUserData()
  }

  getUserData = async () => {
    const result = await this.http.get('/user')

    if (result.data.status === 200) {
      const { avatar, nickname } = result.data.body

      this.setState({
        avatar,
        userName: nickname,
        isLogin: true
      })
    }
  }

  /** 退出 */
  logout = () => {
    alert('提示', '确定退出吗?', [
      { text: '取消', onPress: null },
      {
        text: '确定',
        onPress: async () => {
          const result = await this.http.post('/user/logout')

          if (result.data.status === 200) {
            this.setState({
              userName: '游客',
              avatar: '/img/profile/avatar.png',
              isLogin: false
            })

            // 删除token
            removeToken()
          }
        }
      }
    ])
  }

  render() {
    const { userName, avatar, isLogin } = this.state
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
                {isLogin ? (
                  <>
                    <div className={styles.auth}>
                      <span onClick={this.logout}>退出</span>
                    </div>
                    <div className={styles.edit}>
                      编辑个人资料
                      <span className={styles.arrow}>
                        <i className="iconfont icon-arrow"></i>
                      </span>
                    </div>
                  </>
                ) : (
                  <Button
                    onClick={() => this.props.history.push('/login')}
                    size="small"
                    type="primary"
                    inline
                  >
                    去登录
                  </Button>
                )}
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
