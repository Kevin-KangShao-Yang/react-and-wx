import {createStore ,applyMiddleware,compose  } from 'redux'

// 导入reducer
import reducer from './reducer'

// 导入异步action的中间件
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建仓库，并且导出
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

// 导出
/**
 * store.dispatch 触发action
 * store.getState 获取仓库中的数据
 * store.subscribe 监听仓库中数据的变化
 */
export default store