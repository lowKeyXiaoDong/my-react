import React, { useState } from 'react'
import style from './style.module.scss'
import keepAlive from '@components/keepAlive'

const Login = (props) => {
  let [count, setCount] = useState(0)

  return (
    <div className={style.hcx_warp}>
      <img src='/images/1.gif' alt='' />

      <p>{count}</p>

      <button onClick={() => setCount((pres) => pres + 1)}>add</button>

      <p
        onClick={() => {
          props.history.push('/home')
        }}
      >
        跳转
      </p>
    </div>
  )
}

export default keepAlive(Login)
