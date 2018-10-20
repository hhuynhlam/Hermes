import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash/fp'
import { withTheme } from '@material-ui/core/styles'
import styled from 'styled-components'
import { Snackbar } from '../../snackbar'

const Layout = styled.div`
  align-items: center;
  background: ${({ theme }) => get('palette.background.default')(theme)};
  display: flex;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
`

function FullPageCenter({
  children,
  className,
  theme,
}) {
  return (
    <React.Fragment>
      <Layout className={className} theme={theme}>{children}</Layout>
      <Snackbar />
    </React.Fragment>
  )
}
FullPageCenter.defaultProps = {
  children: null,
  className: '',
}
FullPageCenter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.shape({}).isRequired,
}

export default withTheme()(FullPageCenter)
