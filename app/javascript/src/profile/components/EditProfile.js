import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { FormTextField, withForm } from '../../common/modules/form'

function EditProfile(props) {
  const {
    history,
    pristine,
  } = props

  return (
    <Card>
      <CardHeader
        subheader=""
        title="Edit Profile"
      />

      <CardContent>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <FormTextField label="First Name" name="firstName" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <FormTextField label="Last Name" name="lastName" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <FormTextField label="Email" name="email" />
          </div>
          <div className="col-xs-12 col-sm-6">
            <FormTextField label="Phone" name="phone" />
          </div>
          <div className="col-xs-12">
            <FormTextField label="Address" name="address" multiline />
          </div>
        </div>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => history.push('/')}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={pristine}
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </CardActions>
    </Card>
  )
}
EditProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  pristine: PropTypes.bool.isRequired,
}

export default compose(
  withRouter,
  withForm({
    form: 'EditProfile',
    enableReinitialize: true,
  }),
)(EditProfile)
