import { connect } from 'react-redux'
import immutableToJS from '../../common/services/immutableToJS'
import { updateResource } from '../../data'
import { getCurrentUser } from '../../profile'
import { openSnackbar } from '../../snackbar'
import EditProfile from '../components/EditProfile'

function mapStateToProps(state) {
  return {
    initialValues: getCurrentUser(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: async (value) => {
      const { id, ...attributes } = immutableToJS(value)

      const body = {
        data: {
          attributes,
        },
      }

      try {
        await dispatch(updateResource({
          type: 'users',
          id,
          body,
        }))

        dispatch(openSnackbar({
          message: 'Profile Updated!',
          variant: 'success',
        }))
      } catch (error) {
        dispatch(openSnackbar({
          message: error,
          variant: 'error',
        }))
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
