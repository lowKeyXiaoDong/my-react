import React from 'react'
import { matchPath } from 'react-router-dom'
import { RouterContext } from './RouterContext'

export default class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { path, children, component, render, computedMatch } = this.props
          // const match = window.location.pathname === path
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(context.location.pathname, this.props)
            : context.match

          const props = {
            ...context,
            match,
          }

          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}
