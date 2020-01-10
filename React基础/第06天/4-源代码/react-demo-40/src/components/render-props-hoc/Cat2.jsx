import React, { Component } from 'react';

export class Cat extends Component {
    constructor() {
        super()

        this.state = {
            x: 0,
            y: 0
        }
    }

    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    
    componentDidMount() {
        window.addEventListener('mousemove',this.handleMouseMove)
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove',this.handleMouseMove)
    }

    render() {
        const {x,y} = this.state
        return (
            <div>
                <img style={{width:100,height:80,position:'absolute',left:x - 50,top: y- 40}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573293587849&di=9ce5cf054778adb0789912c82d196bfc&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201306%2F06%2F20130606101530_cssMZ.thumb.700_0.jpeg" alt=""/>
            </div>
        );
    }
}

export default Cat;
