// * 定义render函数

function render(vnode, container) {
  // * 1、 vnode -> node
  // const node = createNode(vnode, container)

  // // * 2、 放入container  container.appendChild(node)
  // node && container.appendChild(node)

  wipRoot = {
    stateNode: container,
    props: {
      children: [vnode],
    },
  }

  nextUnitOfWork = wipRoot
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
// function reconcileChildren(node, children) {
//   for (let i = 0; i < children.length; i++) {
//     const child = children[i]

//     render(child, node)
//   }
// }
// * 处理下一个要工作的fiber
let nextUnitOfWork = null

// * 正在工作的fiber
let wipRoot = null

// * 把子节点插入到dom节点中
function reconcileChildren(workInProgress, children) {
  let previouNewFiber = null

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    let newFiber = {
      type: child.type,
      key: child.key,
      props: child.props,
      stateNode: null,
      child: null,
      sibling: null,
      return: workInProgress,
    }

    if (i === 0) {
      workInProgress.child = newFiber
    } else {
      previouNewFiber.sibling = newFiber
    }

    previouNewFiber = newFiber
  }
}

function updateHostComponet(workInProgress) {
  // * step 1: 更新fiber属性
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress)
  }

  // * step 2: 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children)
}

function performUnitOfWork(workInProgress) {
  // * step 1: 更新当前fiber
  // todo 原生节点 div p a
  updateHostComponet(workInProgress)

  // * step 2: 返回下一个fiber 王朝
  if (workInProgress.child) { // 有孩子给孩子
    return workInProgress.child
  }

  let next = workInProgress
  while (next) {
    if (next.sibling) { // 没有孩子给兄弟
      return next.sibling
    }
    next = next.return // 没有兄弟给叔叔 什么都没有的返回undefined
  }
}

// * 更新fiber
function workLoop(idleDeadline) {
  // 如果fiber存在并且空闲时间为1毫秒的时候开始执行
  while (nextUnitOfWork && idleDeadline.timeRemaining() > 1) {
    // step 1: 更新当前fiber
    // step 2: 返回下一个fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 没有fiber提交
  if (!nextUnitOfWork) {
    // * vnode > node
    commitRoot()
  }
}

function commitRoot() {
  // 分批提交
  commitWork(wipRoot.child)

  wipRoot = null
}

function commitWork(workInProgress) {
  if (!workInProgress) {
    return
  }
  // * step 1: 提交自己
  // todo 
  let parentNodeFiber = workInProgress.return
  let parentNode = parentNodeFiber.stateNode

  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode)
  }
  // * step 2: 提交child
  commitWork(workInProgress.child)
  // * step 3: 提交sibling
  commitWork(workInProgress.sibling)

}
// * 空闲时间执行一些东西
requestIdleCallback(workLoop)

export default { render }
