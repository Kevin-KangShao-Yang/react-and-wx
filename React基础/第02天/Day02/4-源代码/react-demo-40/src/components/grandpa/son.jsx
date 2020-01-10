import React, { Component } from 'react'
// 导入子组件
import GrandSon from './grandson'
//导入Context(上下文) 自己封装的插件
import Context from './context'
export class Son extends Component { //按需导出
    state = {
        //相当于vue的data
        ageSon: 0
    }
    componentDidMount() { //完成挂载dom树后的生命钩子
        this.setState({ //异步方法,改变state值
            ageSon: this.context.age
        },() => { // 该回调函数，等着模型赋值完毕之后，才会执行该回调函数
            console.log(this.state.message)
        })
    }
//让后代组件能通过 this.context 获取到传过来的value值
    static contextType = Context;
    render() { //渲染dom树的生命周期钩子
        return (
            <div>
                {this.state.ageSon} 这是儿子组件
                <GrandSon />
            </div>
        )
    }
}
export default Son   //默认导出
