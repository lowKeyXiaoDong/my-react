import { call, put, take, takeEvery, fork } from 'redux-saga/effects'
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_SAGA } from './const'

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

function* loginHandle (action) {
  console.log(action, 'action');
  try {
    let res1 = call(LoginService.login, action.payload)
    yield put({ type: LOGIN_SUCCESS, payload: res1})
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error })
  }
}

function* loginSaga () {
  yield takeEvery(LOGIN_SAGA, loginHandle)
}

export default loginSaga
