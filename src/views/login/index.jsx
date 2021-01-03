import React from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from '../kkb/redux/hReactRedux'

const Login = () => {
  const state = useSelector(({ count }) => count) // 获取store.state
  const dispatch = useDispatch() // 获取dispatch

  const add = () => {
    dispatch({
      type: 'ADD',
    })
  }

  return (
    <div className={style.hcx_warp}>
      {/* <img src='/images/1.gif' alt='' /> */}

      <p>{state}</p>
      <button onClick={add}>add</button>
    </div>
  )
}

export default Login
