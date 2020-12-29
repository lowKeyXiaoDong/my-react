export default function createStore(reducer, enhandler) {
  if (enhandler) {
    return enhandler(createStore)(reducer)
  }

  let currentState // 仓库的数据
  let currentListeners = [] // 监听函数

  // 获取 get 
  function getState() {
    return currentState
  }

  // 修改 set
  function dispatch(action) {
    currentState = reducer(currentState, action)

    currentListeners.forEach(listener => listener())
  }

  // 订阅监听
  function subscribe(listener) {
    currentListeners.push(listener)

    return () => {
      const index = currentListeners.findIndex(listener)
      currentListeners.splice(index, 1)
    }
  }

  dispatch({ type: 'REDUX/JHKGJYVUYVUVBJKNKJN' })

  return {
    getState,
    dispatch,
    subscribe,
  }
}
