import React, { Component } from 'react'

import { setLocalCity, getCity } from '../../utils/city'

import styles from './index.module.scss'

import { AutoSizer, List } from 'react-virtualized'

import { Toast } from 'antd-mobile'

// 导入公共组件
import NavHeader from '../../components/NavHeader'

// 每一行标题的高度
const TITLE_HEIGHT = 36
// 每一行中，它下面的每一个城市的高度
const ROW_HEIGHT = 50

// 有房源信息的城市
const CITIES = ['北京', '上海', '广州', '深圳']

export default class Index extends Component {
  state = {
    cityObj: null, // 左边城市数据对象
    cityIndexList: null, // 右边城市索引数据
    activeIndex: 0 // 右边激活索引的索引
  }

  listRef = React.createRef()

  componentDidMount() {
    // 获取城市列表数据
    this.getCityListData()
  }

  getCityListData = async () => {
    const result = await this.http.get('/area/city?level=1')

    // 1、遍历服务端返回的数据
    const tempObj = {} // 临时对象
    result.data.body.forEach(item => {
      // 截取每个城市对象的简写的首字母
      const firstLetter = item.short.substring(0, 1)
      // 判断该首字母是有已经有数据了，如果有数据了，则push，否则就把他放在一个数组中
      if (tempObj[firstLetter]) {
        tempObj[firstLetter].push(item)
      } else {
        tempObj[firstLetter] = [item]
      }
    })

    // 1.1、处理右边的城市索引列表数据
    const cityIndexList = Object.keys(tempObj).sort()

    // 2、获取热门城市数据
    const hotResult = await this.http.get('/area/hot')
    // 取出热门城市数据
    const hotCityList = hotResult.data.body
    // 处理热门城市右边的数据
    cityIndexList.unshift('hot')
    // 处理左边的数据
    tempObj['hot'] = hotCityList

    // 3、处理定位城市
    const locationCity = await getCity()
    cityIndexList.unshift('#')
    tempObj['#'] = [locationCity]

    this.setState({
      cityObj: tempObj,
      cityIndexList
    })
  }

  // 格式化字母
  formatLetter = letter => {
    switch (letter) {
      case '#':
        return '定位城市'

      case 'hot':
        return '热门城市'

      default:
        return letter.toUpperCase()
    }
  }

  // 切换城市选择
  toggleCity = ({ label, value }) => {
    if (!CITIES.includes(label)) {
      Toast.info('该城市暂无房源哦~', 1)

      return
    }

    // 更新本地的定位城市
    setLocalCity({ label, value })

    // 返回
    this.props.history.goBack()
  }

  // 渲染我们左边每一行数据
  rowRenderer = ({ key, index, style }) => {
    // 先获取索引中的每一个字母
    const letter = this.state.cityIndexList[index]

    // 在从 cityObj 中通过字母获取它下面的城市列表数组
    const list = this.state.cityObj[letter]

    return (
      // style一定要设置
      <div key={key} style={style} className={styles.city}>
        {/* 渲染每一行的标题 */}
        <div className={styles.title}>{this.formatLetter(letter)}</div>
        {/* 遍历每一行下面的城市 */}
        {list.map(item => {
          return (
            <div
              key={item.value}
              onClick={() => this.toggleCity(item)}
              className={styles.name}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * 计算每一行的高度
   */
  calcRowHeight = ({ index }) => {
    // 先获取索引中的每一个字母
    const letter = this.state.cityIndexList[index]

    // 在从 cityObj 中通过字母获取它下面的城市列表数组
    const list = this.state.cityObj[letter]

    return TITLE_HEIGHT + list.length * ROW_HEIGHT
  }

  /**
   * 点击右边的索引列表
   */
  clickCityIndexList = index => {
    this.listRef.current.scrollToRow(index)
  }

  /**
   * 渲染右边的索引列表
   */
  renderCityIndexList = () => {
    // 获取数据
    const { activeIndex, cityIndexList } = this.state
    return (
      <div className={styles.cityIndex}>
        {cityIndexList.map((item, index) => {
          return (
            <div
              onClick={() => this.clickCityIndexList(index)}
              key={item}
              className={styles.cityIndexItem}
            >
              <span className={index === activeIndex ? styles.indexActive : ''}>
                {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * 左边滚动的时候执行该方法，可以获取到滚动到的索引位置
   */
  onRowsRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  render() {
    return (
      <div className={styles.citylist}>
        {/* 顶部导航条组件 */}
        <NavHeader>城市选择</NavHeader>
        {/* 渲染左边的列表 */}
        {this.state.cityObj && (
          <AutoSizer>
            {(
              { height, width } // 如果没有高度，不会渲染
            ) => (
              <List
                ref={this.listRef}
                height={height}
                rowCount={this.state.cityIndexList.length}
                rowHeight={this.calcRowHeight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
                width={width}
                scrollToAlignment="start" // 滚动的时候，让其顶部对齐
              />
            )}
          </AutoSizer>
        )}
        {/* 渲染右边的索引 */}
        {this.state.cityIndexList && this.renderCityIndexList()}
      </div>
    )
  }
}
