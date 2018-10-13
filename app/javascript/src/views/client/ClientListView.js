import React from 'react'
import { ClientList } from '../../client'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

function ClientListView() {
  return (
    <SidebarHeader
      sidebar={<Sidebar />}
    >
      <ClientList />
    </SidebarHeader>
  )
}

export default ClientListView
