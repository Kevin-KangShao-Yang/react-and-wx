import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as filtersActionCreators from '../../../../store/actionCreators/filtersActionCreators'
import { bindActionCreators } from 'redux'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../FilterFooter'

class Index extends Component {
  constructor(props) {
    super()

    this.state = {
      value: props.selectValue[props.openType], // 赋值上一次选中的值
      openType: props.openType // 记录openType
    }
  }

  // new props new state force­Update()
  static getDerivedStateFromProps(props, state) {
    // 代表点击的时候，从一个type切换到了另外一个type
    if (props.openType !== state.openType) {
      return {
        ...state,
        value: props.selectValue[props.openType],
        openType: props.openType
      }
    } else {
      return state
    }
  }

  changeValue = data => {
    this.setState({
      value: data
    })
  }

  render() {
    const {
      openType,
      area,
      subway,
      rentType,
      price,
      setOpenType,
      setSelectValue
    } = this.props

    let cols = 1
    let data = null
    switch (openType) {
      case 'area':
        cols = 3
        data = [area, subway]
        break

      case 'mode':
        cols = 1
        data = rentType
        break

      default:
        cols = 1
        data = price
    }

    return (
      <div>
        <PickerView
          data={data}
          cols={cols}
          value={this.state.value}
          onChange={this.changeValue}
        />
        <FilterFooter
          onCancel={() => setOpenType('')}
          onOk={() => setSelectValue({ [openType]: this.state.value })}
        />
      </div>
    )
  }
}

Index.displayName = 'FilterPicker'

const mapStateToProps = ({
  filters: {
    openType,
    selectValue,
    filterData: { area, subway, price, rentType }
  }
}) => {
  return {
    openType,
    area,
    subway,
    rentType,
    price,
    selectValue
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(filtersActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
