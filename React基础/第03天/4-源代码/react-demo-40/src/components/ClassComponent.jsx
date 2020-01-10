import React from 'react'
import PropTypes from 'prop-types'

class ClassComponent extends React.Component {
    constructor(props){
        super(props)

        // 相当于Vue中的data
        this.state = {
            message: '皮几万',
            myName: props.name,
            myAge: props.age
        }

        this.clickMe = this.clickMe.bind(this)
    }

    clickMe() {
        console.log("11111",this)

        // 错误的，然后这样改，视图不会改变
        // this.state.message = 'PG One'

        // 异步方法
        this.setState({
            message: 'PG One'
        },() => { // 该回调函数，等着模型赋值完毕之后，才会执行该回调函数
            console.log(this.state.message)
        })
    }

    clickMe2 = message => {
        // console.log(this)

        // 更改模型的值之后，还会更新视图
        this.setState({
            message
        }, () => {
            console.log(this.state.message)
        })
    }

    // 这个是生命周期钩子之一
    render() {
        return <div>
            {/* {}它在JSX中就是一个表达式 */}
            {this.state.message} 他是个坏人<br/>
            {this.state.myName} --- {this.state.myAge}
            {/* {this.props.name} --- {this.props.age} */}
            <br/>
            {/* <button onClick={this.clickMe.bind(this)}>点击我更改值</button> */}

            {/* <button onClick={this.clickMe}>点击我更改值</button> */}


            {/* 下面这种写法，要不得，可能会造成死循环，因为这个是一解析就会直接执行该函数 */}
            {/* <button onClick={ this.clickMe2('张无忌') }>点击我更改值</button> */}

            {/* 下面这种就ok，因为onClick值是定义的一个箭头函数，只有触发click事件的时候，才会执行 */}
            {/* <button onClick={() => this.clickMe2('张无忌')}>点击我更改值</button> */}

            {/* 下面是比较全的写法 */}
            <button onClick={() => {
                console.log('----这个是我定义的箭头函数----')

                this.clickMe2('张无忌')
            }}>点击我更改值</button>
        </div>
    }
}

// 类型检查
ClassComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
}

// 默认值
ClassComponent.defaultProps = {
    name: '杨过'
}

export default ClassComponent