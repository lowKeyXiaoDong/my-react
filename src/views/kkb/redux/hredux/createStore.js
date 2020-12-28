export default function createStore(reducer) {
  let currentState = 0
  let currentListeners = []
  function getState() {
    return currentState
  }
  function dispatch(action) {
    currentState = reducer(currentState, action)

    currentListeners.forEach(listener => listener())
  }
  function subscribe(listener) {
    currentListeners.push(listener)
  }
  return {
    getState,
    dispatch,
    subscribe,
  }
}
