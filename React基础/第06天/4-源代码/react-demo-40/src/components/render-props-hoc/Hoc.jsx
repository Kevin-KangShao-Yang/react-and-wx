import React, { Component } from 'react';

/**
 * 它本身是一个函数，接收一个组件作为参数，返回一个新的类组件
 * @param {*} WrappedComponent 
 */
function withPosition(WrappedComponent){
    return class extends Component{
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
            return <WrappedComponent x={this.state.x} y={this.state.y}/>
        }
    }
}

class Mouse extends Component{
    render() {
        return <div>x的位置是:{this.props.x} y的位置是:{this.props.y}</div>
    }
}

class Cat extends Component {
    render() {
        return <img style={{width:100,height:80,position:'absolute',left: this.props.x - 50,top: this.props.y - 40}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573296942672&di=e20e0c9f1f77ae17e639a28fd082312a&imgtype=0&src=http%3A%2F%2Ffmn.rrfmn.com%2Ffmn058%2Fxiaozhan%2F20120610%2F1305%2Fp%2Fm2w500hq85lt_x_large_1nE7_3030000005831262.jpg"/>
    }
}

export class Hoc extends Component {
    render() {
        const EnhanceMouse = withPosition(Mouse)
        const EnhanceCat =withPosition(Cat)

        return (
            <div>
                <EnhanceMouse />
                <EnhanceCat />
            </div>
        );
    }
}

export default Hoc;
