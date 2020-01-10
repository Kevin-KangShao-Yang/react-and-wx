import React, { Component } from 'react';

import store from './store/'

class Show extends Component {
    constructor() {
        super()

        this.state = {
            count: store.getState()
        }
    }

    componentDidMount() {
        store.subscribe(() => {
            // console.log("------subscribe-------")

            this.setState({
                count: store.getState()
            })
        })
    }

    render() {
        return (
            <div>
                仓库中的值是：{this.state.count}
            </div>
        );
    }
}

export default Show;