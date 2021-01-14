// 实现render函数把vnode转成node并插入到container
function render(vnode, container) {
  let node = createNode(vnode)

  container.appendChild(node)
}

function isStringOrNumber(vnode) {
  return typeof vnode === 'string' || typeof vnode === 'number'
}
// 把vnode转为真实的node
function createNode(vnode) {
  console.log(vnode)
  let node = null
  const { type } = vnode

  if (typeof type === 'string') {
    // 原生标签元素
    node = updateHostComponent(vnode)
  } else if (isStringOrNumber(vnode)) {
    // 文本节点
    node = updateTextComponent(vnode)
  } else if (typeof type === 'function') {
    // 函数组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode)
  }

  return node
}

// 赋值属性
function updateNode(node, newVal) {
  Object.keys(newVal)
    .filter((k) => k !== 'children')
    .forEach((k) => {
      node[k] = newVal[k]
    })
}

// 转换类组件
function updateClassComponent(vnode) {
  const { type, props } = vnode
  const instance = new type(props)
  const child = instance.render()
  const node = createNode(child)

  return node
}

// 转换函数组件
function updateFunctionComponent(vnode) {
  const { type } = vnode
  const vvnode = type(vnode.props)
  const node = createNode(vvnode)

  return node
}

// 转换原生标签节点 并递归, 赋值属性
function updateHostComponent(vnode) {
  const { type, props } = vnode
  const node = document.createElement(type)
  // 赋值属性
  updateNode(node, props)
  // 递归
  reconcileChildren(node, props.children)
  return node
}

// 递归子节点
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children]
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i]
    render(child, parentNode)
  }
}

// 转换文本标签节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode + '')
  return node
}

export default { render }
