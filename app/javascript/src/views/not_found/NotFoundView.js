import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/fp'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoLink from '../../common/components/LogoLink'
import FullPageCenter from '../layouts/FullPageCenter'

/**
 * Header
 */

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) => get('palette.common.white')(theme)} !important;
  box-shadow: none !important;
`
const StyledToolbar = styled(Toolbar)`
  ${theme => ({ ...get('mixins.toolbar')(theme) })}
`

function Header({ theme }) {
  return (
    <StyledAppBar theme={theme} variant="absolute">
      <StyledToolbar theme={theme}>
        <LogoLink />
      </StyledToolbar>
    </StyledAppBar>
  )
}
Header.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}

/**
 * NotFoundView
 */

const StyledCard = styled(Card)`
  height: 400px;
  width: 600px;
`
const StyledCardContent = styled(CardContent)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  justify-content: space-evenly;
  width: calc(100% - 48px);
`

function NotFoundView({ theme }) {
  return (
    <FullPageCenter>
      <Header theme={theme} />

      <StyledCard>
        <StyledCardContent>
          <div>
            <Typography
              align="center"
              color="primary"
              gutterBottom
              variant="display4"
            >
              404
            </Typography>
            <Typography
              align="center"
              color="primary"
              gutterBottom
              variant="display1"
            >
              Page Not Found
            </Typography>
          </div>

          <Button
            color="primary"
            component={Link}
            size="large"
            to="/"
            variant="contained"
          >
            Go Home
          </Button>
        </StyledCardContent>
      </StyledCard>
    </FullPageCenter>
  )
}
NotFoundView.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}

export default withTheme()(NotFoundView)
