import React,{Component} from 'react'

import Brother1 from './Brother1'
import Brother2 from './Brother2'

export default class Index extends Component{
    render() {
        return <div>
            <Brother1 />
            <hr/>
            <Brother2 />
        </div>
    }
}