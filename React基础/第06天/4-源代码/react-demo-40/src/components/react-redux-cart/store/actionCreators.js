import {ADD_GOODS,UPDATE_GOODS,DELETE_GOODS} from './actionTypes'

// 新增的创建action的方法
const addGoods = goods => {
    return {
        type: ADD_GOODS,
        payload: goods // payload 载荷就是参数的意思
    }
}

// 修改的创建action的方法
const updateGoods = goods => {
    return {
        type: UPDATE_GOODS,
        payload: goods
    }
}

// 删除action的同步方法
const deleteGoods = id => {
    return {
        type: DELETE_GOODS,
        payload: id
    }
}

const asyncDeleteGoods = id => {
    return dispatch => {
        setTimeout(() => {
            // 触发同步的action
            dispatch(deleteGoods(id))
        }, 1000);
    }
}

// 按需导出
export {
    addGoods,
    updateGoods,
    asyncDeleteGoods
}