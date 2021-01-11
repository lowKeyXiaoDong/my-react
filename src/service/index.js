import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS } from '../store/const'
import loginSaga from '../store/loginSaga'

const LoginService = {
  login(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.userName === 'hxd') {
          resolve({
            name: 'hxd',
            isLoing: true,
          })
        }
      }, 1000)
    })
  },
  getMoreUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userInfo.userName === 'hxd') {
          resolve({
            name: 'hxd',
            isLoing: true,
            score: 100,
          })
        }
      }, 1000)
    })
  },
}

export const getLogin = (userName) => (dispatch) => {
  LoginService.login({ userName }).then((res) => {
    getMoreUserInfo(dispatch, { userName })
  })
}

export const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then((res) => {
    dispatch({ type: LOGIN_SUCCESS, payload: res })
  })
}

export const sagaLogin = (userName) => {
  return { type: LOGIN_SAGA, payload: { userName } }
}
