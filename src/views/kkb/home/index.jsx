import React, { Component } from 'react'
import { Context, UserContext } from './context'
import KkbChildren from '../component/kkbChildren'
import ComsumerPage from '../component/ComsumerPage'
import KkbChildrenFn from '../component/kkbChildrenFn'

class KkbHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: {
        color: 'red',
      },
      user: {
        name: 'hxd',
      },
    }
  }
  render() {
    const { theme, user } = this.state
    return (
      <div>
        <h3>Context</h3>
        <Context.Provider value={theme}>
          <UserContext.Provider value={user}>
            <KkbChildren></KkbChildren>
            <ComsumerPage />
            <KkbChildrenFn></KkbChildrenFn>
          </UserContext.Provider>
        </Context.Provider>
      </div>
    )
  }
}

export default KkbHome

// * step1: 创建一个context
// * step2: 创建一个Provider, 传递value
// * step3: 子组件消费 使用三种方式
// * 子组件消费1: 使用ContextType 只能用在类组件，并且一个类组件只能用一次
// * 子组件消费2: 使用useContext 只能用在函数组件中
// * 子组件消费3: Comsumer 可以类组件接收多个Context
