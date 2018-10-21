import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import Immutable from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import history from './history'
import reducer from './reducer'

const devToolsExtension = window.devToolsExtension &&
    window.devToolsExtension({ serialize: { immutable: Immutable } })

const enhancers = (devToolsExtension) ?
  compose(applyMiddleware(routerMiddleware(history), thunk), devToolsExtension) :
  compose(applyMiddleware(routerMiddleware(history), thunk))

const store = createStore(
  connectRouter(history)(reducer),
  Immutable.fromJS(window.__STORE__),
  enhancers,
)

export default store
