import React from 'react'
import PropTypes from 'prop-types'
//创建一个子类替代构造函数,子类会继承父类的所有
class ClassComponent extends React.Component {
    constructor(props){
        super(props)   // 必须调用父类，这是语法规定
        // 相当于Vue中的data
        this.state = {
            message: '皮几万',
            myName: props.name,
            myAge: props.age
        }
    }
    // 这个是生命周期钩子之一
    render() {
        return <div>
            {/* {}它在JSX中就是一个表达式 */}
            {this.state.message} 他是个坏人<br/>
            {this.state.myName} --- {this.state.myAge}
            {/* {this.props.name} --- {this.props.age} */}
        </div>
    }
}
// 设置检查的类型  
// PropTypes.string(设置父组件传值过来的必须为字符串类型)
// isRequired(设置父组件必须传值过来,不然便报错)
ClassComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
}

// 设置默认值,当父组件没传age值时,子组件中默认值为111
ClassComponent.defaultProps = {
    name: '杨过'
}
//默认导出
export default ClassComponent