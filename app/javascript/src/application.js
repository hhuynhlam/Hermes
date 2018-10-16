import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'

import 'flexboxgrid/dist/flexboxgrid.min.css'

import store from './config/store'
import theme from './config/theme'
import Views from './views'

import './styles/application.css'

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Views />
      </MuiThemeProvider>
    </Provider>
  )
}

export default hot(module)(App)
