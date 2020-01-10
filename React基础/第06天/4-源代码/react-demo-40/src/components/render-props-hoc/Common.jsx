import React, { Component } from 'react';

export class Common extends Component {
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
        // return this.props.render(this.state.x,this.state.y)

        return this.props.children(this.state.x,this.state.y)
    }
}

export default Common;
