import React, { Component } from 'react';
//导入Context(上下文) 自己封装的插件
import Context from './context'
export class Grandson extends Component {  //按需导出
    render() {
        return (
            <div>   {/* 接收爷组件传来的值 */}
                <Context.Consumer>    
                    {    {/* {  data就是传过来value的值 */}
                     data => {
                         return <p style={{color:data.color}}>你这个孙子</p>
                        }
                    }
                </Context.Consumer>
            </div>
        );
    }
}
export default Grandson; //默认导出
