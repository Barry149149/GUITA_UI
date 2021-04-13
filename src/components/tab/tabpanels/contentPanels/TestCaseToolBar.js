import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import Tabs from '@material-ui/core/Tabs'
import { Tooltip } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import TableChartIcon from '@material-ui/icons/TableChart'
import { Link, Prompt } from 'react-router-dom'
import CodeIcon from '@material-ui/icons/Code'
import Toolbar from '@material-ui/core/Toolbar'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

export default function TestCaseToolBar(props) {
  const {
    classes,
    tabValue,
    selectedAssignmentName,
    dispatch,
    setTabValue,
    state,
    setDrawerOpen,
    fetched,
    setFetched,
    file,
    setFile
  } = props

  let { assignId, assignName } = useParams()
  const location = useLocation()
  const [exists, setExists] = useState(false)

  useEffect(() => {
    setDrawerOpen(true)
  })

  // TODO: Save test case here

  useEffect(() => {
    if (assignId) {
      fetch('/api/v2/assignment/' + assignId + '/testcase')
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data)

          let newNodes = new Array()
          if (data.length == 0) {
            setExists(false)
            dispatch({
              type: 'SET',
              data: {
                tree: [
                  {
                    value: assignName,
                    nodes: [
                      {
                        id: 1,
                        value: 'Test 1',
                        json: [],
                        json_id: []
                      }
                    ]
                  }
                ],
                selectedCase: {
                  id: 1,
                  json: [],
                  json_id: [],
                  value: 'Test 1'
                },
                createdCases: 1,
                noOfCases: 1
              }
            })
            return
          } else {
            setExists(true)
          }

          for (let i = 0; i < data.length; i++) {
            //console.log(data[i])
            //console.log(data[i].testcase_name !== null)
            if (data[i].testcase_name !== null) {
              //console.log(data[i])
              let { json, json_id } = await fetch(
                '/uploads/assignment/' +
                  assignId +
                  '/testcase/' +
                  data[i].testcase_id +
                  '.json'
              )
                .then((response) => response.json())
                .then((data) => {
                  //console.log(data)

                  let json = [...data]
                  let json_id = []
                  for (let i = 0; i < data.length; i++) {
                    json_id.push({
                      id: i,
                      command: json[i]
                    })
                  }
                  return { json, json_id }
                })

              newNodes.push({
                id: i + 1,
                value: data[i].testcase_name,
                json: [...json],
                json_id: [...json_id]
              })
              console.log(newNodes)
            }
          }
          if (newNodes.length == 0) return
          //console.log(newNodes)
          dispatch({
            type: 'SET',
            data: {
              tree: [
                {
                  value: assignName,
                  nodes: [...newNodes]
                }
              ],
              selectedCase: { ...newNodes[0] },
              createdCases: data.length,
              noOfCases: data.length
            }
          })
        })
      setFetched(true)
    } else {
      setFetched(true)
    }
  }, [fetched])

  const saveTestcase = () => {
    console.log(exists)
    console.log(state.present.tree[0])

    if (exists) {
      const tData = new FormData()
      for (let i = 0; i < state.present.tree[0].nodes.length; i++) {
        tData.append(
          'testcase_name',
          'testcase' + state.present.tree[0].nodes[i].value
        )
        const fileData = JSON.stringify(state.present.tree[0].nodes[i].json_id)
        const blob = new Blob([fileData], { type: 'application/json' })
        tData.append(
          'testcase_file',
          blob,
          'testcase' + state.present.tree[0].nodes[i].value + '.json'
        )
        //tData.append('resource_file',,)
        //console.log(state.present.tree[0].nodes[i])
      }
      tData.append('resource_file', file.zip)

      fetch('/api/v2/assignment/' + assignId + '/testcase', {
        method: 'POST',
        body: tData
      })
        .then((result) => console.log(result))
        .catch((error) => console.log(error))
    }
    // TODO: PUT
  }

  return (
    <React.Fragment>
      <Prompt
        when={true}
        message={(p) => {
          if (p.pathname.includes('/testcase/' + assignId + '/' + assignName)) {
            return true
          } else {
            return 'All unsaved changes will be lost.'
          }
        }}
      />
      <Toolbar className={classes.toolbar2}>
        <Typography
          className={classes.title}
          color="primary"
          variant="h6"
          component="div">
          {assignName !== ''
            ? assignName
            : tabValue === 0
            ? 'Table & Form Mode '
            : 'JSON Code Editor '}{' '}
          / {state.present.selectedCase.value}
        </Typography>
        <Button
          id="button_testcaseSave"
          color="primary"
          onClick={() => {
            saveTestcase()
          }}>
          <SaveIcon />
        </Button>
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
          value={location.pathname.includes('jsoneditor') ? 1 : 0}
          indicatorColor="primary"
          textColor="primary"
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
          <Tooltip title="CodeEditor">
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
    </React.Fragment>
  )
}
