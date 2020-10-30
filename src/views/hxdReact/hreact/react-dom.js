// * 定义render函数

function render(vnode, container) {
  // * 1、 vnode -> node
  const node = createNode(vnode, container)

  // * 2、 放入container  container.appendChild(node)
  node && container.appendChild(node)
}

// * 把vnode -> node
function createNode(vnode, parentNode) {
  const { type, props } = vnode
  let node = null
  // todo根据vnode
  if (type === 'TEXT') {
    // 文本节点
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    // 原生标签节点
    node = document.createElement(type)
  } else if (typeof type === 'function') {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode)
  }

  if (type === undefined) {
    // * 遍历children
    reconcileChildren(parentNode, props.children)
  } else {
    // * 遍历children
    reconcileChildren(node, props.children)

    // * 更新属性
    updateNode(node, props)
  }

  return node
}

// * 类组件 创建node
function updateClassComponent(vnode, parentNode) {
  const { type, props } = vnode
  const instance = new type(props)
  const vvnode = instance.render()

  const node = createNode(vvnode, parentNode)
  return node
}

// * 函数组件 创建node
function updateFunctionComponent(vnode, parentNode) {
  const { type, props } = vnode
  const vvnode = type(props)
  const node = createNode(vvnode, parentNode)

  return node
}

// * 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((item) => item !== 'children')
    .forEach((val) => {
      node[val] = nextVal[val]
    })
}

// * 把子节点插入到dom节点中
function reconcileChildren(node, children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i]

    render(child, node)
  }
}
export default { render }
