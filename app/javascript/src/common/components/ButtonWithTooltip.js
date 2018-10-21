import React from 'react'
import PropTypes from 'prop-types'
import { omit, pick } from 'lodash/fp'
import IconButton from '@material-ui/core/IconButton'
import MdButton from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const TOOLTIP_PROPS = [
  'children',
  'disableFocusListener',
  'disableHoverListener',
  'disableTouchListener',
  'enterDelay',
  'placement',
  'title',
]
const TOOLTIP_DEFAULTS = {
  enterDelay: 0,
}

/**
 * BaseButton
 */
function BaseButton({ icon, ...props }) {
  return icon ? <IconButton {...props} /> : <MdButton {...props} />
}
BaseButton.defaultProps = {
  icon: false,
}
BaseButton.propTypes = {
  icon: PropTypes.bool,
}

/**
 * Button
 */

function ButtonWithTooltip(props) {
  const buttonProps = omit(TOOLTIP_PROPS)(props)
  const tooltipProps = pick(TOOLTIP_PROPS)(props)

  return (
    <BaseButton {...buttonProps}>
      <Tooltip {...TOOLTIP_DEFAULTS} {...tooltipProps} />
    </BaseButton>
  )
}

export default ButtonWithTooltip
