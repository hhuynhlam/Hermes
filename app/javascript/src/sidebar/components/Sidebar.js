import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FaAddressBook, FaSignOutAlt } from 'react-icons/fa'
import { MdCameraAlt, MdPerson } from 'react-icons/md'
import styled from 'styled-components'
import AnchorLink from '../../common/components/AnchorLink'
import getCurrentUser from '../../common/selectors/getCurrentUser'

const StyledList = styled(List)`
  padding-bottom: 0 !important;
  padding-top: 0 !important;
`
const StyledListItemIcon = styled(ListItemIcon)`
  height: 2em;
  width: 2em;
`
const StyledListItemText = styled(ListItemText)`
  padding-left: 0 !important;
  padding-right: 16px !important;
`

function Sidebar({ currentUser }) {
  return (
    <StyledList component="nav">
      <AnchorLink to={`/users/${currentUser.id}`}>
        <ListItem button>
          <StyledListItemIcon><MdPerson /></StyledListItemIcon>
          <StyledListItemText primary="Edit Profile" />
        </ListItem>
      </AnchorLink>

      <Divider />

      <AnchorLink to="/">
        <ListItem button>
          <StyledListItemIcon><FaAddressBook /></StyledListItemIcon>
          <StyledListItemText primary="Contact List" />
        </ListItem>
      </AnchorLink>

      <Divider />

      <AnchorLink to="/photos">
        <ListItem button>
          <StyledListItemIcon><MdCameraAlt /></StyledListItemIcon>
          <StyledListItemText primary="Photos" />
        </ListItem>
      </AnchorLink>

      <Divider />
      <AnchorLink href="/users/sign_out">
        <ListItem button>
          <StyledListItemIcon><FaSignOutAlt /></StyledListItemIcon>
          <StyledListItemText primary="Logout" />
        </ListItem>
      </AnchorLink>
    </StyledList>
  )
}
Sidebar.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
}

export default connect(state => ({
  currentUser: getCurrentUser(state),
}))(Sidebar)
