// import * as React from 'react'
// import * as ReactDom from 'react-dom'

import React from './hreact/'
import ReactDom from './hreact/react-dom'

function FunctionComponet (props) {
  return (<div>函数组件 -- {props.name}</div>)
}
const jsx = (
  <div className='border'>
    <p>H X D</p>
    <p>hanxiaodon</p>
    <a href="javascrips: 0">HANXIAODON</a>
    <FunctionComponet name='韩晓东' />
  </div>
)

ReactDom.render(jsx, document.querySelector('#root'))