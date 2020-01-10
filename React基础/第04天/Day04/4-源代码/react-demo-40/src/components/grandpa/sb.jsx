import React, { Component } from 'react';

// import './index.css'

import styles from './sb.module.css'

import Grandpa from './grandpa' 

console.log(styles)

const styleObj = {
    color:'red',
    fontSize:50,
    fontWeight:500
}

class SB extends Component {
    render() {
        return (
            <div>
                {/* <p style={{color:'green',fontSize:30}}>你是一个好人</p> */}

                {/* <p style={styleObj}>你是一个好人</p> */}

                {/* <p className="test">index</p> */}
                <p className={styles.test}>index</p>
                <Grandpa />
            </div>
        );
    }
}

export default SB;