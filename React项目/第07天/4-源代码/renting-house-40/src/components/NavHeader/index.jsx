import React from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

function NavHeader({ className,children, history,rightContent }) {
  return (
    <NavBar
      className={classNames(styles.navBar,className)}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => history.goBack()}
      rightContent={rightContent}
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
