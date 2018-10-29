import { flow, map } from 'lodash/fp'
import { getAllEntityAttributes, getRelatedEntityAttributes } from '../../data'

function getPhotos(state) {
  return flow([
    getAllEntityAttributes('photos'),
    map(photo => ({
      user: getRelatedEntityAttributes('photos', photo.id, 'owner')(state),
      ...photo,
    })),
  ])(state)
}

export default getPhotos
