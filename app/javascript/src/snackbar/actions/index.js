export const CLOSE_SNACKBAR = 'SNACKBAR.CLOSE'
export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR })

export const OPEN_SNACKBAR = 'SNACKBAR.OPEN'
export const openSnackbar = payload => ({ type: OPEN_SNACKBAR, payload })
