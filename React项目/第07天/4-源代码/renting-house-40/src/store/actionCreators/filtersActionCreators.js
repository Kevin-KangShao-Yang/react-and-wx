import {
  SET_FILTER_DATA,
  SET_TITLE_VALUE,
  SET_OPEN_TYPE,
  SET_SELECT_VALUE
} from '../actionTypes/filtersTypes'
import { axios } from '../../utils/axios'
import { getCity } from '../../utils/city'

/**
 * 同步的action，用于更改仓库中 filterData 的值
 * @param {*} filterData
 */
const setFilterData = filterData => {
  return {
    type: SET_FILTER_DATA,
    payload: filterData
  }
}

/**
 * 异步的action，它会获取筛选组件展示所需要的数据，然后调用
 * 通过的action，设置给store中的 filterData
 */
export const asyncSetFilterData = () => {
  return async dispatch => {
    // 获取定位城市
    const { value } = await getCity()

    // 获取数据
    const result = await axios.get(`/houses/condition?id=${value}`)

    // 触发同步的action
    dispatch(setFilterData(result.data.body))
  }
}

/**
 *
 * @param {*} titleObj  {mode:true}  {price:true}
 */
export const setTitleValue = titleObj => {
  return {
    type: SET_TITLE_VALUE,
    payload: titleObj
  }
}

/**
 *
 * @param {*} type 就是一个字符串，比如 "area"、"mode"、"price"、"more"
 */
export const setOpenType = type => {
  return {
    type: SET_OPEN_TYPE,
    payload: type
  }
}

/**
 *
 * @param {*} obj  {price: ['PRICE|7000']}
 *                 mode: ['true']
 */
export const setSelectValue = obj => {
  return {
    type: SET_SELECT_VALUE,
    payload: obj
  }
}
