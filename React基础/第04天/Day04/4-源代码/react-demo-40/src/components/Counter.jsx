import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component {
    constructor(props){
        super(props)

        this.state = {
            count: props.initCount
        }
    }

    add = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count)

            // 调用回到函数，把值传递给父组件
            this.props.callback(this.state.count)
        })
    }

    render() {
        return (
            <div>
                {this.state.count}&nbsp;&nbsp;<button onClick={this.add}>+1</button>
            </div>
        )
    }
}

// 类型约束
Counter.propTypes = {
    initCount: PropTypes.number.isRequired
}

// 默认值约束
Counter.defaultProps = {
    initCount: 100
}
