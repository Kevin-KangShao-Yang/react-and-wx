import React, { Component } from 'react';

import Old from './Old'

class Index extends Component {
    state = {
        age: 100,
        isShow: true
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({age:200})}>+100</button>
                <button onClick={() => this.setState({isShow: false})}>隐藏</button>
                <hr/>
                {/* <Old age={this.state.age}/> */}

                {this.state.isShow && <Old age={this.state.age}/>}
            </div>
        );
    }
}

export default Index;