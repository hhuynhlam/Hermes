import { map } from 'lodash/fp'
import { connect } from 'react-redux'
import { createResource } from '../../data'
import { getCurrentUser } from '../../profile'
import { openSnackbar } from '../../snackbar'
import PhotosAdd from '../components/PhotosAdd'

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: files => dispatch(
      (_dispatch, getState) => {
        const user = getCurrentUser(getState())

        const promises = map(file => _dispatch(createResource({
          type: 'photos',
          body: {
            data: {
              attributes: {
                caption: file.caption,
                image: file.data,
                owner: user.id,
              },
            },
          },
        })))(files)

        return Promise.all(promises)
          .then(() => dispatch(openSnackbar({
            message: 'Photos Uploaded!',
            variant: 'success',
          })))
          .catch(error => dispatch(openSnackbar({
            message: error,
            variant: 'error',
          })))
      }
    ),
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(PhotosAdd)
