import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash/fp'
import styled from 'styled-components'
import Snackbar from '@material-ui/core/Snackbar'
import FormContext from '../contexts/FormContext'

const ErrorAlert = styled(Snackbar)`
  > div {
    background-color: #FF6060;
  }
`
const SuccessAlert = styled(Snackbar)`
  > div {
    background-color: #5797A0;
  }
`

function withForm(WrappedComponent, {
  validations = {},
}) {
  return class Form extends React.Component {
    static defaultProps = {
      initialValues: {},
      onSubmit: noop,
    }
    static propTypes = {
      initialValues: PropTypes.shape({}),
      onSubmit: PropTypes.func,
    }

    state = {
      alert: null,
      errors: {},
      pristine: true,
      submitError: null,
      values: this.props.initialValues,
    }

    /**
     * Helpers
     */
    getContext = () => ({
      fieldBlur: this.fieldBlur,
      fieldChange: this.fieldChange,
      ...this.state,
    })

    /**
     * Field Handlers
     */
    // FIXME: prevent creating new function every render
    fieldBlur = (field, onBlur = noop) => (event) => {
      const { errors } = this.state
      const { value } = event.target
      const validate = validations[field]

      if (validate) {
        this.setState({
          errors: {
            ...errors,
            [field]: validate(value),
          },
        })
      }

      onBlur(event)
    }
    // FIXME: prevent creating new function every render
    fieldChange = (field, onChange = noop) => (event) => {
      const { initialValues } = this.props
      const { values } = this.state
      const { value } = event.target

      this.setState({
        pristine: value === initialValues[field],
        values: {
          ...values,
          [field]: value,
        },
      })

      onChange(event)
    }

    /**
     * Form Handlers
     */
    handleSubmit = async (event) => {
      event.preventDefault()

      const { onSubmit } = this.props
      const { values } = this.state

      try {
        await onSubmit(values)

        this.setState({
          alert: 'success',
          pristine: true,
        })
      } catch (error) {
        this.setState({
          alert: 'error',
          submitError: error.toString(),
        })
      }
    }

    /**
     * Alert Handlers
     */
    handleAlertClose = () => this.setState({ alert: null })

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <ErrorAlert
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
            message={this.state.submitError}
            onClose={this.handleAlertClose}
            open={this.state.alert === 'error'}
          />
          <SuccessAlert
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
            message="Saved Successfully!"
            open={this.state.alert === 'success'}
            onClose={this.handleAlertClose}
          />

          <FormContext.Provider value={{ form: this.getContext() }}>
            <WrappedComponent {...this.state} {...this.props} />
          </FormContext.Provider>
        </form>
      )
    }
  }
}

export default withForm
