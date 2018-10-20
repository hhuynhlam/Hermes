import React from 'react'
import MUISnackbar from '@material-ui/core/Snackbar'
import styled from 'styled-components'
import theme from '../../config/theme'

const StyledSnackbar = styled(MUISnackbar)`
  > div:first-child {
    background-color: ${({ variant }) => theme.palette[variant].main} !important;
  }
`

function Snackbar(props) {
  return (
    <StyledSnackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      autoHideDuration={6000}
      {...props}
    />
  )
}

export default Snackbar
