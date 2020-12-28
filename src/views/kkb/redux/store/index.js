import { createStore } from '../hredux'

export const cunterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case 'ADD':
      return state + payload

    default:
      return state
  }
}
const store = createStore(cunterReducer)

export default store
