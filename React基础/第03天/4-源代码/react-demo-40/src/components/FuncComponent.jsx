import React from 'react'
import PropTypes from 'prop-types'

function FuncComponent({name,age}){
    // console.log(props)
    return <div>
        <p>我是一个好人--{name} {age}</p>
    </div>
}

// 设置检查的类型
FuncComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
}

// 设置默认值
FuncComponent.defaultProps = {
    age: 111
}

export default FuncComponent