import { connect } from 'react-redux'
import { getCurrentUser } from '../../profile'
import { updateProfile } from '../actions'
import EditProfile from '../components/EditProfile'

function mapStateToProps(state) {
  return {
    initialValues: getCurrentUser(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: value => dispatch(updateProfile(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
