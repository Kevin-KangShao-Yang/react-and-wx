//导入react包
import React,{Component} from 'react'
//导入 封装好的bus插件
import bus from './bus'
//默认导出 Brother1 组件
export default class Brother1 extends Component{
    //创建一个方法
    sendValue = (name,age) => {
        //将数据传值出去
        bus.emit('myEvent',{name,age})
    }
//渲染生命周期钩子
    render() {
        return <div>
            我是兄弟1<br/>
            <button onClick={() => this.sendValue('张三丰',666)}>传递值给兄弟2</button>
            <button onClick={() => this.sendValue('灭绝师太',663)}>传递值给兄弟2</button>
        </div>
    }
}