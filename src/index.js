import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from './hreact/react-dom'
import Component from './hreact/Component'
import './index.css'

const FunctionComponent = (props) => {
  return <div>{props.name}</div>
}

class ClassComponent extends Component {
  render() {
    return <div>{this.props.name}</div>
  }
}

const jsx = (
  <div className='warp'>
    <h1>全栈</h1>
    <a href='https://www.kaikeba.com'>kkb</a>
    <FunctionComponent name='函数组件' />
    <ClassComponent name='类组件' />
  </div>
)

// render函数实现
// 函数组件
// 类组件

ReactDOM.render(jsx, document.getElementById('root'))
