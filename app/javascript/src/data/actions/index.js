import axios from 'axios'
import { invoke } from 'lodash/fp'

export const UPDATE_RESOURCE_REQUEST = 'RESOURCE.UPDATE_REQUEST'
export const UPDATE_RESOURCE_SUCCESS = 'RESOURCE.UPDATE_SUCCESS'
export const UPDATE_RESOURCE_FAILED = 'RESOURCE.UPDATE_FAILED'

export function updateResource({ type, id, body }) {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESOURCE_REQUEST })

    try {
      const { data } = await axios.put(`/api/v1/${type}/${id}`, body)

      dispatch({
        type: UPDATE_RESOURCE_SUCCESS,
        payload: data,
      })

      return Promise.resolve(data)
    } catch (error) {
      const errorMessage = invoke('toString')(error) || error

      dispatch({
        type: UPDATE_RESOURCE_FAILED,
        payload: errorMessage,
      })

      return Promise.reject(errorMessage)
    }
  }
}
