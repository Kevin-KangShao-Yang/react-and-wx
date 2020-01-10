import { SET_FILTER_DATA,SET_TITLE_VALUE,SET_OPEN_TYPE } from '../actionTypes/filtersTypes'

const initState = {
    openType: '', // 当前打开的类型(区域、方式、租金、筛选，如果为''，代表没有打开子组件)
    selectTitleValue: { // 代表标题是否高亮，true代表高亮, false 代表不高亮
        area: false,
        mode: false,
        price: false,
        more: false
    },
    selectValue: { // 代表点击了确定之后，最终选择的值
        area: ['area',null],
        mode: ['null'],
        price: ['null'],
        more:[]
    },
    filterData: {} // 将来展示子组件中的数据，这个数据需要发送网络请求获取
}

export default (state = initState,action) => {
    switch (action.type) {
        case SET_FILTER_DATA:
            // 深拷贝
            const newState1 = {...state}

            newState1.filterData = {...newState1.filterData,...action.payload}
            
            return newState1

        case SET_TITLE_VALUE:
             // 深拷贝
             const newState2 = {...state}
             newState2.selectTitleValue = {...newState2.selectTitleValue,...action.payload}

             return newState2

        case SET_OPEN_TYPE:
            // 深拷贝
            const newState3 = {...state}

            newState3.openType = action.payload

            return newState3
    
        default:
            return state
    }
}