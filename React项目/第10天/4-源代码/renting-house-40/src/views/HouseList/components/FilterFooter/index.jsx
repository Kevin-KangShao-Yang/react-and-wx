import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Flex } from 'antd-mobile'

function FilterFooter({ cancelText, sureText, onCancel, onOk }) {
  return (
    <Flex className={styles.root} align="center">
      <span
        onClick={onCancel}
        className={classNames(styles.btn, styles.cancel)}
      >
        {cancelText}
      </span>
      <span onClick={onOk} className={classNames(styles.btn, styles.ok)}>
        {sureText}
      </span>
    </Flex>
  )
}

// 类型校验
FilterFooter.propTypes = {
  cancelText: PropTypes.string.isRequired,
  sureText: PropTypes.string.isRequired
}

FilterFooter.defaultProps = {
  cancelText: '取消',
  sureText: '确定'
}

export default FilterFooter
