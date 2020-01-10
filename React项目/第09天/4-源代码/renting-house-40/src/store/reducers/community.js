import { SET_COMMUNITY } from '../actionTypes/communityTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_COMMUNITY:
      return action.payload

    default:
      return state
  }
}
