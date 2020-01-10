import React, { Component } from 'react';

import Counter from './Counter'
import Show from './Show'

class Index extends Component {
    render() {
        return (
            <div>
                <Counter />
                <hr/>
                <Show />
            </div>
        );
    }
}

export default Index;