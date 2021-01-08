import React from 'react'
import { RouterContext } from './RouterContext'

export default class Redirect extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { history } = context
          const { to, push = false } = this.props

          return (
            <LifeCycle
              onMount={() => {
                push ? history.push(to) : history.replace(to)
              }}
            ></LifeCycle>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}

class LifeCycle extends React.Component {
  componentDidMount () {
    if (this.props.onMount) {
      this.props.onMount.call(this, this)
    }
  }
  render() {
    return null
  }
}
