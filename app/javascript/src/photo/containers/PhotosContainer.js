import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'
import { indexResource } from '../../data'
import Photos from '../components/Photos'
import getPhotos from '../selectors/getPhotos'

const enhance = compose(
  connect(
    state => ({
      photos: getPhotos(state),
    }),
    dispatch => ({
      fetchPhotos: page => dispatch(indexResource({
        type: 'photos',
        query: {
          include: 'owner,tags',
          page: { number: page },
        },
      })),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchPhotos()
    },
  }),
)

export default enhance(Photos)
