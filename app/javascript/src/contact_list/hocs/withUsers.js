import fetch from 'fetch-hoc'
import { map } from 'lodash/fp'
import { compose, withProps } from 'recompose'

const withUser = compose(
  fetch('/api/v1/users'),
  withProps(({ data: { data } = {} }) => ({
    data: map(datum => ({
      id: datum.id,
      ...datum.attributes,
    }))(data),
  })),
)

export default withUser
