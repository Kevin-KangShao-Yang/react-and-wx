import React, { Component } from 'react';

// import './grandpa.css'
import styles from './grandpa.module.css'

import Son from './son'

import Context from './context'

export class Grandpa extends Component {
    state = {
        color:'red'
    }

    render() {
        return (
            <div>
                {/* <p className="test">grandpa</p> */}
                <p className={styles.test}>grandpa</p>
                {/* <button onClick={() => this.setState({color:'red'})}>红色</button>&nbsp;&nbsp;<button onClick={() => this.setState({color:'purple'})}>紫色</button>

                <div>
                    <p style={{color:this.state.color}}>我是爷爷</p>

                    <Context.Provider value={this.state.color}>
                        <Son />
                    </Context.Provider>
                </div> */}
            </div>
        );
    }
}

export default Grandpa;
