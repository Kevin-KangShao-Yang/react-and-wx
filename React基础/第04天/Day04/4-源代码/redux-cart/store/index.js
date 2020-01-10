import {createStore,applyMiddleware,compose} from 'redux'

// 导入异步action需要的 redux-thunk
import thunk from 'redux-thunk'

// 导入 reducer
import reducer from './reducer'

// 创建仓库
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

// 导出去
export default store