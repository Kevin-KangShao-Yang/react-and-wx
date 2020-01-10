import React, { Component } from 'react';

import Old from './Old'
// import New from './New'
import New2 from './New2'

class Index extends Component {
    state = {
        age: 100,
        isShow: true,
        address: '野猪林'
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({age:200})}>+100</button>
                <button onClick={() => this.setState({isShow: false})}>隐藏</button>
                <hr/>
                {/* <Old age={this.state.age}/> */}

                {/* {this.state.isShow && <Old age={this.state.age}/>} */}

                {/* <New age={this.state.age}/> */}

                {this.state.isShow && <New2 address={this.state.address} age={this.state.age}/>}
            </div>
        );
    }
}

export default Index;