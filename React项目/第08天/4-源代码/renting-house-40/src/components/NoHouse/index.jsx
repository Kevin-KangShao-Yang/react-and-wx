import React from 'react'

import styles from './index.module.scss'

import { BASEURL } from '../../utils/url'

import PropTypes from 'prop-types'

const NoHouse = ({ children }) => {
  return (
    <div className={styles.root}>
      <img className={styles.img} src={`${BASEURL}img/not-found.png`} alt="" />
      <p className={styles.msg}>{children}</p>
    </div>
  )
}

NoHouse.propTypes = {
  // children: PropTypes.string.isRequired
  children: PropTypes.node.isRequired
}

export default NoHouse
