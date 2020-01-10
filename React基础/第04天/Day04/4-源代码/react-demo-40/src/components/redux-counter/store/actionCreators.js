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
        // 做异步的操作,一般应用在axios中
        setTimeout(() => { //用setTimeout模拟axios异步操作
            // 最终必须通过dispatch触发同步的action才能更改成功
            //minus是在纯函数中一个同步的方法
            //count是一个参数
            dispatch(minus(count))
        }, 2000);
    }
}