import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'
import history from '../config/history'

import ContactListView from './contact_list/ContactListView'
import NotFoundView from './not_found/NotFoundView'

function Views() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={ContactListView} />
        <Route component={NotFoundView} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Views
