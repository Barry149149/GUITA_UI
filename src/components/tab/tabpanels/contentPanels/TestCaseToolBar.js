import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import Tabs from "@material-ui/core/Tabs";
import {Tooltip} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import TableChartIcon from "@material-ui/icons/TableChart";
import {Link, Prompt} from "react-router-dom";
import CodeIcon from "@material-ui/icons/Code";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom"
import PropTypes from "prop-types";

export default function TestCaseToolBar(props){

    const {classes,tabValue,selectedAssignmentName,dispatch,setTabValue,state,setDrawerOpen,testcaseFetched,setTestcaseFetched}=props

    let {assignId,assignName}=useParams()
    const location = useLocation();


    useEffect(()=>{
        setDrawerOpen(true)
    })

    // TODO: Save test case here
    
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
            setTestcaseFetched(true)
        } else {
            setTestcaseFetched(true)
        }
    },[testcaseFetched])

    return(
        <React.Fragment>
            <Prompt when={true} message={p=> {
                if(p.pathname.includes('/testcase/'+assignId+'/'+assignName)) {
                    return true
                }else {
                    return "All unsaved changes will be lost."
                }
            }} />
        <Toolbar className={classes.toolbar2}>
        <Typography className={classes.title} color="primary" variant="h5" component="div">
            {(assignName !== '') ? assignName : ((tabValue === 0) ? "Table & Form Mode " : "JSON Code Editor ")} / Test Case {state.present.selectedCase.id}
        </Typography>
        <IconButton color="inherit" disabled={state.past.length === 0} onClick={() => {
            dispatch({type: "UNDO"})
        }}>
            <UndoIcon/>
        </IconButton>
        <IconButton color="inherit" disabled={state.future.length === 0} onClick={() => {
            dispatch({type: "REDO"})
        }}>
            <RedoIcon/>
        </IconButton>
        <Tabs
            value={location.pathname.includes('jsoneditor')?1:0}
            indicatorColor="primary"
            textColor="primary"
            centered={true}
        >
            <Tooltip title="Table Mode">
                <Tab
                    className={classes.tab}
                    aria-label="tab_tableView"
                    icon={<TableChartIcon color="primary"/>}
                    component={Link}
                    to={'/testcase/'+assignId+'/'+assignName}
                />
            </Tooltip>
            <Tooltip title="CodeEditor">
                <Tab
                    className={classes.tab}
                    aria-label="tab_codeEditor"
                    icon={<CodeIcon color="primary"/>}
                    component={Link}
                    to={'/testcase/'+assignId+'/'+assignName+'/jsoneditor'}
                />
            </Tooltip>
        </Tabs>
    </Toolbar>
        </React.Fragment>
    )
}