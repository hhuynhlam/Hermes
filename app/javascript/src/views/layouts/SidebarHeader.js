import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/fp'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import { withTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import styled from 'styled-components'
import LogoLink from '../../common/components/LogoLink'
import { Snackbar } from '../../snackbar'

const SIDEBAR_WIDTH = 215

/**
 * Header
 */

const StyledAppBar = styled(AppBar)`
  background-color: ${({ theme }) =>
    get('palette.background.default')(theme)} !important;
  box-shadow: none !important;
  margin-left: ${SIDEBAR_WIDTH}px;
  width: calc(100% - ${SIDEBAR_WIDTH}px) !important;
`
const StyledToolbar = styled(Toolbar)`
  ${theme => ({ ...get('mixins.toolbar')(theme) })}
`

function Header({
  children,
  theme,
}) {
  return children && (
    <StyledAppBar theme={theme} variant="absolute">
      <StyledToolbar theme={theme}>
        {children}
      </StyledToolbar>
    </StyledAppBar>
  )
}

/**
 * Sidebar
 */

const StyledDrawer = Component => styled(Component)`
  width: ${SIDEBAR_WIDTH}px;
`

const Sidebar = StyledDrawer(({
  children,
  className,
  theme,
}) => (
  children && (
    <Drawer classes={{ paper: className }} variant="permanent">
      <StyledToolbar theme={theme}>
        <LogoLink />
      </StyledToolbar>

      <Divider />

      {children}
    </Drawer>
  )
))

/**
 * SidebarHeader
 */

const Content = styled.div`
  margin-bottom: 24px;
  margin-left: calc(24px + ${SIDEBAR_WIDTH}px);
  margin-right: 24px;
  margin-top: ${({ header }) => !header && '-40px'};
`
const Layout = styled.div``

function SidebarHeader({
  children,
  className,
  header,
  sidebar,
  theme,
}) {
  return (
    <React.Fragment>
      <Layout className={className}>
        <Header theme={theme}>{header}</Header>
        <Sidebar theme={theme}>{sidebar}</Sidebar>

        <StyledToolbar theme={theme} />
        <Content header={header}>{children}</Content>
      </Layout>

      <Snackbar />
    </React.Fragment>
  )
}
SidebarHeader.defaultProps = {
  children: null,
  className: '',
  header: null,
  sidebar: null,
}
SidebarHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  header: PropTypes.node,
  sidebar: PropTypes.node,
  theme: PropTypes.shape({}).isRequired,
}

export default withTheme()(SidebarHeader)
