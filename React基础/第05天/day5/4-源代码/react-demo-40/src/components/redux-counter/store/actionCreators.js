import {ADD,MINUS} from './actionTypes'

/**
 * 按需导出创建 新增 的action
 * @param {*} count 
 */
export const add = count  => {
    return {
        type:ADD,
        count
    }
}

/**
 * 按需导出创建 减少 的action
 * @param {*} count 
 */
export const minus = count => {
    return {
        type:MINUS,
        count
    }
}

export const asyncMinus = count => {
    return dispatch => {
        // 做异步的操作
        setTimeout(() => {
            // 最终必须通过dispatch触发同步的action才能更改成功
            dispatch(minus(count))
        }, 2000);
    }
}