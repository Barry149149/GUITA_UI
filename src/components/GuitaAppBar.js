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
import Box from '@material-ui/core/Box'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import ClipLoader from 'react-spinners/ClipLoader'
import { CheckCircle } from '@material-ui/icons'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

export default function GuitaAppBar(props) {
  const {
    classes,
    state,
    handleSubmit,
    setSettingsOpen,
    setGuideRun,
    setTour,
    postings
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
        <Box style={{ backgroundColor: '#757ce8' }}>
          {postings === 0 ? (
            <ListItem dense>
              <ListItemIcon>
                <FiberManualRecordIcon style={{ color: '#F0F0F0' }} />
              </ListItemIcon>
              <ListItemText>Nothing is Submitted</ListItemText>
            </ListItem>
          ) : postings === 1 ? (
            <ListItem dense>
              <ListItemIcon>
                {' '}
                <ClipLoader color={'#FFFFFF'} loading={true} size={16} />
              </ListItemIcon>
              <ListItemText>Posting Submission</ListItemText>
            </ListItem>
          ) : postings === 2 ? (
            <ListItem dense>
              <ListItemIcon>
                <CheckCircle color="green" />
              </ListItemIcon>
              <ListItemText style={{ color: '#FFFFFF', fontSize: 12 }}>
                Submission Done
              </ListItemText>
            </ListItem>
          ) : (
            <ListItem dense>
              <ListItemIcon>
                <ErrorIcon color="secondary" />
              </ListItemIcon>
              <ListItemText style={{ color: '#FFFFFF', fontSize: 12 }}>
                Submission Failed
              </ListItemText>
            </ListItem>
          )}
        </Box>
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
