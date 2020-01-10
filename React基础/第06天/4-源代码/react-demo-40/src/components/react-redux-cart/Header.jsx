import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <div>
                i am a header <br/>
                <button>跳转到detail</button>
            </div>
        );
    }
}

export default withRouter(Header);