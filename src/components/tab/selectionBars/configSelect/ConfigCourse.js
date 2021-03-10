import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from "react-hook-form";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Select, MenuItem} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: 200
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button_container: {
        width:260
    }
}));

export default function CourseTree(props){
    const classes = useStyles();
    const { register, handleSubmit } = useForm();

    const [createAssignment, setCreateAssignment] = useState(false);
    const [fetched, setFetched] = useState(null);
    const [fetchData, setFetchData] = useState([]);

    const handleCreateAssignmentOpen=()=>{
        setCreateAssignment(true);
    }
    const handleCreateAssignmentClose=()=>{
        setCreateAssignment(false);
    }

    const handleCreateAssignment=(data)=>{
        fetch('/api/v2/assignment', {
            method: 'POST',
            body: JSON.stringify({"assignment_name": data.assignmentName}),
            headers: {
              'content-type': 'application/json'
            }
          }).then(result => console.log(result)).catch(error => console.log(error));
        console.log(data.assignmentName);
        handleCreateAssignmentClose();
    }


    const handleAssignment = (event) => {
        if(event.target.value){
            props.setConfig({
                ...props.config,
                assignment_id: event.target.value
            });
        }
    };

    useEffect(() => {
        fetch('/api/v2/assignment', { 
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            const assignment = Array.from(new Set(data.map(result => result)));
            setFetchData(assignment);
            setFetched(true);
            console.log(assignment);
        }).catch(error => console.log(error));
    }, [createAssignment]);

    return (
        <div>
            <Button
                variant= 'outlined'
                color= 'primary'
                width={200}
                onClick={handleCreateAssignmentOpen}>
                Create Assignment
            </Button>
            <Dialog open={createAssignment} onClose={handleCreateAssignmentClose}>
            <DialogTitle>Create Assignment</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter assignment name.
            </DialogContentText>
            <form onSubmit={handleSubmit(handleCreateAssignment)}>
                <input name="assignmentName" ref={register({ required: true })} />
            </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCreateAssignmentClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit(handleCreateAssignment)} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
        <br/>
        <FormControl className={classes.formControl}>
            <InputLabel>
                Assignments
            </InputLabel>
            <Select
                disabled={!fetched}
                onChange={handleAssignment}
                >
                <InputLabel>
                    Assignments
                </InputLabel>
                <MenuItem key="" value="">
                    <em>None</em>
                </MenuItem>
                {fetchData.map((data) => {
                    return (
                        <MenuItem key={data.assignment_id} value={data.assignment_id}>
                            {data.assignment_name}
                        </MenuItem>
                    )
                })
                }
            </Select>
            <FormHelperText>Select Assignment</FormHelperText>
        </FormControl>
    </div>
    )

}