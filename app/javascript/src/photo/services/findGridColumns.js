import theme from '../../config/theme'

function findGridColumns() {
  if (window.innerWidth < theme.breakpoints.values.sm) {
    return 1
  } else if (window.innerWidth < theme.breakpoints.values.md) {
    return 3
  }

  return 4
}

export default findGridColumns
