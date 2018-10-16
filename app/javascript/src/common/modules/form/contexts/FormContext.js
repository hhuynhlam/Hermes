import React from 'react'
import { noop } from 'lodash/fp'

const FormContext = React.createContext({
  form: {
    errors: {},
    fieldBlur: noop,
    fieldChange: noop,
    pristine: null,
    values: {},
  },
})

export default FormContext
