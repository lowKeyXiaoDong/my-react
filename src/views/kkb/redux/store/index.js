import { applyMiddleware, createStore, combineReducers } from 'redux'
// import { createStore, applyMiddleware } from '../hredux'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'

export const cunterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case 'ADD':
      return state + payload

    default:
      return state
  }
}
const store = createStore(
  combineReducers({
    count: cunterReducer,
  }),
  applyMiddleware(thunk, logger)
)

function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}

function logger({ dispatch, getState }) {
  return (next) => (action) => {
    console.log('----------')
    console.log('action', action.type)
    console.log('----------')
    console.log('prev state', getState())
    console.log('----------')
    const retuenValue = next(action)
    console.log('next state', getState())
    return retuenValue
  }
}

export default store
