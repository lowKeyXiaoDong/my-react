export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer)
    // 初始化dispatch
    let dispatch = store.dispatch

    // 加强disptach
    const middleAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args) // 为了在多个中间件中this为中间件自己
    }
    const middlerwaresChain = middlewares.map(middleware => middleware(middleAPI))

    // 得到加强的dispatch
    dispatch = compose(...middlerwaresChain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}