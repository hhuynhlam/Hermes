import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash/fp'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormContext from '../contexts/FormContext'


function FormTextField(props) {
  const {
    fullWidth,
    label,
    name,
    onBlur,
    onChange,
    ...restOfProps
  } = props

  return (
    <FormContext.Consumer>
      {
        ({ form }) => (
          <FormControl error={!!form.errors[name]} fullWidth={fullWidth}>
            <InputLabel htmlFor={name}>{label}</InputLabel>

            <Input
              {...restOfProps}
              id={name}
              onBlur={form.fieldBlur(name, onBlur)}
              onChange={form.fieldChange(name, onChange)}
              value={form.values[name]}
            />

            <FormHelperText id={`${name}HelperText`}>
              {form.errors[name]}
            </FormHelperText>
          </FormControl>
        )
      }
    </FormContext.Consumer>

  )
}
FormTextField.defaultProps = {
  fullWidth: true,
  label: '',
  onBlur: noop,
  onChange: noop,
}
FormTextField.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
}

export default FormTextField
