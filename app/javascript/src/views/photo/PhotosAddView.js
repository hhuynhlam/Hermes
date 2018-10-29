import React from 'react'
import { PhotosAdd } from '../../photo'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

function PhotosView() {
  return (
    <SidebarHeader
      sidebar={<Sidebar />}
    >
      <PhotosAdd />
    </SidebarHeader>
  )
}

export default PhotosView
