import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import Tabs from "@material-ui/core/Tabs";
import {Tooltip} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import TableChartIcon from "@material-ui/icons/TableChart";
import {Link} from "react-router-dom";
import CodeIcon from "@material-ui/icons/Code";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom"

export default function TestCaseToolBar(props){

    const {classes,tabValue,selectedAssignmentName,dispatch,setTabValue,state,setDrawerOpen}=props

    useEffect(()=>{
        setDrawerOpen(true)
    })

    let {assignId,assignName}=useParams()

    return(
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
            value={tabValue}
            onChange={(value, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
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
    )
}