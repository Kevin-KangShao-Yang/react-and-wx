import React, { Component } from 'react';

import GrandSon from './grandson'

import Context from './context'

export class Son extends Component {
    render() {
        return (
            <div>
                {/* <Context.Consumer>
                    {
                        data => {
                           return <div>
                               <p style={{color:data}}>这是儿子组件</p>
                                <GrandSon />
                           </div> 
                        }
                    }
                </Context.Consumer> */}

                这是儿子组件
                <GrandSon />
            </div>
        );
    }
}

export default Son;
