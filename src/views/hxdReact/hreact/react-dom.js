// * 定义render函数

function render(vnode, container) {
  // * 1、 vnode -> node
  const node = createNode(vnode)
  // * 2、 放入container  container.appendChild(node)
  container.appendChild(node)
}

// * 把vnode -> node
function createNode(vnode) {
  const { type, props } = vnode
  let node;
  // todo根据vnode 
  if (type === 'TEXT') {
    // 文本节点
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    // 原生标签节点
    node = document.createElement(type)
  } else if (typeof type === 'function') {
    node = updateFunctionComponent(vnode)
  }

  // * 遍历children
  reconcileChildren(node, props.children)

  // * 更新属性
  updateNode(node, props)
  return node
}

// * 函数组件 创建node
function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  const vvnode = type(props)
  const node = createNode(vvnode)

  return node
}

// * 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal).filter(item => item !== 'children').forEach(val => {
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