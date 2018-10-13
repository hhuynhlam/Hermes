import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import AnchorLink from '../components/AnchorLink'
import LogoIcon from '../icons/LogoIcon'

const StyledLogoIcon = styled(LogoIcon)`
  height: 22px !important;
  width: auto !important;
`
const Title = styled(Typography)`
  margin-left: 22px !important;
`

function LogoLink({ showTitle }) {
  return (
    <AnchorLink to="/">
      <StyledLogoIcon />
      { showTitle && <Title color="primary" variant="title">Momentum</Title> }
    </AnchorLink>
  )
}
LogoLink.defaultProps = {
  showTitle: true,
}
LogoLink.propTypes = {
  showTitle: PropTypes.bool,
}

export default LogoLink
