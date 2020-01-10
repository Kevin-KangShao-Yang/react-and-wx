import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.module.scss'
import { Flex } from 'antd-mobile'

// 路由的高阶组件
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

function SearchHeader({ cityName, className,style, history }) {
  return (
    <div style={style} className={classNames(styles.root, className)}>
      <Flex>
        <Flex
          className={styles.searchLeft}
          onClick={() => history.push('/citylist')}
        >
          <div className={styles.location}>
            <span>{cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className={styles.searchForm}>
            <i className="iconfont icon-search"></i>
            <span>请输入小区或是地址</span>
          </div>
        </Flex>
        <i
          onClick={() => history.push('/map')}
          className="iconfont icon-map"
        ></i>
      </Flex>
    </div>
  )
}

// 类型校验
SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired
}

export default withRouter(SearchHeader)
