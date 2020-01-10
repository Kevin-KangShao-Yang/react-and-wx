import React, { Component } from 'react'

import { Carousel, Flex, Grid } from 'antd-mobile'

import styles from './index.module.scss'

import { BASEURL } from '../../utils/url'

// 通过模块化的方式导入图片(本地图片加载必须通过这种方式)
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'

// 导入路由
import { Link } from 'react-router-dom'

// 导入子组件
import SearchHeader from '../../components/SearchHeader'

// 获取定位城市
import { getCity } from '../../utils/city'

export default class Index extends Component {
  state = {
    imgHeight: 212, // 轮播图的图片高度
    swipers: null, // 轮播图
    groups: null, // 租房小组
    news: null, // 咨询
    cityName: '深圳'
  }

  navs = [
    { icon: image1, text: '整租', path: '/layout/houselist' },
    { icon: image2, text: '合租', path: '/layout/houselist' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]

  async componentDidMount() {
    const { label, value } = await getCity()
    this.setState({
      cityName: label
    })

    // 获取轮播图数据
    this.getSwiperData()

    // 获取租房小组数据
    this.getGroupsData(value)

    // 获取咨询的数据
    this.getNewsData(value)
  }

  // 获取轮播图数据
  getSwiperData = async () => {
    const result = await this.http.get('/home/swiper')

    this.setState({
      swipers: result.data.body
    })
  }

  // 获取租房小组数据
  getGroupsData = async value => {
    const result = await this.http.get(`/home/groups?area=${value}`)

    this.setState({
      groups: result.data.body
    })
  }

  // 获取咨询的数据
  getNewsData = async value => {
    const result = await this.http.get(`/home/news?area=${value}`)

    this.setState({
      news: result.data.body
    })
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel autoplay infinite className={styles.swiper}>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASEURL}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  /**
   * 渲染导航菜单
   */
  renderNavs = () => {
    return (
      <Flex className={styles.nav}>
        {this.navs.map(item => {
          return (
            <Flex.Item key={item.text}>
              <Link to={item.path}>
                <img src={item.icon} alt="" />
                <p>{item.text}</p>
              </Link>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }

  /**
   * 渲染租房小组
   */
  renderGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex>
          <Flex.Item>
            <span className={styles.title}>租房小组</span>
          </Flex.Item>
          <Flex.Item align="end">
            <span>更多</span>
          </Flex.Item>
        </Flex>
        {/* 下面就是宫格 */}
        <Grid
          data={this.state.groups}
          hasLine={false}
          square={false}
          columnNum={2}
          renderItem={dataItem => {
            return (
              <div className={styles.navItem} key={dataItem.id}>
                <div className={styles.left}>
                  <p>{dataItem.title}</p>
                  <p>{dataItem.desc}</p>
                </div>
                <div className={styles.right}>
                  <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                </div>
              </div>
            )
          }}
        />
      </div>
    )
  }

  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新咨询</h3>
        {this.state.news.map(item => {
          return (
            <div className={styles.newsItem} key={item.id}>
              <div className={styles.imgWrap}>
                <img src={`${BASEURL}${item.imgSrc}`} alt="" />
              </div>
              <Flex
                className={styles.content}
                direction="column"
                justify="between"
              >
                <h3 className={styles.title}>{item.title}</h3>
                <Flex justify="between" className={styles.info}>
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 渲染搜索头部 */}
        <SearchHeader cityName={this.state.cityName} />
        {/* 渲染轮播图 */}
        {this.state.swipers && this.renderSwiper()}
        {/* 渲染导航菜单 */}
        {this.renderNavs()}
        {/* 渲染租房小组数据 */}
        {this.state.groups && this.renderGroups()}
        {/* 渲染咨询 */}
        {this.state.news && this.renderNews()}
      </div>
    )
  }
}
