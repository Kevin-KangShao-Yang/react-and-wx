import React, { Component } from 'react';

class Old extends Component {
    constructor(){
        super()

        console.log('---constructor---')

        this.state = {
            name: '岳不群'
        }
    }

    componentWillMount() {
        console.log('---componentWillMount---')
    }

    render() {
        console.log('----render----')
        return (
            <div>
                {this.state.name}---{this.props.age}
                <button onClick={() => this.setState({name:'东方不败'})}>更改name</button>
            </div>
        );
    }

    componentDidMount(){
        console.log('---componentDidMount---')
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    shouldComponentUpdate() {
        console.log('---shouldComponentUpdate--')
        return true
    }

    componentWillUpdate(){
        console.log('---componentWillUpdate--')
    }

    componentDidUpdate(){
        console.log('---componentDidUpdate--')
    }

    /** 条件渲染或是路由切换的时候会出现 */
    componentWillUnmount(){
        console.log('---componentWillUnmount---')
    }
}

export default Old;