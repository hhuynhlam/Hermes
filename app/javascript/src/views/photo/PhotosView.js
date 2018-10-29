import React from 'react'
import Button from '@material-ui/core/Button'
import AnchorLink from '../../common/components/AnchorLink'
import { Photos } from '../../photo'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

const Header = () => (
  <AnchorLink to="/photos/add">
    <Button
      aria-label="Add Photos"
      color="primary"
      variant="extendedFab"
    >
      Add Photos
    </Button>
  </AnchorLink>
)

function PhotosView() {
  return (
    <SidebarHeader
      header={<Header />}
      sidebar={<Sidebar />}
    >
      <Photos />
    </SidebarHeader>
  )
}

export default PhotosView
