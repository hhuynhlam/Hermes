import { connectRouter, routerMiddleware } from 'connected-react-router'
import Immutable, { fromJS } from 'immutable'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import history from './history'
import reducer from './reducer'
import sagas from './sagas'

const devToolsExtension = window.devToolsExtension &&
    window.devToolsExtension({ serialize: { immutable: Immutable } })
const sagaMiddleware = createSagaMiddleware()

const enhancers = (devToolsExtension) ?
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware), devToolsExtension) :
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))

const store = createStore(
  connectRouter(history)(reducer),
  fromJS({}),
  enhancers,
)

sagaMiddleware.run(sagas)

export default store
