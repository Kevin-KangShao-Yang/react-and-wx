import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import styels from './index.module.scss'

import { getCity } from '../../../utils/city'

import debounce from 'loadsh/debounce'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as communityCreators from '../../../store/actionCreators/communityCreators'

class RentSearch extends Component {
  state = {
    keyword: '',
    tips: null
  }

  // 防抖函数
  //   debounce = (fun, delay) => {
  //     return function(args) {
  //       let that = this
  //       let _args = args
  //       clearTimeout(fun.id)
  //       fun.id = setTimeout(function() {
  //         fun.call(that, _args)
  //       }, delay)
  //     }
  //   }

  async componentDidMount() {
    const { value } = await getCity()

    this.cityId = value

    // this.debounceAjax = this.debounce(this.searchCommunity, 500)
  }

  searchCommunity = debounce(async () => {
    const result = await this.http.get('/area/community', {
      params: {
        id: this.cityId,
        name: this.state.keyword
      }
    })

    this.setState({
      tips: result.data.body
    })
  }, 500)

  changeValue = val => {
    this.setState(
      {
        keyword: val
      },
      () => {
        this.searchCommunity()
        // this.debounceAjax()
      }
    )
  }

  render() {
    const { tips } = this.state
    return (
      <div className={styels.root}>
        <SearchBar
          value={this.state.keyword}
          onChange={this.changeValue}
          placeholder="请输入小区或地址"
          onCancel={() => this.props.history.goBack()}
        />
        {tips && (
          <ul className={styels.tips}>
            {tips.map(({ community, communityName }) => {
              return (
                <li
                  key={community}
                  className={styels.tip}
                  onClick={() => {
                    this.props.setCommunity({ community, communityName })
                    this.props.history.goBack()
                  }}
                >
                  {communityName}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  // 仓库中actionCreators.setCommunity ===> props.setCommunity
  return bindActionCreators(communityCreators, dispatch)
}

export default connect(null, mapDispatchToProps)(RentSearch)
