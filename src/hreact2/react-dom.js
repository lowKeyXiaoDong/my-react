import { Placement, Update } from './const'

let nextUnitOfWork = null
let wipRoot = null
let currentRoot = null

let wipFiber = null

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
  updateNode(node, {}, props)

  return node
}

// 赋值属性
function updateNode(node, oldVal, newVal) {
  Object.keys(oldVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(oldVal[k])) {
        node.textContent = ''
      }
    } else if (k.slice(0, 2) === 'on') {
      // 注册事件
      const eventName = k.slice(2).toLocaleLowerCase()
      node.addEventListener(eventName, oldVal[k])
    } else {
      if (!(k in newVal)) {
        node[k] = ''
      }
    }
  })

  Object.keys(newVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(newVal[k])) {
        node.textContent = newVal[k] + ''
      }
    } else if (k.slice(0, 2) === 'on') {
      // 注册事件
      const eventName = k.slice(2).toLocaleLowerCase()
      node.addEventListener(eventName, newVal[k])
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
  // 赋初始值
  wipFiber = workInProgress
  wipFiber.hooks = []
  wipFiber.hooksIndex = 0

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

// Fragment
function updateFragmentComponent(workInProgress) {
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
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child
  let previousNewFiber = null // 记录上一次的newFiber用做sibling
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i]
    let same = child && oldFiber && child.type === oldFiber.type && child.key === oldFiber.key
    let newFiber
    if (same) {
      // 复用
      newFiber = {
        key: child.key,
        type: child.type,
        props: { ...child.props },
        stateNode: oldFiber.stateNode,
        child: null,
        sibling: null,
        return: workInProgress,
        alternate: oldFiber,
        flag: Update,
      }
    }

    if (!same && child) {
      // 新增
      // Fiber节点的属性
      newFiber = {
        key: child.key,
        type: child.type,
        props: { ...child.props },
        stateNode: null,
        child: null,
        sibling: null,
        return: workInProgress,
        flag: Placement,
      }
    }

    if (!same && oldFiber) {
      // 删除
    }

    // 遍历完指向下一个
    if (oldFiber) {
      oldFiber = oldFiber.sibling
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
  } else {
    updateFragmentComponent(workInProgress)
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

  requestIdleCallback(workLoop)
}

function commitRoot() {
  commitWorker(wipRoot.child)
  currentRoot = wipRoot
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
  if (workInProgress.flag & Placement && workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode)
  } else if (workInProgress.flag & Update && workInProgress.stateNode) {
    // 更新属性
    updateNode(workInProgress.stateNode, workInProgress.alternate.props, workInProgress.props)
  }

  commitWorker(workInProgress.child)
  commitWorker(workInProgress.sibling)
}

requestIdleCallback(workLoop)

// useState
export function useState(init) {
  // 区分是初次渲染和更新
  const oldHook = wipFiber.alternate && wipFiber.alternate.hooks[wipFiber.hooksIndex]
  // 存储状态，改变状态的函数
  const hook = oldHook
    ? {
        state: oldHook.state,
        queue: oldHook.queue,
      }
    : {
        state: init,
        queue: [],
      }

  const setState = (action) => {
    hook.queue.push(action)
    wipRoot = {
      stateNode: currentRoot.stateNode,
      props: currentRoot.props,
      alternate: currentRoot,
    }

    nextUnitOfWork = wipRoot
  }

  hook.queue.forEach((action) => {
    hook.state = action
  })

  wipFiber.hooks.push(hook)
  wipFiber.hooksIndex++

  return [hook.state, setState]
}

export default { render }
