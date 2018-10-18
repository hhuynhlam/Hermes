import React from 'react'
import { reduxForm } from 'redux-form/immutable'

function withForm(options) {
  return WrappedComponent => (
    reduxForm(options)(
      ({ handleSubmit, ...props }) => (
        <form onSubmit={handleSubmit}>
          <WrappedComponent {...props} />
        </form>
      )
    )
  )
}

export default withForm
