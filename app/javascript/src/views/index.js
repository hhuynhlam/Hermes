import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import history from '../config/history'

import ClientListView from './client/ClientListView'
import NotFoundView from './not_found/NotFoundView'

function Views() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={ClientListView} />
        <Route component={NotFoundView} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Views
