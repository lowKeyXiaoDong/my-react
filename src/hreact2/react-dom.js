let nextUnitOfWork = null
let wipRoot = null

// 实现render函数把vnode转成node并插入到container
function render(vnode, container) {
  wipRoot = {
    type: 'div',
    props: { children: { ...vnode } },
    stateNode: container,
  }

  nextUnitOfWork = wipRoot
}

function isStringOrNumber(vnode) {
  return typeof vnode === 'string' || typeof vnode === 'number'
}
// 把vnode转为真实的node
function createNode(workInProgress) {
  const { type, props } = workInProgress
  let node = document.createElement(type)
  updateNode(node, props)

  return node
}

// 赋值属性
function updateNode(node, newVal) {
  Object.keys(newVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(newVal[k])) {
        node.textContent = newVal[k]
      }
    } else {
      node[k] = newVal[k]
    }
  })
}

// 转换类组件
function updateClassComponent(workInProgress) {
  const { type, props } = workInProgress
  const instance = new type(props)
  const child = instance.render()

  // 协调子节点
  reconcileChildren(workInProgress, child)
}

// 转换函数组件
function updateFunctionComponent(workInProgress) {
  const { type } = workInProgress
  const child = type(workInProgress.props)

  // 协调子节点
  reconcileChildren(workInProgress, child)
}

// 转换原生标签节点 并递归, 赋值属性
function updateHostComponent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress)
  }

  // 协调子节点
  reconcileChildren(workInProgress, workInProgress.props.children)
}

// 递归子节点
function reconcileChildren(workInProgress, children) {
  // 如果是文本节点不需要遍历直接返回，最近插入父级
  if (isStringOrNumber(children)) {
    return
  }

  const newChildren = Array.isArray(children) ? children : [children]
  let previousNewFiber = null // 记录上一次的newFiber用做sibling
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i]
    // Fiber节点的属性
    let newFiber = {
      key: child.key,
      type: child.type,
      props: { ...child.props },
      stateNode: null,
      child: null,
      sibling: null,
      return: workInProgress,
    }

    if (i === 0) {
      workInProgress.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }

    previousNewFiber = newFiber
  }
}

// 执行自己返回下一个执行的任务  work In Progress正在执行的任务
function performUnitOfWork(workInProgress) {
  // step1: 执行自己
  const { type } = workInProgress
  if (typeof type === 'string') {
    updateHostComponent(workInProgress)
  } else if (typeof type === 'function') {
    type.prototype.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress)
  }

  // step2: 返回下一个执行的任务
  // 王朝的故事
  // 有子节点返回子节点, 没有返回兄弟节点，都没有返回父级的兄弟节点
  if (workInProgress.child) {
    return workInProgress.child
  }

  let nextFiber = workInProgress
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return
  }
}

function workLoop(IdleDeadline) {
  // 执行任务链
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // commit 提交
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
}

function commitRoot() {
  commitWorker(wipRoot.child)
  wipRoot = null
}

function commitWorker(workInProgress) {
  // 惠及亲友
  // 提交自己 提交孩子 提交兄弟
  if (!workInProgress) {
    // 没有执行中的return
    return
  }

  // todo 提交自己
  let parentNodeFiber = workInProgress.return // 获取父级的fiber

  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return
  }

  let parentNode = parentNodeFiber.stateNode

  // 新增
  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode)
  }

  commitWorker(workInProgress.child)
  commitWorker(workInProgress.sibling)
}

requestIdleCallback(workLoop)
export default { render }
