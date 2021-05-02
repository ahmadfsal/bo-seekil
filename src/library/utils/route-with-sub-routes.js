import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

const RouteWithSubRoutes = ({ routes, match, location }) => (
    <Switch>
        {routes.map((route) => {
            const routeUrl =
                match.url === '/'
                    ? `${route.path}`
                    : `${match.url}${route.path}`

            return <Route {...route} key={location.pathname} path={routeUrl} />
        })}
    </Switch>
)

export default withRouter(RouteWithSubRoutes)
