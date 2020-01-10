import React, { Component } from 'react'

import styles from './index.module.scss'

import SeachHeader from '../../components/SearchHeader'

import { getCity } from '../../utils/city'

import { Flex, Toast } from 'antd-mobile'

// 导入子组件
import Filter from './components/Filter'
import HouseItem from '../../components/HouseItem'
import Affix from '../../components/Affix'

import { connect } from 'react-redux'

import {
  AutoSizer,
  List,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'

class Index extends Component {
  state = {
    cityName: '', // 城市名字
    list: [], // 获取到的房源列表
    count: 0 // 获取到的总条数
  }

  cityId = '' // 城市的id
  filters = {} // 过滤的条件
  isLoaded = false

  async componentDidMount() {
    const { label, value } = await getCity()

    this.cityId = value

    this.setState({
      cityName: label
    })

    this.getHouseListData(1, 20)
  }

  /**
   * 获取房源列表数据
   */
  getHouseListData = async (start, end) => {
    Toast.loading('数据加载中...', 0)
    const result = await this.http.get(`/houses`, {
      params: {
        ...this.filters,
        cityId: this.cityId,
        start,
        end
      }
    })

    Toast.hide()

    if (result.data.body.count > 0) {
      Toast.info(`共查询到 ${result.data.body.count} 套房源`)
    }

    this.isLoaded = true // 加载完毕
    this.setState({
      count: result.data.body.count,
      list: result.data.body.list
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isNeedLoad) return
    // 拿到最新的值，按照后台的要求，拼接起来

    // 获取区域或是地铁
    if (nextProps.selectValue.area.length > 2) {
      const key = nextProps.selectValue.area[0]

      this.filters[key] =
        nextProps.selectValue.area[2] === 'null'
          ? nextProps.selectValue.area[1]
          : nextProps.selectValue.area[2]
    }

    // 处理价格
    if (nextProps.selectValue.price[0] !== 'null') {
      this.filters.price = nextProps.selectValue.price[0]
    } else {
      this.filters.price = null
    }

    // 处理租的方式
    if (nextProps.selectValue.mode[0] !== 'null') {
      this.filters.rentType = nextProps.selectValue.mode[0]
    } else {
      this.filters.rentType = null
    }

    // 更多
    if (nextProps.selectValue.more.length > 0) {
      this.filters.more = nextProps.selectValue.more.join(',')
    } else {
      this.filters.more = null
    }

    // 发送请求，获取数据
    this.getHouseListData(1, 20)
  }

  // 渲染每一样数据
  rowRenderer = ({ key, index, style }) => {
    const item = this.state.list[index]

    if (!item) {
      // 当数据还没有加载回来的时候，显示一个占位
      return (
        <div key={key} style={style}>
          <p className={styles.loading}></p>
        </div>
      )
    }

    return <HouseItem key={key} {...item} style={style} />
  }

  // 判断这一行是否记载完毕
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index]
  }

  // 实现上拉加载更多的方法
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return new Promise(async (resolve, reject) => {
      // 根据新的索引发送请求
      Toast.loading('数据加载中...', 0)
      const result = await this.http.get(`/houses`, {
        params: {
          ...this.filters,
          cityId: this.cityId,
          start: startIndex,
          end: stopIndex
        }
      })

      Toast.hide()

      if (result.data.body.count > 0) {
        Toast.info(`共查询到 ${result.data.body.count} 套房源`)
      }

      this.isLoaded = true // 加载完毕
      this.setState(
        {
          count: result.data.body.count,
          list: result.data.body.list
        },
        () => {
          resolve()
        }
      )
    })
  }

  // 渲染房源列表
  renderHouseList = () => {
    const { count } = this.state

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
        minimumBatchSize={21}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer>
                {({ width }) => (
                  <List
                    autoHeight
                    height={height}
                    rowCount={count}
                    rowHeight={120}
                    rowRenderer={this.rowRenderer}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
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
            // className={styles.listSearch}
            style={{position: 'relative', top: 0,paddingLeft: 0,height:'30px'}}
            cityName={this.state.cityName}
          />
        </Flex>
        {/* 筛选子组件 */}
        <Affix>
          <Filter />
        </Affix>
        {/* 渲染房源列表组件 */}
        <div className={styles.houseList}>{this.renderHouseList()}</div>
      </div>
    )
  }
}

Index.displayName = 'HouseList'

const mapStateToProps = ({ filters: { selectValue, isNeedLoad } }) => {
  return {
    selectValue,
    isNeedLoad
  }
}

export default connect(mapStateToProps, null)(Index)
