import React, { useState } from 'react'
import style from './style.module.scss'
import { getLogin, sagaLogin } from '../../service'
import { connect } from 'react-redux'

const Login = (props) => {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')

  const Login = async () => {
    sagaLogin(value)
  }

  console.log(props);
  return (
    <div className={style.hcx_warp}>
      {/* <img src='/images/1.gif' alt='' />

      <p>{count}</p>

      <button onClick={() => setCount((pres) => pres + 1)}>add</button>

      <p
        onClick={() => {
          props.history.push('/home')
        }}
      >
        跳转
      </p> */}

      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      <p onClick={Login}>登录</p>
      <p>{ '' +props.isLogin }</p>
    </div>
  )
}

export default connect(
  ({ user }) => ({ isLogin: user.isLogin })
)(Login)
