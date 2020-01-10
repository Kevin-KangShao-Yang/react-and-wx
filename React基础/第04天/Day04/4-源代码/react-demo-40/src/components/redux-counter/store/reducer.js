import {ADD,MINUS} from './actionTypes'
/**
 * state 就是仓库中的默认值或是上一次的状态
 * 
 * action 触发的动作，它是一个对象
 *      里面必须要有一个属性 type，还可以有其他的属性
 *  action = {type:'ADD',count:2,xxx:yyy}
 *  action = {type:'MINUS',count:3}
 */
export default (state = 250,action) => {
    switch (action.type) {
        case ADD:
            
            return state + action.count

        case MINUS:
        
            return state - action.count
        
    
        default:
            return state
    }
}