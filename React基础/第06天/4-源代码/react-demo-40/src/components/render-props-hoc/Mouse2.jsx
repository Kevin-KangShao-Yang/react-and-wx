import React, { Component } from 'react';

class Mouse extends Component {
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
                当前鼠标的位置是 x:{x}  y:{y}
            </div>
        );
    }
}

export default Mouse;