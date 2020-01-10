import React from 'react';
import './App.css';

// 导入子组件
import FuncComponent from './components/FuncComponent'
import ClassComponent from './components/ClassComponent'
import Counter from './components/Counter'
// import Index from './components/brother/'
// import Index from './components/life'

import Index from './components/grandpa'

function getCount(count){
  console.log(`App ${count}`)
}

function App() {
  // 返回的内容
  return (
    <div className="App">
      {/* <FuncComponent name="张三丰" age={666}/> */}
      {/* <hr /> */}
      {/* <ClassComponent name="尹志平" age={777}/> */}

      {/* <Counter initCount={10} callback={getCount}/> */}

      <Index />
    </div>
  )
}

export default App;
