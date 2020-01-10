import {ADD_GOODS,UPDATE_GOODS,DELETE_GOODS} from './actionType'

// 新增时候的 action 对象
export const addGoods = goods => {
    return {
        type:ADD_GOODS,
        goods
    }
}

// 修改时候的 action 对象
export const updateGoods = goods => {
    return {
        type:UPDATE_GOODS,
        goods
    }
}

// 删除的action 【同步】
export const deleteGoods = id => {
    return {
        type: DELETE_GOODS,
        id
    }
} 

// 删除的action 【异步】
export const asyncDeleteGoods = id => {
    return dispatch => {
        setTimeout(() => {
            dispatch(deleteGoods(id))
        }, 1000);
    }
}