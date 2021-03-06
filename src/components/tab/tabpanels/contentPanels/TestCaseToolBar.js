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
import Divider from '@material-ui/core/Divider'
import TablePanel from './TablePanel'

export default function TestCaseToolBar(props) {
  const {
    classes,
    tabValue,
    dispatch,
    state,
    setDrawerOpen,
    fetched,
    setFetched,
    file,
    setPostings,
    setSelectedAssignment,
    setSelectedAssignmentName
  } = props

  let { assignId, assignName } = useParams()
  const location = useLocation()
  const [exists, setExists] = useState(false)

  useEffect(() => {
    setDrawerOpen(true)
  })

  // TODO: Save test case here

  useEffect(() => {
    fetch('/api/v2/assignment/' + assignId + '/testcase')
      .then((response) => response.json())
      .then(async (data) => {
        //console.log(data)

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
          try {
            if (data[i].testcase_name !== null) {
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
                json_id: [...json_id],
                testcase_id: data[i].testcase_id
              })
              //console.log(newNodes) // newNodes here is OK
            }
          } catch (err) {
            console.log(err)
          }
        }
        if (newNodes.length == 0) return
        console.log(newNodes)

        // But failed here
        setSelectedAssignment(assignId)
        setSelectedAssignmentName(assignName)
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
      .then(setFetched(true))
  }, [fetched])

  useEffect(() => {
    console.log(state.present.tree[0])
  })
  const saveTestcase = () => {
    // Testcase json
    for (let i = 0; i < state.present.tree[0].nodes.length; i++) {
      console.log(state.present.tree[0].nodes[i].testcase_id)

      const tData = new FormData()
      tData.append('testcase_name', state.present.tree[0].nodes[i].value)
      let newJson = []
      for (let j = 0; j < state.present.tree[0].nodes[i].json_id.length; j++) {
        newJson.push(state.present.tree[0].nodes[i].json_id[j].command)
      }
      //console.log(newJson)
      const fileData = JSON.stringify(newJson)
      const blob = new Blob([fileData], { type: 'application/json' })
      tData.append(
        'testcase_file',
        blob,
        state.present.tree[0].nodes[i].value + '.json'
      )

      if (
        state.present.tree[0].nodes[i].testcase_id === null ||
        typeof state.present.tree[0].nodes[i].testcase_id == 'undefined'
      ) {
        console.log('Not exist')

        fetch('/api/v2/assignment/' + assignId + '/testcase', {
          method: 'POST',
          body: tData
        })
          .then((result) => console.log(result))

          .catch((error) => {
            setPostings(3)
            console.log(error)
          })
      } else {
        console.log('Exist')

        fetch(
          '/api/v2/assignment/' +
            assignId +
            '/testcase/' +
            state.present.tree[0].nodes[i].testcase_id,
          {
            method: 'PUT',
            body: tData
          }
        )
          .then((result) => console.log(result))
          .catch((error) => {
            setPostings(3)
            console.log(error)
          })
      }
    }

    // Img zip
    if (file.zip !== null || typeof file.zip == 'undefined') {
      const iData = new FormData()
      iData.append('resource_file', file.zip)
      fetch('/api/v2/assignment/' + assignId + '/testcase', {
        method: 'POST',
        body: iData
      })
        .then((result) => console.log(result))
        .catch((error) => {
          setPostings(3)
          console.log(error)
        })
    }

    // Delete testcase
    // TODO: Delete test case
    /*
        for(let i = 0; i < deletedTestcase.length; i++){
          fetch('/api/v2/assignment/' + assignId + '/testcase/' + deletedTestcase[i], {
            method: 'DELETE'
          }).then(result=>console.log(result)).catch(error=>{
            setPostings(3)
            console.log(error)
          })
        }
        setDeletedTestcase([])*/

    setFetched(false)
    setPostings(2)
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
      <Toolbar className={classes.toolbar2} style={{ paddingRight: 0 }}>
        <Typography
          className={classes.title}
          style={{ flexGrow: 1 }}
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
            setPostings(1)
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
          centered={true}
          onClick={() => {
            props.setFormOpen(false)
          }}>
          <Tooltip title="Table Mode">
            <Tab
              className={classes.tab}
              style={{ padding: 0 }}
              aria-label="tab_tableView"
              icon={<TableChartIcon />}
              component={Link}
              label="Table Mode"
              to={'/testcase/' + assignId + '/' + assignName}
            />
          </Tooltip>
          <Tooltip title="Code Editor">
            <Tab
              className={classes.tab}
              style={{ padding: 0 }}
              aria-label="tab_codeEditor"
              icon={<CodeIcon />}
              component={Link}
              label="JSON Mode"
              to={'/testcase/' + assignId + '/' + assignName + '/jsoneditor'}
            />
          </Tooltip>
        </Tabs>
      </Toolbar>
    </React.Fragment>
  )
}
