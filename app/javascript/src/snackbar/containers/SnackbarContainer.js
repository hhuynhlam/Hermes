import { connect } from 'react-redux'
import { closeSnackbar } from '../actions'
import Snackbar from '../components/Snackbar'
import getSnackbar from '../selectors/getSnackbar'

function mapStateToProps(state) {
  return { ...getSnackbar(state) }
}
function mapDispatchToProps(dispatch) {
  return {
    onClose: () => dispatch(closeSnackbar()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbar)
