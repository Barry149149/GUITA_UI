import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import Tabs from '@material-ui/core/Tabs'
import { Tooltip } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import TableChartIcon from '@material-ui/icons/TableChart'
import { Link, useParams } from 'react-router-dom'
import CodeIcon from '@material-ui/icons/Code'
import TablePanel from '../tab/tabpanels/contentPanels/TablePanel'
import React from 'react'

export default function TestCasePageTable(props) {
  let { assignId, assignName } = useParams()

  const {
    classes,
    selectedAssignmentName,
    state,
    dispatch,
    tabValue,
    setTabValue,
    width,
    formOpen,
    setFormOpen,
    selectedAssignment,
    drawerOpen,
    drawerWidth
  } = props

  return (
    <Box p={3}>
      <Paper className={classes.paper2}>
        <Toolbar className={classes.toolbar2}>
          <Typography
            className={classes.title}
            color="primary"
            variant="h5"
            component="div">
            {selectedAssignmentName !== ''
              ? selectedAssignmentName
              : tabValue === 0
              ? 'Table & Form Mode '
              : 'JSON Code Editor '}
            / Test Case {state.present.selectedCase.id}
          </Typography>
          <IconButton
            color="inherit"
            disabled={state.past.length === 0}
            onClick={() => {
              dispatch({ type: 'UNDO' })
            }}>
            <UndoIcon />
          </IconButton>
          <IconButton
            color="inherit"
            disabled={state.future.length === 0}
            onClick={() => {
              dispatch({ type: 'REDO' })
            }}>
            <RedoIcon />
          </IconButton>
          <Tabs
            value={tabValue}
            onChange={(value, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            centered={true}>
            <Tooltip title="Table Mode">
              <Tab
                className={classes.tab}
                aria-label="tab_tableView"
                icon={<TableChartIcon color="primary" />}
                component={Link}
                to={'/testcase/' + assignId + '/' + assignName}
              />
            </Tooltip>
            <Tooltip title="Code Editor">
              <Tab
                className={classes.tab}
                aria-label="tab_codeEditor"
                icon={<CodeIcon color="primary" />}
                component={Link}
                to={'/testcase/' + assignId + '/' + assignName + '/jsoneditor'}
              />
            </Tooltip>
          </Tabs>
        </Toolbar>
        <TablePanel
          tabValue={tabValue}
          formOpen={formOpen}
          state={state}
          setFormOpen={setFormOpen}
          dispatch={dispatch}
          width={drawerOpen ? width - drawerWidth : width}
          selectedAssignment={selectedAssignment}
        />
      </Paper>
    </Box>
  )
}
