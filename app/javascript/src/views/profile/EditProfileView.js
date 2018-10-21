import React from 'react'
import { EditProfile } from '../../profile'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

function EditProfileView() {
  return (
    <SidebarHeader
      sidebar={<Sidebar />}
    >
      <EditProfile />
    </SidebarHeader>
  )
}

export default EditProfileView
