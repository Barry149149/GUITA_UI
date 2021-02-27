import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from "react";
import Table from '@material-ui/core/Table'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import {TableBody} from "@material-ui/core";
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
        overflowX:'auto'
    },
}));


export default function StageTable(props){
    const classes = useStyles();
    const [selected,setSelected]=useState([])

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

    useEffect(()=>{
        console.log(selected)
    })
    const isSelected = (id) => selected.indexOf(id) !== -1;

    return(
        <Paper className={classes.paper}>
            <Toolbar className={clsx(classes.root, {
                [classes.highlight]: selected.length > 0,
            })}>
                {(selected.length >0)?(
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {selected.length} selected
                    </Typography>):(<Typography className={classes.title} variant="h6" color="primary">
                    Stage Table
                </Typography>)}
                {!(selected.length > 0) ?(
                    <Tooltip title="Add">
                        <Grow in={!(props.stageFormOpen||selected.length >0)}>
                            <Button
                                id='button_commandAdd'
                                onClick={() => {
                                    props.setStageFormOpen(true)
                                }}>
                                <PlaylistAdd/>
                            </Button>
                        </Grow>
                    </Tooltip>
                ):(
                <Tooltip title="Delete">
                    <Button onClick={deleteSelected}>
                        <DeleteIcon/>
                    </Button>
                </Tooltip>
                    )}
            </Toolbar>
            <Table classes={classes.root}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell align="left">Stage Name</TableCell>
                        <TableCell align="left">Image</TableCell>
                        <TableCell align="left">ExtraPath</TableCell>
                        <TableCell align="left">JobType</TableCell>
                        <TableCell align="left">MainClass</TableCell>
                        <TableCell align="left">ProjectFile</TableCell>
                        <TableCell align="left">Timeout</TableCell>
                        <TableCell align="left">Priority</TableCell>
                        <TableCell align="left">TestCaseID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.stage.map((row)=>{
                        const isItemSelected = isSelected(row.id);
                        return(
                            <TableRow>
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
                                {(row.json.image)?<TableCell align="left">{row.json.image}</TableCell>:<TableCell/>}
                                {(row.json.extraPath)?<TableCell align="left">{row.json.extraPath}</TableCell>:<TableCell/>}
                                {(row.json.jobType)?<TableCell align="left">{row.json.jobType}</TableCell>:<TableCell/>}
                                {(row.json.mainClass)?<TableCell align="left">{row.json.mainClass}</TableCell>:<TableCell/>}
                                {(row.json.projectFile)?<TableCell align="left">{row.json.projectFile}</TableCell>:<TableCell/>}
                                {(row.json.stopTimeOut)?<TableCell align="left">{row.json.stopTimeOut}</TableCell>:<TableCell/>}
                                {(row.json.priority)?<TableCell align="left">{row.json.priority}</TableCell>:<TableCell/>}
                                {(row.json.testcase_id)?<TableCell align="left">{row.json.testcase_id}</TableCell>:<TableCell/>}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    )
}