import React from 'react'
import { Photo } from '../../photo'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

function PhotoView() {
  return (
    <SidebarHeader
      sidebar={<Sidebar />}
    >
      <Photo />
    </SidebarHeader>
  )
}

export default PhotoView
