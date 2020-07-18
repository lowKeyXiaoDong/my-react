import React, { Component, Suspense, lazy } from 'react'
import styles from './style.module.scss'

const Nav = lazy(() => import('@components/nav'))
const Input = lazy(() => import('@components/input'))

class TaskIndex extends Component {
  render() {
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
          <Input onChange={(value) => {
            console.log(value, 'value')
          }}/>

          <button onClick={() => {
            console.log(this.state)
          }}>提交</button>
        </Suspense>
      </div>
    );
  }
}

export default TaskIndex;