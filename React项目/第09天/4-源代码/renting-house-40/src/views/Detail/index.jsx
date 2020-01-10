import React, { Component } from 'react'

import styles from './index.module.scss'

import NavHeader from '../../components/NavHeader'

import { Carousel, Flex, Modal, Toast } from 'antd-mobile'

import { BASEURL } from '../../utils/url'

import HouseItem from '../../components/HouseItem'

import Supporting from '../../components/Supporting'

import { isAuth } from '../../utils/token'

const alert = Modal.alert
const BMap = window.BMap

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    houseCode: '5cc477061439630e5b467b0b',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房']
  },
  {
    id: 2,
    houseCode: '5cc4a1dd1439630e5b502266',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁']
  },
  {
    id: 3,
    houseCode: '5cc46a921439630e5b439611',
    houseImg: '/newImg/7bk83o0cf.jpg',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖']
  }
]

const labelStyle = {
  position: 'absolute',
  zIndex: -1,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: 12,
  userSelect: 'none'
}

export default class Index extends Component {
  state = {
    imgHeight: 252,
    houseInfo: {
      // 标题
      community: ''
    },
    isFavorite: false // 默认没有收藏
  }

  componentDidMount() {
    // 获取房子的基本数据
    this.getHouseData()

    // 获取房子的收藏状态
    this.getHouseFavorites()
  }

  // 获取房源数据
  getHouseData = async () => {
    const result = await this.http.get(`/houses/${this.props.match.params.id}`)

    this.setState({
      houseInfo: result.data.body
    })

    // 初始化地图和覆盖物
    this.initMapAndOverlays()
  }

  // 获取房子的收藏状态
  getHouseFavorites = async () => {
    const result = await this.http.get(
      `/user/favorites/${this.props.match.params.id}`
    )

    if (result.data.status === 200) {
      this.setState({
        isFavorite: result.data.body.isFavorite
      })
    }
  }

