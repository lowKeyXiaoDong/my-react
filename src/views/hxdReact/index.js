// import * as React from 'react'
// import * as ReactDom from 'react-dom'

import React from './hreact/'
import ReactDom from './hreact/react-dom'
import Component from './hreact/Component'

function FunctionComponet(props) {
  return <div>函数组件 -- {props.name}</div>
}

class ClassComponent extends Component {
  render() {
    return <div>类组件</div>
  }
}
const jsx = (
  <div className="border">
    <p>H X D</p>
    <p>hanxiaodon</p>
    <a href="javascrips: 0">HANXIAODON</a>
    {/* <FunctionComponet name="韩晓东" />
    <ClassComponent name="韩晓东" />
    <ul>
      <Node />
    </ul> */}
  </div>
)

function Node() {
  return (
    <>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </>
  )
}
ReactDom.render(jsx, document.querySelector('#root'))
