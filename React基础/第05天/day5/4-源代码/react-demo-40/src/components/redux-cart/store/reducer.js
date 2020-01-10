import {ADD_GOODS,UPDATE_GOODS,DELETE_GOODS} from './actionTypes'

// 每次仓库初始化的时候，从本地获取数据，然后赋值给仓库的默认值
const goodsList = JSON.parse(window.localStorage.getItem('mycart') || '[]')

export default (state = goodsList,action) => {
    switch (action.type) {
        case ADD_GOODS:
            const addGoodsList = [...state]

            // 判断我传递进来的 action.payload 这个商品对象在之前是否存在,如果存在则只需要把之前的
            // 那个对象取出来，然后给它的num属性加1,如果没有则push

            // 调用数组的find方法，去遍历我们的元素
            const addGoodsObj = addGoodsList.find(item => item.id === action.payload.id)
            if (addGoodsObj) {
                // 更改数量
                addGoodsObj.num += 1
            } else { // 不存在
                // 新增
                addGoodsList.push(action.payload)
            }

            // 必须返回
            return addGoodsList

        case UPDATE_GOODS:
            const updateGoodsList = [...state]

            // 拿着传递过来的id去数组中找，找到那个对象之后，重新给num赋值即可
            const updateObj = updateGoodsList.find(item => item.id === action.payload.id)
            updateObj.num = action.payload.num

            return updateGoodsList

        case DELETE_GOODS:
            // 深拷贝上一次的数据
            const deleteGoodsList = [...state]
    
            // 根据传递过来的id，找到数组中的索引
            const deleteIndex = deleteGoodsList.findIndex(item => item.id === action.payload.id)
            deleteGoodsList.splice(deleteIndex,1)

            return deleteGoodsList

        default:
            return state
    }
}