  renderSwipers = () => {
    const { houseImg } = this.state.houseInfo
    return (
      <Carousel autoplay infinite className={styles.slides}>
        {houseImg.map(val => (
          <a
            key={val}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: '252px'
            }}
          >
            <img
              src={`${BASEURL}${val}`}
              alt=""
              style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  /**
   * 渲染房屋信息
   */
  renderHouseInfo = () => {
    const {
      houseInfo: { title, tags, price, roomType, size, floor, oriented }
    } = this.state
    return (
      <div className={styles.info}>
        <h3 className={styles.infoTitle}>{title}</h3>
        <Flex>
          {tags &&
            tags.map((item, index) => {
              const tagName = `tag${(index % 3) + 1}`
              return (
                <span
                  key={index}
                  className={[styles.tag, styles[tagName]].join(' ')}
                >
                  {item}
                </span>
              )
            })}
        </Flex>
        <Flex className={styles.infoPrice}>
          <Flex.Item className={styles.infoPriceItem}>
            <div>
              {price}
              <span className={styles.month}>/月</span>
            </div>
            <div>租金</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{roomType}</div>
            <div>房型</div>
          </Flex.Item>
          <Flex.Item className={styles.infoPriceItem}>
            <div>{size}</div>
            <div>面积</div>
          </Flex.Item>
        </Flex>
        <Flex className={styles.infoBasic} align="center">
          <Flex.Item>
            <div>
              <span className={styles.title}>装修：</span>
              精装修
            </div>
            <div>
              <span className={styles.title}>楼层：</span>
              {floor}
            </div>
          </Flex.Item>
          <Flex.Item>
            <div>
              <span className={styles.title}>朝向：</span>
              {oriented.join(' ')}
            </div>
            <div>
              <span className={styles.title}>类型：</span>普通住宅
            </div>
          </Flex.Item>
        </Flex>
      </div>
    )
  }

  /** 渲染小区的地图和覆盖物 */
  initMapAndOverlays = () => {
    const {
      houseInfo: {
        coord: { longitude, latitude },
        community
      }
    } = this.state

    // 创建地图的示例
    this.map = new BMap.Map('container')

    // 创建地图的中心点
    var point = new BMap.Point(longitude, latitude)

    // 设置中心点和地图缩放级别
    this.map.centerAndZoom(point, 15)

    // 下面是覆盖物的代码
    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(-36, -66) //设置文本偏移量
    }

    // 创建文字标签覆盖物
    var label = new BMap.Label('', opts) // 创建文本标注对象
    // 设置label的内容
    label.setContent(`
        <span>${community}</span>
        <div class="${styles.mapArrow}"></div>
    `)
    // 设置label文字标签覆盖物的样式
    label.setStyle(labelStyle)
    // 把它添加到地图上
    this.map.addOverlay(label)
  }

  // 渲染小区地图及覆盖物
  renderCommunity = () => {
    const {
      houseInfo: { community }
    } = this.state
    return (
      <div className={styles.map}>
        <div className={styles.mapTitle}>
          小区：<span>{community}</span>
        </div>
        <div className={styles.mapContainer} id="container"></div>
      </div>
    )
  }

  /**
   * 渲染房屋配套
   */
  renderSupporting = () => {
    return (
      <div className={styles.about}>
        <div className={styles.houseTitle}>房屋配套</div>
        <Supporting data={this.state.houseInfo.supporting} />
      </div>
    )
  }

  // 渲染房屋概况
  renderDescription = () => {
    return (
      <div className={styles.set}>
        <div className={styles.houseTitle}>房屋概况</div>
        <div>
          <div className={styles.contact}>
            <div className={styles.user}>
              <img src={BASEURL + '/img/avatar.png'} alt="头像" />
              <div className={styles.useInfo}>
                <div>王女士</div>
                <div className={styles.userAuth}>
                  <i className="iconfont icon-auth" />
                  已认证房主
                </div>
              </div>
            </div>
            <span className={styles.userMsg}>发消息</span>
          </div>

          <div className={styles.descText}>
            {this.state.houseInfo.description || '暂无房屋描述'}
            {/* 1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
                2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
                3.人车分流，环境优美。
                4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。 */}
          </div>
        </div>
      </div>
    )
  }

  // 渲染猜你喜欢
  renderRecommendHouses = () => {
    return (
      <div className={styles.recommend}>
        <div className={styles.houseTitle}>猜你喜欢</div>
        <div className={styles.items}>
          {recommendHouses.map(item => {
            return <HouseItem key={item.houseCode} {...item} />
          })}
        </div>
      </div>
    )
  }

  favoriteOrNot = async () => {
    // 看是否登录了，如果没有登录，则提示去登陆
    if (!isAuth()) {
      alert('提示', '登录后才能收藏房源，是否去登录?', [
        { text: '取消', onPress: null },
        {
          text: '去登录',
          onPress: () => this.props.history.push('/login')
        }
      ])
      return
    }

    // 如果登录了，则进行后续的收藏与取消收藏操作
    const { isFavorite } = this.state
    if (isFavorite) {
      // 如果是收藏的，就取消收藏
      const result = await this.http.delete(
        `/user/favorites/${this.props.match.params.id}`
      )

      if (result.data.status === 200) {
        Toast.info(result.data.description)
        this.setState({
          isFavorite: false
        })
      }
    } else {
      // 没有收藏过，则收藏
      const result = await this.http.post(
        `/user/favorites/${this.props.match.params.id}`
      )

      if (result.data.status === 200) {
        Toast.info(result.data.description)
        this.setState({
          isFavorite: true
        })
      }
    }
  }

  /**
   * 渲染底部
   */
  renderFooter = () => {
    const { isFavorite } = this.state
    return (
      <Flex className={styles.fixedBottom}>
        <Flex.Item onClick={this.favoriteOrNot}>
          <img
            className={styles.favoriteImg}
            src={`${BASEURL}${
              isFavorite ? '/img/star.png' : '/img/unstar.png'
            }`}
            alt=""
          />
          <span className={styles.favorite}>
            {isFavorite ? '已收藏' : '收藏'}
          </span>
        </Flex.Item>
        <Flex.Item>在线咨询</Flex.Item>
        <Flex.Item>
          <a href="tel:400-618-4000" className={styles.telephone}>
            电话预约
          </a>
        </Flex.Item>
      </Flex>
    )
  }

  render() {
    const { houseInfo } = this.state
    return (
      <div className={styles.root}>
        {/* 顶部导航条 */}
        <NavHeader
          className={styles.detailHeader}
          rightContent={[<i key="share" className="iconfont icon-share" />]}
        >
          {houseInfo.community}
        </NavHeader>
        {/* 渲染轮播图 */}
        {houseInfo.houseImg && this.renderSwipers()}
        {/* 渲染房屋信息 */}
        {houseInfo.title && this.renderHouseInfo()}
        {/* 渲染小区的地图和覆盖物 */}
        {houseInfo.community && this.renderCommunity()}
        {/* 渲染房屋配套 */}
        {houseInfo.supporting && this.renderSupporting()}
        {/* 渲染房屋概况 */}
        {this.renderDescription()}
        {/* 渲染猜你喜欢 */}
        {this.renderRecommendHouses()}
        {/* 渲染底部 */}
        {this.renderFooter()}
      </div>
    )
  }
}
