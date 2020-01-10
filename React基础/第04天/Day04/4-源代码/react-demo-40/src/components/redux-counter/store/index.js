//导入applyMiddleware处理异步操作action的方法
//导入compose是用来配置谷歌浏览器中redux扩展组件查看store的变化
import {createStore,applyMiddleware,compose} from 'redux'
// 导入reducer
import reducer from './reducer'
// 导入redux-thunk用于处理action异步操作
import thunk from 'redux-thunk'
//谷歌浏览器中redux扩展组件的方法
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 应用中间件创建仓库
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))
// 导出去给组件使用
// 组件可以根据store获取仓库中的值及触发action
export default store