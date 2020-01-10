import { createStore, applyMiddleware, compose } from 'redux'

// 导入根reducer
import rootReducer from './reducers'

// 导入thunk
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 创建仓库
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// 导出仓库
export default store
