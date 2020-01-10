import {
  SET_FILTER_DATA,
  SET_TITLE_VALUE,
  SET_OPEN_TYPE,
  SET_SELECT_VALUE
} from '../actionTypes/filtersTypes'

const initState = {
  openType: '', // 当前打开的类型(区域、方式、租金、筛选，如果为''，代表没有打开子组件)
  selectTitleValue: {
    // 代表标题是否高亮，true代表高亮, false 代表不高亮
    area: false,
    mode: false,
    price: false,
    more: false
  },
  selectValue: {
    // 代表点击了确定之后，最终选择的值
    area: ['area', null],
    mode: ['null'],
    price: ['null'],
    more: []
  },
  filterData: {}, // 将来展示子组件中的数据，这个数据需要发送网络请求获取
  isNeedLoad: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_FILTER_DATA:
      // 深拷贝
      const newState1 = JSON.parse(JSON.stringify(state))

      newState1.filterData = { ...newState1.filterData, ...action.payload }

      newState1.isNeedLoad = false

      return newState1

    case SET_TITLE_VALUE:
      // 深拷贝
      const newState2 = JSON.parse(JSON.stringify(state))
      newState2.selectTitleValue = {
        ...newState2.selectTitleValue,
        ...action.payload
      }

      newState2.isNeedLoad = false

      return newState2

    case SET_OPEN_TYPE:
      // 深拷贝
      // const newState3 = {...state} // 对第一层进行深拷贝，如果层级太深，使用 JSON.parse(JSON.stringify(state))
      const newState3 = JSON.parse(JSON.stringify(state))

      newState3.openType = action.payload

      // 处理高亮的状态
      Object.keys(newState3.selectTitleValue).forEach(key => {
        if (key === 'area') {
          newState3.selectTitleValue[key] =
            newState3.selectValue[key].length > 2
        } else if (key === 'mode' || key === 'price') {
          newState3.selectTitleValue[key] =
            newState3.selectValue[key][0] !== 'null'
        } else if (key === 'more') {
          newState3.selectTitleValue[key] =
            newState3.selectValue[key].length > 0
        }
      })

      // 让当前点击的高亮
      if (action.payload !== '') {
        newState3.selectTitleValue[newState3.openType] = true
      }

      newState3.isNeedLoad = false

      return newState3

    case SET_SELECT_VALUE:
      const newState4 = JSON.parse(JSON.stringify(state))

      newState4.selectValue = { ...newState4.selectValue, ...action.payload }

      // 关闭
      newState4.openType = ''

      // 处理高亮的状态
      Object.keys(newState4.selectTitleValue).forEach(key => {
        if (key === 'area') {
          newState4.selectTitleValue[key] =
            newState4.selectValue[key].length > 2
        } else if (key === 'mode' || key === 'price') {
          newState4.selectTitleValue[key] =
            newState4.selectValue[key][0] !== 'null'
        } else if (key === 'more') {
          newState4.selectTitleValue[key] =
            newState4.selectValue[key].length > 0
        }
      })

      newState4.isNeedLoad = true

      return newState4

    default:
      return state
  }
}
