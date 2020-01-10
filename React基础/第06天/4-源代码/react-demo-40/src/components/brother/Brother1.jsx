import React,{Component} from 'react'

import bus from './bus'

export default class Brother1 extends Component{
    sendValue = (name,age) => {
        bus.emit('myEvent',{name,age})
    }

    render() {
        return <div>
            我是兄弟1<br/>
            <button onClick={() => this.sendValue('张三丰',666)}>传递值给兄弟2</button>
            <button onClick={() => this.sendValue('灭绝师太',663)}>传递值给兄弟2</button>
        </div>
    }
}