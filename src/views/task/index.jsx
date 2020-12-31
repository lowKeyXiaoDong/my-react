import React, { Component, Suspense, lazy } from 'react'
import styles from './style.module.scss'
import keepAlive from '@components/keepAlive'

const Nav = lazy(() => import('@components/nav'))
const Input = lazy(() => import('@components/input'))

class TaskIndex extends Component {
  state = {
    count: 0,
  }

  add = () => {
    let { count } = this.state
    this.setState({ count: 2 })
  }

  submit = () => {
    this.props.history.push('/home')
  }

  render() {
    const { count } = this.state
    return (
      <div className={styles.task}>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav
            leftContent={'返回'}
            rightContent={'搜索'}
            onLeftClick={() => {
              console.log('点击返回')
            }}
            onRightClick={() => {
              console.log('right')
            }}
          >
            任务说明
          </Nav>
          <Input
            onChange={(value) => {
              console.log(value, 'value')
            }}
          />

          <p>{count}</p>
          <button onClick={this.add}>add</button>
          <button onClick={this.submit}>提交</button>
        </Suspense>
      </div>
    )
  }
}

export default keepAlive(TaskIndex)
