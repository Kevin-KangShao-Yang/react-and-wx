import React, { Component } from 'react'

import { connect } from 'react-redux'

import { PickerView } from 'antd-mobile'

class Index extends Component {
  render() {
    const { openType, area, subway, rentType, price } = this.props

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
        <PickerView data={data} cols={cols} />
      </div>
    )
  }
}

const mapStateToProps = ({
  filters: {
    openType,
    filterData: { area, subway, price, rentType }
  }
}) => {
  return {
    openType,
    area,
    subway,
    rentType,
    price
  }
}

export default connect(mapStateToProps)(Index)
