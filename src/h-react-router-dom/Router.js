import React from 'react'
import { RouterContext } from './RouterContext'

export default class Router extends React.Component {
  static computeRootMatch (pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" }
  }
  constructor(props) {
    super(props)
 
    this.state = {
      location: props.history.location
    }

    // 监听
    this.unListen = props.history.listen(({location}) => {
      this.setState({ location })
    })
  }

  componentWillUnmount () {
    // 取消监听
    this.unListen()
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname)
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}
