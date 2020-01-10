//导入react包
import React,{Component} from 'react'
//导入 封装好的bus插件
import bus from './bus'
//默认导出 Brother2组件
export default class Brother2 extends Component{
    state = {
        name:'',
        age:''
    }
    // 组件挂载完毕之后执行的生命周期钩子，只会执行一次
    componentDidMount() {
        //接收传过来的数据
        bus.on('myEvent',data => {
            this.setState({
                name: data.name,
                age: data.age
            })
        })
    }
    //渲染组件的生命周期钩子
    render() {
        const {name,age} = this.state    //ES6解构语法
        return <div>
            我是兄弟2<br/>
            {name} {age}
        </div>
    }
}