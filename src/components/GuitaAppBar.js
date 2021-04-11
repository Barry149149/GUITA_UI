import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import PublishIcon from '@material-ui/icons/Publish'
import SettingsIcon from '@material-ui/icons/Settings'
import Tooltip from '@material-ui/core/Tooltip'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import AppBar from '@material-ui/core/AppBar'
import React from 'react'

export default function GuitaAppBar(props) {
  const {
    classes,
    state,
    handleSubmit,
    setSettingsOpen,
    setGuideRun,
    setTour
  } = props

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}>
          GUITA Test Case IDE
        </Typography>

        <IconButton
          color="inherit"
          onClick={() => {
            setSettingsOpen(true)
          }}
          id="button_setting">
          <SettingsIcon />
        </IconButton>
        <Tooltip title="Start the tour again">
          <IconButton
            color="inherit"
            id="button_help"
            onClick={() => {
              setGuideRun(true)
              setTour(0)
            }}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
