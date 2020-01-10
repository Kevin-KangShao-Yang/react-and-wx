import React from 'react';
import './App.css';

// 导入子组件
import FuncComponent from './components/FuncComponent'
import ClassComponent from './components/ClassComponent'

function App() {
  // 返回的内容
  return (
    <div className="App">
        {/* 传值给函数子组件 */}
      <FuncComponent name="张三丰" age={666}/>
      <hr />
      {/* 传值给class类组件 */}
      <ClassComponent name="尹志平" age={777}/>
    </div>
  )
}
//默认导出
export default App;
