import axios from 'axios'
import { invoke } from 'lodash/fp'

function request(options) {
  const {
    method,
    url,
    body,
    types,
  } = options

  return async (dispatch) => {
    dispatch({ type: types[0] })

    try {
      const { data } = await axios[method](url, body)

      dispatch({ type: types[1], payload: data })

      return Promise.resolve(data)
    } catch (error) {
      const errorMessage = invoke('toString')(error) || error

      dispatch({ type: types[2], payload: errorMessage })

      return Promise.reject(errorMessage)
    }
  }
}

export default request
