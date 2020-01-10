import React, { Component } from 'react'

import styles from './index.module.scss'

import * as filtersActionCreators from '../../../../store/actionCreators/filtersActionCreators'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import FilterFooter from '../FilterFooter'

import classNames from 'classnames'

class Index extends Component {
  state = {
    selectValues: this.props.more
  }

  toggleSelect = value => {
    let array = JSON.parse(JSON.stringify(this.state.selectValues))
    if (array.includes(value)) {
      array = array.filter(item => item !== value)
    } else {
      array.push(value)
    }

    this.setState({
      selectValues: array
    })
  }

  renderDd = data => {
    return (
      <dd className={styles.dd}>
        {data.map(item => {
          return (
            <span
              key={item.value}
              className={classNames(styles.tag, {
                [styles.tagActive]: this.state.selectValues.includes(item.value)
              })}
              onClick={() => this.toggleSelect(item.value)}
            >
              {item.label}
            </span>
          )
        })}
      </dd>
    )
  }

  render() {
    const {
      roomType,
      characteristic,
      floor,
      oriented,
      setOpenType,
      setSelectValue
    } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩 */}
        <div onClick={() => setOpenType('')} className={styles.mask}></div>
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            {this.renderDd(roomType)}
            <dt className={styles.dt}>朝向</dt>
            {this.renderDd(oriented)}
            <dt className={styles.dt}>楼层</dt>
            {this.renderDd(floor)}
            <dt className={styles.dt}>房屋亮点</dt>
            {this.renderDd(characteristic)}
          </dl>
        </div>
        <div className={styles.footer}>
          <FilterFooter
            cancelText="清除"
            onCancel={() => {
              this.setState({ selectValues: [] })
            }}
            onOk={() => {
              // 更改仓库中的selectValue
              setSelectValue({ more: this.state.selectValues })
            }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  filters: {
    filterData: { roomType, characteristic, floor, oriented },
    selectValue: { more }
  }
}) => {
  return {
    roomType,
    characteristic,
    floor,
    oriented,
    more
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(filtersActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
