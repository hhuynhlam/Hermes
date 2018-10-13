import React from 'react'
import { ContactList } from '../../contact_list'
import { Sidebar } from '../../sidebar'
import SidebarHeader from '../layouts/SidebarHeader'

function ContactListView() {
  return (
    <SidebarHeader
      sidebar={<Sidebar />}
    >
      <ContactList />
    </SidebarHeader>
  )
}

export default ContactListView
