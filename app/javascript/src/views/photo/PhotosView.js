import React from 'react'
import { Photos } from '../../photo'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

function PhotosView() {
  return (
    <SidebarHeader
      sidebar={<Sidebar />}
    >
      <Photos />
    </SidebarHeader>
  )
}

export default PhotosView
