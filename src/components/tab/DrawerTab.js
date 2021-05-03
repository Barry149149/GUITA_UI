import Tabs from '@material-ui/core/Tabs'
import Tooltip from '@material-ui/core/Tooltip'
import Tab from '@material-ui/core/Tab'
import TuneIcon from '@material-ui/icons/Tune'
import ListAltIcon from '@material-ui/icons/ListAlt'
import TabIcon from '@material-ui/icons/Tab'
import DescriptionIcon from '@material-ui/icons/Description'
import HomeIcon from '@material-ui/icons/Home'
import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import PlaylistAddCheckSharpIcon from '@material-ui/icons/PlaylistAddCheckSharp'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import { Drawer, withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 140
const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  tab: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    paddingLeft: 4
  }
}))

export default function DrawerTab({
  selectedAssignment,
  selectedAssignmentName,
  lastEditedJobConfig
}) {
  // const { drawerValue, classes } = props
  // const location = useLocation()

  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      open={true}
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}>
      <div className={classes.appBarSpacer} />
      <div className={classes.drawerContainer}>
        <List
          component="nav"
          orientation="vertical"
          disablePadding={true}
          align="left">
          <ListItem
            button
            selected={useLocation().pathname === '/'}
            component={Link}
            to={'/'}>
            <HomeIcon color="primary" />
            <ListItemText classes={{ primary: classes.tab }} primary="Home" />
          </ListItem>
          <ListItem
            button
            disabled={selectedAssignment === -1}
            selected={
              useLocation().pathname ===
              '/testcase/' + selectedAssignment + '/' + selectedAssignmentName
            }
            component={Link}
            to={
              '/testcase/' + selectedAssignment + '/' + selectedAssignmentName
            }>
            <DescriptionIcon color="primary" />
            <ListItemText
              classes={{ primary: classes.tab }}
              primary="Test Case"
            />
          </ListItem>
          <ListItem
            button
            disabled={lastEditedJobConfig.id === -1}
            selected={
              useLocation().pathname ===
              '/config/' +
                lastEditedJobConfig.id +
                '/' +
                lastEditedJobConfig.name
            }
            component={Link}
            to={
              '/config/' +
              lastEditedJobConfig.id +
              '/' +
              lastEditedJobConfig.name
            }>
            <TuneIcon color="primary" />
            <ListItemText classes={{ primary: classes.tab }} primary="Config" />
          </ListItem>
          <ListItem
            button
            selected={useLocation().pathname === '/result'}
            component={Link}
            to={'/result'}>
            <PlaylistAddCheckSharpIcon color="primary" />
            <ListItemText classes={{ primary: classes.tab }} primary="Result" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}
