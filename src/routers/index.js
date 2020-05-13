import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import loginRouters from './loginRouters'
import homeRouters from './homeRouters'
import uploadRouters from './uploadRouters'

const routersList = [ ...loginRouters, ...homeRouters, ...uploadRouters ]


console.log(routersList, 'routersList')

function BasicRoute () {
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
            </Switch>
        </Router>
    )
}

export default BasicRoute