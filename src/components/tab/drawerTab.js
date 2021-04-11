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

export default function DrawerTab(props) {
  const { drawerValue, classes } = props
  const location = useLocation()

  useEffect(() => {
    //console.log(location)
  })
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <List
        component="nav"
        orientation="vertical"
        style={{ maxWidth: 150 }}
        disablePadding={true}
        align="left">
        <ListItem
          button
          className={{ root: classes.tab2, selected: classes.selected }}
          aria-checked={drawerValue === 0}
          selected={location.pathname == '/'}
          component={Link}
          to={'/'}>
          <HomeIcon color="primary" />
          <ListItemText
            disableTypography
            primary={
              <Typography
                color="primary"
                style={{ 'font-family': 'Segoe UI', 'font-weight': 'bold' }}>
                {'Home'}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          className={{ root: classes.tab2, selected: classes.selected }}
          aria-checked={drawerValue === 1}
          disabled={props.selectedAssignment == -1}
          selected={
            location.pathname ==
            '/testcase/' +
              props.selectedAssignment +
              '/' +
              props.selectedAssignmentName
          }
          component={Link}
          to={
            '/testcase/' +
            props.selectedAssignment +
            '/' +
            props.selectedAssignmentName
          }>
          <DescriptionIcon color="primary" />
          <ListItemText
            disableTypography
            primary={
              <Typography
                color="primary"
                style={{ 'font-family': 'Segoe UI', 'font-weight': 'bold' }}>
                {'Test Case'}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          className={{ root: classes.tab2, selected: classes.selected }}
          aria-checked={drawerValue === 2}
          selected={
            location.pathname ==
            '/config/' +
              props.lastEditedJobConfig.id +
              '/' +
              props.lastEditedJobConfig.name
          }
          disabled={props.lastEditedJobConfig.id == -1}
          component={Link}
          to={
            '/config/' +
            props.lastEditedJobConfig.id +
            '/' +
            props.lastEditedJobConfig.name
          }>
          <TuneIcon color="primary" />
          <ListItemText
            disableTypography
            primary={
              <Typography
                color="primary"
                style={{ 'font-family': 'Segoe UI', 'font-weight': 'bold' }}>
                {'Config'}
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          className={{ root: classes.tab2, selected: classes.selected }}
          aria-checked={drawerValue === 3}
          selected={location.pathname == '/result'}
          component={Link}
          to={'/result'}>
          <PlaylistAddCheckSharpIcon color="primary" />
          <ListItemText
            disableTypography
            primary={
              <Typography
                color="primary"
                style={{ 'font-family': 'Segoe UI', 'font-weight': 'bold' }}>
                {'Result'}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </nav>
  )
}
