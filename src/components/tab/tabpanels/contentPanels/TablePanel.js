import Grid from '@material-ui/core/Grid'
import CommandTable from '../../../commandTable/CommandTable'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import CommandForm from '../../../commandTable/CommandForm'
import TabPanel from '../Tabpanel'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { Route, useParams, useRouteMatch } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import TestCaseToolBar from './TestCaseToolBar'
import JsonEditorPanel from './JsonEditorPanel'
import TreePanel from '../drawerPanels/TreePanel'

export default function TablePanel(props) {
  let { assignId, assignName } = useParams()

  const {
    classes,
    tabValue,
    state,
    formOpen,
    setFormOpen,
    drawerOpen,
    dispatch,
    themeOptions,
    selectedAssignmentName,
    setTabValue,
    setDrawerOpen,
    fetched,
    setFetched,
    file,
    setFile,
    setPostings,
    deletedTestcase,
    setDeletedTestcase,
    setSelectedAssignment,
    setSelectedAssignmentName
  } = props

  /*
    useEffect(()=>{
        if(assignId){
            fetch('/api/v2/assignment/'+assignId+'/testcase').then(response => response.json())
            .then(async data => {
                console.log(data)
                let newNodes=new Array()
                if(data.length==0){
                    dispatch({
                        type:'SET',
                        data:{
                            tree:[
                                {
                                    value: assignName,
                                    nodes: [
                                        {
                                            id:1,
                                            value: 'Test 1',
                                            json: [],
                                            json_id:[]
                                        },
                                    ],
                                },
                            ],
                            selectedCase:{
                                id:1,
                                json: [],
                                json_id:[]
                            },
                            createdCases: 1,
                            noOfCases:1
                        }

                    })
                    return
                }
                for(let i = 0;i<data.length; i++) {
                    if(data[i].testcase_name!==null){
                        let { json , json_id } = await fetch('/uploads/assignment/'+assignId+'/testcase/'+data[i].testcase_id+'.json').
                        then(response => response.json()).
                        then( data => {
                            let json=[...data];
                            let json_id=[];
                            for(let i=0;i<data.length; i++){
                                json_id.push({
                                        id:i,
                                        command:json[i]
                                })
                            }
                            return {json, json_id}

                        })
                        newNodes.push({
                            id:(i+1),
                            value:'Test'+(i+1),
                            json:[...json],
                            json_id:[...json_id]
                        })
                    }
                }
                if(newNodes.length == 0) return
                console.log(newNodes)
                dispatch({
                    type:'SET',
                    data: {
                        tree:[
                            {
                                value: assignName,
                                nodes: [...newNodes],
                            },
                        ],
                        selectedCase:{...newNodes[0]},
                        createdCases: data.length,
                        noOfCases:data.length,}
                })
            })
            setFetched(true)
        } else {
            setFetched(true)
        }
    },[fetched])*/

  let { path, _ } = useRouteMatch()

  return (
    <React.Fragment>
      <TestCaseToolBar
        classes={classes}
        tabValue={tabValue}
        selectedAssignmentName={selectedAssignmentName}
        dispatch={dispatch}
        setTabValue={setTabValue}
        state={state}
        setDrawerOpen={setDrawerOpen}
        fetched={fetched}
        setFetched={setFetched}
        file={file}
        setFile={setFile}
        setPostings={setPostings}
        deletedTestcase={deletedTestcase}
        setDeletedTestcase={setDeletedTestcase}
        setFormOpen={setFormOpen}
        setSelectedAssignment={setSelectedAssignment}
        setSelectedAssignmentName={setSelectedAssignmentName}
      />
      <Route exact path={`${path}/jsoneditor`}>
        <JsonEditorPanel
          classes={classes}
          tabValue={tabValue}
          style={themeOptions}
          state={state}
          dispatch={dispatch}
          fetched={fetched}
          setFetched={setFetched}
        />
      </Route>
      <Route exact path={path}>
        {fetched ? (
          <CommandTable
            selectedCase={state.present.selectedCase}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
            tree={state.present.tree}
            createdCases={state.present.createdCases}
            noOfCases={state.present.noOfCases}
            dispatch={dispatch}
          />
        ) : (
          <div
            style={{
              position: 'relative',
              top: '50%',
              left: '50%',
              overflowX: 'hidden'
            }}>
            <ClipLoader color={'#3f51b5'} loading={true} size={50} />
          </div>
        )}
      </Route>
    </React.Fragment>
  )
}
