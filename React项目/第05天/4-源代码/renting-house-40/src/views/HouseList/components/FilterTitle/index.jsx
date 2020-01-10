import React from 'react'
import styles from './index.module.scss'

import { Flex } from 'antd-mobile'

import { connect } from 'react-redux'
import * as filtersActionCreators from '../../../../store/actionCreators/filtersActionCreators'
import { bindActionCreators } from 'redux'

import classNames from 'classnames'

const types = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

function FilterTitle({ setTitleValue, selectTitleValue, setOpenType }) {
  return (
    <Flex align="center" className={styles.root}>
      {types.map(item => {
        // 判断哪一项选中了
        const isSelect = selectTitleValue[item.type]

        return (
          <Flex.Item
            key={item.type}
            onClick={() => {
              setTitleValue({ [item.type]: true })
              setOpenType(item.type)
            }}
          >
            <div
              className={classNames(styles.dropdown, {
                [styles.selected]: isSelect
              })}
            >
              <span>{item.title}</span>
              <i className="iconfont icon-arrow"></i>
            </div>
          </Flex.Item>
        )
      })}
    </Flex>
  )
}

const mapStateToProps = ({ filters: { selectTitleValue } }) => {
  return {
    selectTitleValue
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(filtersActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTitle)
