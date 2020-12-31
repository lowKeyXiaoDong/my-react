import React, { Component } from 'react'
import store from './store'

class reduxPage extends Component {
  componentDidMount() {
    console.log(store)
    store.subscribe(() => {
      this.forceUpdate()
    })
  }

  add = () => {
    store.dispatch({
      type: 'ADD',
      payload: 10,
    })
  }

  asyadd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({
          type: 'ADD',
          payload: 10,
        })
      }, 1000)
    })
  }

  render() {
    return (
      <div>
        reduxPage
        <div>{store.getState().count}</div>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyadd}>asyadd</button>
      </div>
    )
  }
}

export default reduxPage
