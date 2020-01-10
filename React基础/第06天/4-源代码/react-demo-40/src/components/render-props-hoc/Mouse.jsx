import React, { Component } from 'react';

import Common from './Common'

class Mouse extends Component {
    // render() {
    //     return <Common render={(x,y) => {
    //         return <div>x is {x} y is {y}</div>
    //     }}/>
    // }

    // render() {
    //     return <Common children={(x,y) => {
    //         return <div>x is {x} y is {y}</div>
    //     }}/>
    // }

    render() {
        return <Common>
            {
                (x,y) => {
                    return <div>x : {x}  y:{y}</div>
                }
            }
        </Common>
    }
}

export default Mouse;