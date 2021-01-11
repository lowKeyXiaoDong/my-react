import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_SAGA } from './const'

const userInit = {
  isLogin: false,
}

export const loginReducer = (state = { ...userInit }, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, isLogin: true, userInfo: { ...payload } }
    case LOGIN_FAILURE:
      return { ...state, isLogin: false, userInfo: { ...payload } }
    case LOGIN_SAGA:
      return { ...state, isLogin: false, userInfo: { ...payload } }
    default:
      return state
  }
}
