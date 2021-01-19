import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM, { useState } from './hreact2/react-dom'
import Component from './hreact2/Component'
import './index.css'

function FunctionComponent(props) {
  let [count, setCount] = useState(0)
  return <div>
    <button onClick={() => setCount(count+1)}>{count}</button>
  </div>
}

class ClassComponent extends Component {
  render() {
    return <div>{this.props.name}</div>
  }
}

function FragmentComponent(props) {
  return (
    <>
      <h1>123</h1>
      <h1>456</h1>
    </>
  )
}

const jsx = (
  <div className='warp'>
    <h1>全栈</h1>
    <a href='https://www.kaikeba.com'>kkb</a>
    <FunctionComponent name='函数组件' />
    <ClassComponent name='类组件' />
    <FragmentComponent />
  </div>
)

// render函数实现
// 函数组件
// 类组件
// Fragment

ReactDOM.render(jsx, document.getElementById('root'))
