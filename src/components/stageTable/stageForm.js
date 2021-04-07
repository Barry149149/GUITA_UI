import {Box, Divider, FormControl, MenuItem, Select, Toolbar, Input} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper"
import {makeStyles} from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Title from "../Title";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from '@material-ui/icons/Close';

const useStyle=makeStyles(theme=>({
    slider: {
        width: 150,

    },
    input: {
        width: 42,
    },
    form:{
        paddingLeft:theme.spacing(1),
        paddingBottom:theme.spacing(2),
        paddingRight:theme.spacing(1),
        minWidth:150
    },
    container:{
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2),
        paddingBottom:theme.spacing(2)
    },
    paper:{
        overflowX: "visible",
        minWidth:250
    },
    title: {
        flex: '1 1 100%',
    },
}))

export default function StageForm(props) {
    const classes = useStyle()
    const [error, setError] = useState({message: ""})
    const [newStage, setNewStage] = useState({
        stage_name: null,
        priority: null,
        stage_config: {},
        testcase_id: null
    })
    useEffect(() => {
        console.log(props.stage)
    })
    return (
        <React.Fragment>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Typography className={classes.title} color='primary' component="h2" variant="h6">Stage Form</Typography>
                    <Tooltip title="Close Form">
                        <Button onClick={()=>props.setStageFormOpen(false)}>
                            <CloseIcon/>
                        </Button>
                    </Tooltip>
                </Toolbar>
                <Divider/>
                <div className={classes.container}>
                    <FormControl className={classes.form}>
                        <TextField
                            id="stage_name"
                            label="Stage Name"
                            required={true}
                            onChange={(e) => (
                                setNewStage({
                                    ...newStage,
                                    stage_name: e.target.value
                                })
                            )}
                        />
                    </FormControl>
                    <br/>
                    <FormControl className={classes.form} required={true}>
                        <Typography id="stageForm_slider" gutterBottom>
                            Priority:
                        </Typography>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs>
                                <Slider
                                    className={classes.slider}
                                    id="stage_priority"
                                    label="Priority"
                                    value={newStage.priority}
                                    step={1}
                                    marks
                                    min={0}
                                    max={50}
                                    valueLabelDisplay="auto"
                                    defaultValue={0}
                                    onChange={(e, v) => (
                                        setNewStage({
                                            ...newStage,
                                            priority: v
                                        })
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <Input
                                    className={classes.input}
                                    value={newStage.priority}
                                    margin="dense"
                                    onChange={e => (
                                        setNewStage({
                                            ...newStage,
                                            priority: (e.target.value === '') ? '' : Number(e.target.value)
                                        })
                                    )}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 50,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </FormControl>
                    <div style={{paddingLeft: 7, paddingRight: 7}}>
                        <Typography id="stageForm_slider" gutterBottom>
                            Configuration
                        </Typography>
                        <JSONInput
                            locale={locale}
                            width="100%"
                            height="300px"
                            onChange={(e) => {
                                if (!e.error) {
                                    setNewStage({
                                        ...newStage,
                                        stage_config: e.jsObject
                                    })
                                }
                            }}
                        />
                    </div>
                    {
                        //TODO: Sync Test Case
                    }
                    <FormControl className={classes.form}>
                        <InputLabel>Test Case ID</InputLabel>
                        <Select
                            value={newStage.testcase_id}
                            onChange={(e)=>{
                                setNewStage({
                                    ...newStage,
                                    testcase_id: e.target.value
                                    })
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {props.testcases.map((row)=>{
                                return(
                                <MenuItem value={row.id}>{row.value}</MenuItem>
                                )
                            })}
                        </Select>

                    </FormControl>
                    <br/>
                    <FormControl className={classes.form}>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                if (newStage.stage_name && newStage.priority) {
                                    setError({message: ""})
                                    props.setStage([
                                        ...props.stage,
                                        {
                                            id: props.createdStage,
                                            json: newStage
                                        }
                                    ])
                                    props.setCreatedStage(props.createdStage + 1)
                                } else {
                                    if (!newStage.priority) setError({message: "Missing Priority"})
                                    if (!newStage.stage_name) setError({message: "Missing Stage Name"})
                                }
                            }}>
                            Submit
                        </Button>
                    </FormControl>
                    {(error.message) ? <p style={{color: "red"}}>{error.message}</p> : null}
                </div>
            </Paper>
        </React.Fragment>
    )
}