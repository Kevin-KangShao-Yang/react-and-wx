import React, { useReducer } from 'react'

const initCount = {
  count: 100
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        count: state.count + 1
      }

    case 'MINUS':
      return {
        count: state.count - 1
      }

    default:
      return state
  }
}

function UseReducer() {
  /**
   * useReducer 接收两个参数，一个是reducer函数，一个是默认值
   * 返回一个数组，元素1:仓库中的值 元素2：触发action的dispatch
   */
  const [state, dispatch] = useReducer(reducer, initCount)

  return (
    <div>
      count is {state.count}
      <br />
      <button onClick={() => dispatch({ type: 'MINUS' })}>-</button>&nbsp;&nbsp;
      <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
    </div>
  )
}

export default UseReducer
