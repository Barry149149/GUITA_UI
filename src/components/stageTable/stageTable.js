import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from "react";
import Table from '@material-ui/core/Table'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableBody} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Grow from "@material-ui/core/Grow";
import {PlaylistAdd} from "@material-ui/icons";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.primary.main,
                backgroundColor: lighten(theme.palette.primary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    tableRow: {
        "&$selected, &$selected:hover": {
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
    },
    paper:{
        overflowX:'auto',
        overflow:'auto',
        maxHeight:800,
    },
    selected: {}
}));


export default function StageTable(props){
    const classes = useStyles();
    const [selected,setSelected]=useState([])
    const [open,setOpen]=useState([])
    const [create, setCreate]=useState(false)
    const { register, handleSubmit } = useForm()
    const [fetched, setFetched] = useState(false)

    const location = useLocation()
    useEffect(() => {
        console.log(location)
    })

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    }

    const handleOpenClick=(event, id)=>{
        const openedIndex = open.indexOf(id);
        let newSelected = [];

        if (openedIndex === -1) {
            newSelected = newSelected.concat(open, id);
        } else if (openedIndex === 0) {
            newSelected = newSelected.concat(open.slice(1));
        } else if (openedIndex === open.length - 1) {
            newSelected = newSelected.concat(open.slice(0, -1));
        } else if (openedIndex > 0) {
            newSelected = newSelected.concat(
                open.slice(0, openedIndex),
                open.slice(openedIndex + 1),
            );
        }
        setOpen(newSelected);
    }

    const selectAll=()=>{
        let newSelected=[]
        if(selected.length>0){setSelected([]); return }
        for(let i=0;i<props.stage.length;i++){
            newSelected.push(i)
        }
        setSelected(newSelected)
    }

    const openAll=()=>{
        let newSelected=[]
        if(open.length>0){setOpen([]); return }
        for(let i=0;i<props.stage.length;i++){
            newSelected.push(i)
        }
        setOpen(newSelected)
    }

    const deleteSelected=()=>{
        const newStage=[]
        for(let i=0; i <props.stage.length;i++) {
            if(selected.indexOf(props.stage[i].id)===-1) {
                newStage.push(props.stage[i])
            }
        }
        props.setStage(newStage)
        setSelected([])
    }

    const handleCreateOpen=()=>{
        if(!create){
            setCreate(true);
        }
    }

    const handleCreateClose=()=>{
        setCreate(false);
    }

    const createConfig=(data)=>{
        if(!props.createConfig){
            props.setCreateConfig(true)
        }
        
        fetch('/api/v2/job_config', {
            method: 'POST',
            body: JSON.stringify({"job_config_name": data.config}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(result => {return result.json()}).then(data => {
            //console.log(data)
            // TODO: for each
            for(let i=0; i<props.stage.length; i++){
                fetch('/api/v2/job_config/'+data.job_config_id+'/job_stage', {
                    method: 'POST',
                    body: JSON.stringify(props.stage[i].json),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            }
        }).catch(error => console.log(error))

        setCreate(false)
    }
    const saveConfig=()=>{

    }

    useEffect(()=>{
        //console.log(props.selectedJobConfig)
        if(props.configId){
            fetch('/api/v2/job_config/'+props.configId+'/job_stage',{
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => response.json()).then(data => {
                console.log(data)
                const array = []
                for(let i=0; i<data.length; i++){
                    const item = {id: i, json: data[i]}
                    array.push(item)
                }
                props.setStage(array)
                setFetched(true)
            });
        } else{
            props.setStage([]);
            setFetched(true)};
    },[])
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const isOpen = (id) =>open.indexOf(id) !== -1;

    return(
        <Paper className={classes.paper}>
            <Toolbar className={clsx(classes.root, {
                [classes.highlight]: selected.length > 0,
            })}>
                {(selected.length >0)?(
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {selected.length} selected
                    </Typography>):(<Typography className={classes.title} variant="h6" color="primary">
                    {(props.configName !== '')?(props.configName+' / '):null}
                    Stage Table
                </Typography>)}
                {(props.selectedJobConfig)?(
                    <Tooltip title="Save">
                    <Button
                        id='button_commandSave'
                        variant= 'outlined'
                        color= 'primary'
                        onClick={() => {
                            
                        }}>
                        Save
                    </Button>
                    </Tooltip>
                ):(
                    <Tooltip title="Submit New Job Config">
                    <Button
                        id='button_commandSubmit'
                        variant= 'outlined'
                        color= 'primary'
                        onClick={() => {
                            setCreate(true);
                        }}>
                        Submit
                    </Button>
                    </Tooltip>
                )
                }
                {!(selected.length > 0) ?(
                    <Tooltip title="Add">
                        <Grow in={!(props.stageFormOpen||selected.length >0)}>
                            <Button
                                id='button_commandAdd'
                                onClick={() => {
                                    props.setStageFormOpen(true)
                                    props.setStageSelectOpen(false)
                                }}>
                                <PlaylistAdd/>
                            </Button>
                        </Grow>
                    </Tooltip>
                ):(
                    <Tooltip title="Delete">
                        <IconButton color="inherit" onClick={deleteSelected} >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
            {(fetched)?
            <Table classes={classes.root}>
                <TableHead>
                    <TableRow
                        hover
                        selected={props.stage.length>0&&props.stage.length===selected.length}
                        aria-checked={props.stage.length>0&&props.stage.length===selected.length}
                        className={classes.tableRow}
                        classes={{selected: classes.selected}}
                    >
                        <TableCell padding="checkbox" >
                            <Checkbox
                                checked={props.stage.length>0&&props.stage.length===selected.length}
                                color="primary"
                                onChange={(event) => {
                                    selectAll()
                                }}
                            />
                        </TableCell>
                        <TableCell align="left">Stage Name</TableCell>
                        <TableCell align="left">Priority</TableCell>
                        <TableCell align="left">TestCaseID</TableCell>
                        <TableCell align="right">
                            <IconButton id="button_expandRow" size="small"
                                        onClick={(e) => openAll() }>
                                {(props.stage.length>0&&props.stage.length===open.length) ? <KeyboardArrowUpIcon/> :
                                    <KeyboardArrowDownIcon/>}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.stage.map((row)=>{
                        const isItemSelected = isSelected(row.id);
                        const isItemOpen=isOpen(row.id)
                        return(
                            <React.Fragment>
                                <TableRow
                                    hover
                                    key={row.id}
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                    className={classes.tableRow}
                                    classes={{selected: classes.selected}}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            id='checkbox_commandTableRow'
                                            checked={isItemSelected}
                                            color="primary"
                                            onChange={(event) => {
                                                handleClick(event, row.id)
                                            }}
                                        />
                                    </TableCell>
                                    {(row.json.stage_name)?<TableCell align="left">{row.json.stage_name}</TableCell>:<TableCell/>}
                                    {(row.json.priority)?<TableCell align="left">{row.json.priority}</TableCell>:<TableCell/>}
                                    {(row.json.testcase_id)?<TableCell align="left">{row.json.testcase_id}</TableCell>:<TableCell/>}
                                    <TableCell align="right">
                                        <IconButton id="button_expandRow" size="small"
                                                    onClick={(e) => handleOpenClick(e, row.id)}>
                                            {isItemOpen ? <KeyboardArrowUpIcon/> :
                                                <KeyboardArrowDownIcon/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Detail
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="left">Image</TableCell>
                                                            <TableCell align="left">ExtraPath</TableCell>
                                                            <TableCell align="left">JobType</TableCell>
                                                            <TableCell align="left">MainClass</TableCell>
                                                            <TableCell align="left">ProjectFile</TableCell>
                                                            <TableCell align="left">Timeout</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            {(row.json.image)?<TableCell align="left">{row.json.image}</TableCell>:<TableCell/>}
                                                            {(row.json.extraPath)?<TableCell align="left">{row.json.extraPath}</TableCell>:<TableCell/>}
                                                            {(row.json.jobType)?<TableCell align="left">{row.json.jobType}</TableCell>:<TableCell/>}
                                                            {(row.json.mainClass)?<TableCell align="left">{row.json.mainClass}</TableCell>:<TableCell/>}
                                                            {(row.json.projectFile)?<TableCell align="left">{row.json.projectFile}</TableCell>:<TableCell/>}
                                                            {(row.json.stopTimeOut)?<TableCell align="left">{row.json.stopTimeOut}</TableCell>:<TableCell/>}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )
                    })}
                </TableBody>
            </Table>
            :null}
            <Dialog open={create} onClose={handleCreateClose}>
                <DialogTitle>Submit New Job Configurations</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter config name</DialogContentText>
                    <form onSubmit={handleSubmit(createConfig)}>
                        <input name="config" ref={register({ required: true })} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(createConfig)} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
