import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from '../h-react-router-dom'

import HomePage from '../views/kkb/homepage'
import Login from '../views/kkb/login'
import User from '../views/kkb/user'
import errPage from '../views/kkb/404page'

function App(props) {
  return (
    <div className='app'>
      <Router>
        <Link to='/app'>首页</Link>
        <Link to='/user'>用户中心</Link>
        <Link to='/login'>登录</Link>
        <Link to='/predoct/123'>商品</Link>
        <Switch>
          {/* children > component > render */}
          <Route
            path='/app'
            exact
            // children={() => children()}
            // render={() => renderDom()}
            component={HomePage}
          />
          <Route path='/login' component={Login} />
          <Route path='/user' component={User} />
          <Route path='/predoct/:id' component={Predoct} />
          <Route component={errPage} />
        </Switch>
      </Router>
    </div>
  )
}
function Predoct(params) {
  return <div>Predoct: id</div>
}
function renderDom(params) {
  return <div>render</div>
}
function children(params) {
  return <div>children</div>
}
export default App
