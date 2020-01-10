import React, { Component } from 'react'

import styles from './index.module.scss'
import PropTypes from 'prop-types'

export default class Index extends Component {
  placeholderRef = React.createRef()
  contentRef = React.createRef()

  handleScroll = () => {
    // 拿到dom节点
    const placeholderDom = this.placeholderRef.current
    const contentDom = this.contentRef.current

    // 拿到占位符那个dom节点距离顶部有多少的记录
    const { top } = placeholderDom.getBoundingClientRect()

    if (top < 0) {
      // 我们的占位符滚出去了，接下来，我们需要做以下事情
      // 接下来需要做的事情
      // 1、让 placeholderDom 的高度变成40
      // 2、让 contentDom 脱标(固定定位)
      placeholderDom.style.height = `${this.props.childrenHeight}px`
      contentDom.classList.add(styles.fixed)
    } else {
      placeholderDom.style.height = '0px'
      contentDom.classList.remove(styles.fixed)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div>
        {/* 占位符 */}
        <div id="placeholderId" ref={this.placeholderRef}></div>
        {/* 内容区域 */}
        <div ref={this.contentRef}>{this.props.children}</div>
      </div>
    )
  }
}

Index.propTypes = {
  childrenHeight: PropTypes.number.isRequired
}

Index.defaultProps = {
  childrenHeight: 40
}
