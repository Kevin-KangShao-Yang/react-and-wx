import React, { useState, useContext } from 'react'

const CounterContext = React.createContext()

function UseContext() {
  const [count, setCount] = useState(0)

  return (
    <div>
      count is {count} &nbsp;&nbsp;
      <button onClick={() => setCount(count + 1)}>+1</button>
      <CounterContext.Provider value={count}>
        <Son />
      </CounterContext.Provider>
    </div>
  )
}

function Son() {
  const count = useContext(CounterContext)
  return (
    <div>
      儿子组件中的值 {count} <br />
      <GrandSon />
    </div>
  )
}

function GrandSon() {
  const count = useContext(CounterContext)

  return <div>孙子组件---{count}</div>
}

export default UseContext
