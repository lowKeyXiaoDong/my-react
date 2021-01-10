import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ isLogin = false, component: Component, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={(props) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                form: props.location.pathname,
              },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
