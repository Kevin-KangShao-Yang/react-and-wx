import React, { Component } from 'react';

import Context from './context'

export class Grandson extends Component {
    render() {
        return (
            <div>
                <Context.Consumer>
                    {
                        data => {
                            return <p style={{color:data}}>你这个孙子</p>
                        }
                    }
                </Context.Consumer>
            </div>
        );
    }
}

export default Grandson;
