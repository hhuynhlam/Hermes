import React from 'react'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Route, Switch } from 'react-router-dom'
import history from '../config/history'

import ContactListView from './contact_list/ContactListView'
import EditProfileView from './profile/EditProfileView'
import NotFoundView from './not_found/NotFoundView'
import PhotoView from './photo/PhotoView'
import PhotosView from './photo/PhotosView'

function Views() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={ContactListView} />
        <Route exact path="/photos" component={PhotosView} />
        <Route exact path="/photos/:photoId" component={PhotoView} />
        <Route exact path="/users/:userId" component={EditProfileView} />
        <Route component={NotFoundView} />
      </Switch>
    </ConnectedRouter>
  )
}

export default Views
