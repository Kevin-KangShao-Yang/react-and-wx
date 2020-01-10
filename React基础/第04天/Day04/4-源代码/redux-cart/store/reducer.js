import { ADD_GOODS, UPDATE_GOODS, DELETE_GOODS } from "./actionType";
/**
 * 仓库中存放的数据格式
 *  [{id:1001,num:2,price:2.5,xxx},{id:1002,num:3,price:5,xxxx}]
 *
 * action 是一个对象，type是必须的
 */

 // 初始化仓库的时候，从本地取出来，赋值给state
 const goodsList = JSON.parse(window.localStorage.getItem('cache_goodslist') || '[]')

export default (state = goodsList, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_GOODS:
      // 深拷贝
      const ADDLIST = JSON.parse(JSON.stringify(state))
            
      const oldGoods = ADDLIST.find(item => item.id === action.goods.id)
      if (oldGoods) { // 之前存在过该商品
        oldGoods.num += action.goods.num
      } else {
        ADDLIST.push(action.goods)
      }

      return ADDLIST

    case UPDATE_GOODS:
      // 深拷贝
      const UPDATELIST = JSON.parse(JSON.stringify(state))
      // 根据传递进来的数据，找到仓库中的数据，然后更改它的num
      const oldUpdateGoods = UPDATELIST.find(item => item.id === action.goods.id)
      oldUpdateGoods.num = action.goods.num

      return UPDATELIST

    case DELETE_GOODS:
       // 深拷贝
       const DELETELIST = JSON.parse(JSON.stringify(state))

       const index = DELETELIST.findIndex(item => item.id === action.id)

       DELETELIST.splice(index,1)

      return DELETELIST

    default:
      return state;
  }
};
