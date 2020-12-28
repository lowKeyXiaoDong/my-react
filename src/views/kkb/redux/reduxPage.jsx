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
  render() {
    return (
      <div>
        reduxPage
        <div>{store.getState()}</div>
        <button onClick={this.add}>add</button>
      </div>
    )
  }
}

export default reduxPage
