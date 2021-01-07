import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import loginRouters from './loginRouters'
import homeRouters from './homeRouters'
import uploadRouters from './uploadRouters'
import taskRouters from './taskRouters'
import amapRouters from './amapRouters'
import kkbRouter from './kkb'

const routersList = [
	...loginRouters,
	...homeRouters,
	...uploadRouters,
	...taskRouters,
	...amapRouters,
	...kkbRouter
]


function BasicRoute() {
	return (
		<Router>
			<Switch>
				{
					routersList.length > 0 && routersList.map(item => {
						return (
							<Route
								path={item.path}
								exact={item.exact}
								key={item.path}
								component={item.component}
							>
							</Route>
						)
					})
				}
				{/*路由重定向*/}
				<Redirect to='/app'></Redirect>
			</Switch>
		</Router>
	)
}

export default BasicRoute