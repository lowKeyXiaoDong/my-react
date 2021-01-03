import React, { useCallback, useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react'

// step1: 创建context
const Context = React.createContext()

// step1: 使用Provider传递value
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

// step1: 子组件消费
// Comsumer comtextType useContext

// hoc connect
export const connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps
) => (WrappedComponent) => (props) => {
  const store = useContext(Context)
  const { getState, dispatch } = store

  // 默认的state
  let stateProps = mapStateToProps(getState())
  // 默认dispatch
  let dispatchProps = { dispatch }

  // 判断dispatch是函数还是对象
  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  }

  // 函数组件中的forceUpdate
  // const [ig, forceUpdate] = useReducer((x) => x + 1, 0)
  const forceUpdate = useForceUpdate()

  // useEffect 组件渲染 执行callback（订阅，取消订阅）会有一段暂停执行
  // useLayoutEffect 组件渲染__执行callback（订阅，取消订阅） 不会有
  useLayoutEffect(() => {
    // 订阅
    const unsubscribe = store.subscribe(() => {
      forceUpdate()
    })

    // 取消订阅
    return () => unsubscribe()
  }, [store])

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps}></WrappedComponent>
}

// 封装函数组件中的forceUpdate
function useForceUpdate() {
  const [state, setState] = useState(0)
  const update = useCallback(() => {
    setState((prev) => prev + 1)
  }, [])
  return update
}

export function useStore() {
  const store = useContext(Context)
  return store
}

// hook 中获取state
export function useSelector(selector) {
  const store = useStore()

  const selectorState = selector(store.getState())

  // 函数组件重的forceUpdate
  // const [ig, forceUpdate] = useReducer((x) => x + 1, 0)
  const forceUpdate = useForceUpdate()

  // useEffect 组件渲染 执行callback（订阅，取消订阅）会有一段暂停执行
  // useLayoutEffect 组件渲染__执行callback（订阅，取消订阅） 不会有
  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate()
    })

    return () => unsubscribe()
  }, [store])
  return selectorState
}

// hook获取dispatch
export function useDispatch() {
  const store = useStore()
  return store.dispatch
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

// 扩展connect中dispatch
export function bindActionCreators(creators, dispatch) {
  let obj = {}

  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }

  return obj
}