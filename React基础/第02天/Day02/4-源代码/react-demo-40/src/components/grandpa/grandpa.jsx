import React, { Component } from 'react';  //导入react
import Son from './son'   //导入子组件
//导入Context(上下文) 自己封装的插件
import Context from './context'
export class Grandpa extends Component {  //按需导出
    state = {      //相当于vue的data
        color:'',
        age:18
    }
    render() {  //渲染dom树的生命周期钩子
        return (
            <div>  {/* 点击改变color  */}
                <button onClick={() => this.setState({color:'red'})}>红色</button>
                <div>
 {/*style={{color:this.state.color}}  最外层{}说明js表达式  最里层的是style属性方法 */}
                    <p style={{color:this.state.color}}>我是爷爷</p>
        {/* 将自身的数据传给所有后代组件   value固定的传值方式,不可变 */}
                    <Context.Provider value={this.state}>
                        <Son />     {/* 子组件 */}
                    </Context.Provider>
                </div>
            </div>
        );
    }
}
export default Grandpa; //默认导出
