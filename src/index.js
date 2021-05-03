import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Editor from './components/Editor'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { customThemeOptions } from './style/mytheme'

const appTheme = createMuiTheme(customThemeOptions)

function Main() {
  return (
    <ThemeProvider theme={appTheme}>
      <Editor />
    </ThemeProvider>
  )
}
ReactDOM.render(<Main />, document.getElementById('root'))
