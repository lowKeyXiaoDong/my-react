import React from 'react'
import { matchPath } from 'react-router-dom'
import { RouterContext } from './RouterContext'

export default class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          let match
          let element

          React.Children.forEach(this.props.children, (child) => {
            if (match == null) {
              element = child
              match = child.props.path
                ? matchPath(context.location.pathname, child.props)
                : context.match
            }
          })

          return match ? React.cloneElement(element, { computedMatch: match }) : null
        }}
      </RouterContext.Consumer>
    )
  }
}
