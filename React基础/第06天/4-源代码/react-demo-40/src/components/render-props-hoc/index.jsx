import React, { Component } from 'react';

import Mouse from './Mouse'
import Cat from './Cat'

import Hoc from './Hoc'

class Index extends Component {
    render() {
        return (
            <div>
                {/* <Mouse />
                <Cat /> */}

                <Hoc />
            </div>
        );
    }
}

export default Index;