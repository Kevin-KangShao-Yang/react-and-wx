import React, { Component } from 'react';

class New extends Component {
    constructor() {
        super()

        this.state = {
            myName:'张三',
            myAge:30
        }
    }

    static getDerivedStateFromProps(props, state){
        console.log('props is ',props)
        console.log('state is ',state)

        return {
            myName:'李四'
        }
    }

    render() {
        console.log('---render---')
        return (
            <div>
                {this.state.myName}---{this.state.myAge}---
                <button onClick={() => this.setState({myAge:this.state.myAge + 1})}>更改myAge</button>
                <button onClick={() => this.forceUpdate()}>强制更新</button>
            </div>
        );
    }

    shouldComponentUpdate() {
        console.log('---shouldComponentUpdate---')

        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log(prevProps,prevState)

        return {
            test:'myTest'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('---componentDidMount---')

        console.log(prevProps,prevState,snapshot)
    }
}

export default New;