import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledAnchor = styled.a`
  align-items: center;
  display: flex;
  text-decoration: none;
`
const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
`

function AnchorLink(props) {
  const { to } = props

  return to ?
    <StyledLink {...props} /> :
    <StyledAnchor {...props} />
}

export default AnchorLink
