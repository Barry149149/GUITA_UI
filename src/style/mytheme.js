export const customThemeOptions = {
  props: {
    MuiTextField: {
      // Had to use this, otherwise dunno how to change the way rjsf renders TextField
      variant: 'outlined',

      size: 'small',
      fullWidth: true,
      InputLabelProps: {
        // shrink: true
      }
      // margin: "dense"
    }
  },
  typography: {
    fontFamily: `"Lato", "Roboto", "Arial", sans-serif`
  }
}
