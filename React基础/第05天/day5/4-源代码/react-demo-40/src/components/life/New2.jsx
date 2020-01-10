import React, { Component } from 'react';

class New2 extends Component {
    constructor() {
        super()

        // console.log(`---constructor---`)

        this.state = {
            myName:'鲁智深',
            myAge: 30
        }
    }

    static getDerivedStateFromProps(props, state){
        console.log(props,state)

        // return {
        //     myAge: props.age
        // }
    }

    render() {
        // console.log(`---render---`)
        return (
            <div>
                新的生命周期示例<br/>
                {this.state.myName} --- {this.state.myAge}<br/>
                <button onClick={() => this.setState({myName:'张三',myAge:10})}>修改名字</button><br/>
                <button onClick={() => {this.forceUpdate()}}>强制更新视图</button>
            </div>
        );
    }

    componentDidMount() {
        // console.log(`---componentDidMount----`)
    }

    shouldComponentUpdate() {
        console.log(`---shouldComponentUpdate---`)
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log(`---getSnapshotBeforeUpdate---`,prevProps,prevState)

        return {
            test:'this is test'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`---componentDidUpdate---`,prevProps, prevState, snapshot)
    }

    componentWillUnmount() {
        console.log(`---componentWillUnmount---`)
    }
}

export default New2;