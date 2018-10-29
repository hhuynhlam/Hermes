import { stringify } from 'qs'
import request from '../services/request'

export const INDEX_RESOURCE_REQUEST = 'RESOURCE.INDEX_REQUEST'
export const INDEX_RESOURCE_SUCCESS = 'RESOURCE.INDEX_SUCCESS'
export const INDEX_RESOURCE_FAILED = 'RESOURCE.INDEX_FAILED'

export function indexResource({ query, type }) {
  const queryString = stringify(query, { encode: false })

  return request({
    method: 'get',
    url: `/api/v1/${type}?${queryString}`,
    types: [
      INDEX_RESOURCE_REQUEST,
      INDEX_RESOURCE_SUCCESS,
      INDEX_RESOURCE_FAILED,
    ],
  })
}

export const CREATE_RESOURCE_REQUEST = 'RESOURCE.CREATE_REQUEST'
export const CREATE_RESOURCE_SUCCESS = 'RESOURCE.CREATE_SUCCESS'
export const CREATE_RESOURCE_FAILED = 'RESOURCE.CREATE_FAILED'

export function createResource({ type, body }) {
  return request({
    method: 'post',
    url: `/api/v1/${type}`,
    body,
    types: [
      CREATE_RESOURCE_REQUEST,
      CREATE_RESOURCE_SUCCESS,
      CREATE_RESOURCE_FAILED,
    ],
  })
}
export const UPDATE_RESOURCE_REQUEST = 'RESOURCE.UPDATE_REQUEST'
export const UPDATE_RESOURCE_SUCCESS = 'RESOURCE.UPDATE_SUCCESS'
export const UPDATE_RESOURCE_FAILED = 'RESOURCE.UPDATE_FAILED'

export function updateResource({ type, id, body }) {
  return request({
    method: 'put',
    url: `/api/v1/${type}/${id}`,
    body,
    types: [
      UPDATE_RESOURCE_REQUEST,
      UPDATE_RESOURCE_SUCCESS,
      UPDATE_RESOURCE_FAILED,
    ],
  })
}
