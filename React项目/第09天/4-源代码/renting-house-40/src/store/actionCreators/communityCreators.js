import { SET_COMMUNITY } from '../actionTypes/communityTypes'
/**
 * 设置 community 的 actionCrator
 * @param {*} community 
 */
export const setCommunity = community => {
    return {
        type: SET_COMMUNITY,
        payload: community
    }
}