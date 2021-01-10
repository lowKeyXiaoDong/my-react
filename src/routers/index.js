import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import loginRouters from './loginRouters'
import homeRouters from './homeRouters'
import uploadRouters from './uploadRouters'
import taskRouters from './taskRouters'
import amapRouters from './amapRouters'
import PrivateRoute from './privateRoute'
import UserPage from '../views/kkb/UserPage'

const routersList = [
  ...loginRouters,
  ...homeRouters,
  ...uploadRouters,
  ...taskRouters,
  ...amapRouters,
]

function BasicRoute() {
  return (
    <Router>
      <Switch>
        {routersList.length > 0 &&
          routersList.map((item) => {
            return (
              <Route
                path={item.path}
                exact={item.exact}
                key={item.path}
                component={item.component}
              ></Route>
            )
          })}
        <Route path='/kkb' render={kkb}></Route>
        <PrivateRoute path='/userPage' component={UserPage} />
        {/*路由重定向*/}
        {/* <Redirect to='/home'></Redirect> */}
      </Switch>
    </Router>
  )
}

function kkb() {
  return (
    <div>
      <Link to='/userPage'>用户中心</Link>
      <Link to='/login'>登录</Link>
      <Link to='/home'>首页</Link>
    </div>
  )
}
export default BasicRoute
