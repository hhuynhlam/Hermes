import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/application'

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#root')
  )
}

document.addEventListener('DOMContentLoaded', () => render(App))

if (module.hot) {
  module.hot.accept('../src/application.js', () =>
    // eslint-disable-next-line global-require
    render(require('../src/application.js').default))
}
