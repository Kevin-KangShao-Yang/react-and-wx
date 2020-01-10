import React, { Component } from 'react'

import styles from './index.module.scss'

import { connect } from 'react-redux'

class Index extends Component {
  renderDd = data => {
    return (
      <dd className={styles.dd}>
        {data.map(item => {
          return (
            <span key={item.value} className={styles.tag}>
              {item.label}
            </span>
          )
        })}
      </dd>
    )
  }

  render() {
    const { roomType, characteristic, floor, oriented } = this.props
    return (
      <div className={styles.root}>
        {/* 遮罩 */}
        <div className={styles.mask}></div>
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
      </div>
    )
  }
}

const mapStateToProps = ({
  filters: {
    filterData: { roomType, characteristic, floor, oriented }
  }
}) => {
  return {
    roomType,
    characteristic,
    floor,
    oriented
  }
}

export default connect(mapStateToProps)(Index)
