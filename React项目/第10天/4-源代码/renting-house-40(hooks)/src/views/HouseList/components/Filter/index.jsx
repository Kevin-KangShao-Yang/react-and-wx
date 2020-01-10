import React, { Component } from 'react'

import { connect } from 'react-redux'

// import { asyncSetFilterData } from '../../../../store/actionCreators/filtersActionCreators'

import * as filtersActionCreators from '../../../../store/actionCreators/filtersActionCreators'
import { bindActionCreators } from 'redux'

import styles from './index.module.scss'

// 导入子组件
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import { Spring } from 'react-spring/renderprops'

class Index extends Component {
  componentDidMount() {
    // 触发异步的action,在异步的action中发送请求，获取数据
    this.props.asyncSetFilterData()
  }

  renderMask = () => {
    const { openType, setOpenType } = this.props

    const isShow =
      openType === 'area' || openType === 'mode' || openType === 'price'

    return (
      <Spring to={{ opacity: isShow ? 1 : 0 }} config={{ duration: 550 }}>
        {props => {
          if (props.opacity === 0) {
            return null
          } else {
            return (
              <div
                style={props}
                className={styles.mask}
                onClick={() => setOpenType('')}
              ></div>
            )
          }
        }}
      </Spring>
    )
  }

  render() {
    const { openType } = this.props

    return (
      <div className={styles.root}>
        {/* 渲染遮罩 */}
        {this.renderMask()}

        <div className={styles.content}>
          <FilterTitle />

          {(openType === 'area' ||
            openType === 'mode' ||
            openType === 'price') && <FilterPicker />}

          {openType === 'more' && <FilterMore />}
        </div>
      </div>
    )
  }
}

/**
const mapDispatchToProps = dispatch => {
  return {
    // 变成组件的props
    asyncSetFilterData: function() {
      console.log('111111')
      // 触发异步的action
      dispatch(asyncSetFilterData())
    },
    aaa:function() {
        dispatch(aaa())
    },
    bbb: function() {
        dispatch(bbbb())
    },
    ccc: function() {
        dispatch(ccc())
    }
  }
}
 */

const mapStateToProps = ({ filters: { openType } }) => {
  return {
    openType
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(filtersActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
