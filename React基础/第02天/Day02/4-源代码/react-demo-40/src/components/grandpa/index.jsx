import React, { Component } from 'react';
//导入模块化后的css
import styles from './index.module.css'

import Grandpa from './grandpa' 

const styleObj = {
    color:'red',
    fontSize:50,
    fontWeight:500
}

class Index extends Component {
    render() {
        return (
            <div>
                {/* <p style={{color:'green',fontSize:30}}>你是一个好人</p> */}

                {/* <p style={styleObj}>你是一个好人</p> */}

                {/* <p className="test">为什么出不来</p> */}
                <Grandpa />
            </div>
        );
    }
}

export default Index;