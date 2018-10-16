import React from 'react'
import axios from 'axios'
import getCurrentUser from '../../common/services/getCurrentUser'
import EditProfile from '../components/EditProfile'

class EditProfileContainer extends React.Component {
  state = {
    initialValues: {
      ...getCurrentUser(),
    },
  }

  handleSubmit = async (values) => {
    const { id, ...attributes } = values

    return axios.put(`/api/v1/users/${id}`, {
      data: {
        attributes,
      },
    })
      .then(() => this.updateValues(values))
  }

  updateValues = (values) => {
    const {
      id,
      ...attributes
    } = values

    this.setState({
      initialValues: values,
    })

    window.__STORE__.user.data = {
      id,
      attributes,
    }
  }

  render() {
    const {
      initialValues,
    } = this.state

    return (
      <EditProfile
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

export default EditProfileContainer
