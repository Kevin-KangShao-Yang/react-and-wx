import {createStore,applyMiddleware,compose} from 'redux'

// 导入reducer
import reducer from './reducer'

// 导入中间件
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 应用中间件创建仓库
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

// 导出去给组件使用
// 组件可以根据store获取仓库中的值及触发action
export default store