import React from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

function NavHeader({ children, history }) {
  return (
    <NavBar
      className={styles.navBar}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => history.goBack()}
    >
      {children}
    </NavBar>
  )
}

// 类型约束
NavHeader.propTypes = {
  children: PropTypes.string.isRequired
}

export default withRouter(NavHeader)
