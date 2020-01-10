import React from 'react'
import PropTypes from 'prop-types'

function FuncComponent(props){  //也可以用解构语法:{name,age}
    console.log(props) //{name="张三丰" , age=666 }
    return <div>
        <p>我是一个好人--{props.name} {props.age}</p>
    </div>
}
// 设置检查的类型  
// PropTypes.string(设置父组件传值过来的必须为字符串类型)
// isRequired(设置父组件必须传值过来,不然便报错)
FuncComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
}
// 设置默认值,当父组件没传age值时,子组件中默认值为111
FuncComponent.defaultProps = {
    age: 111
}
//默认导出
export default FuncComponent