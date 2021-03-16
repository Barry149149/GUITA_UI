import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { resultSample } from '../../../docs/data';
import {Select, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
//import ResultRequest from '../../resultTable/ResultRequest';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    }
}));


export default function CourseSelect(props) {
    const classes = useStyles();

    const [fetched, setFetched] = useState(null);
    const [fetchData, setFetchData] = useState([]);
    const [serverAssignment, setServerAssignment] = useState(null);

    //const fetchDataClick = () => ResultRequest(fetchData, setFetchData);
    const fetchDataClick = () => {
        fetch('/api/v2/assignment', { 
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            const assignment = Array.from(new Set(data.map(result => result)));
            setFetchData(assignment);
            setFetched(true);
        });
    }

    // useEffect(() => {
    //     fetch('/api/v2/assignment', {
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(response => response.json()).then(data => {
    //         const assignment = Array.from(new Set(data.map(result => result)));
    //         setFetchData(assignment);
    //         setFetched(true);
    //     });
    // }, [fetched]);

    useEffect(() => {
        fetch('/api/v2/job_batch', {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            // const assignment = Array.from(new Set(data.map(result => result)));
            setFetchData(data);
            setFetched(true);
        });
    }, [fetched]);


    const handleServerAssignment = (event) => {
        if(event.target.value){
            setServerAssignment(event.target.value);
        }
    };

    const handleServerResultShow = () => {
        console.log(serverAssignment);
        fetch(`/api/v2/job_batch/${serverAssignment}/report`)
          .then(x => x.json())
          .then(data => {
              props.setResultData({
                  ...props.resultData,
                  jobBatch: serverAssignment,
                  taskNumber: data[0]["reports"].length,
                  result: data,
              })
          })
    }
   
    const hasServerAssignment = serverAssignment && serverAssignment !== null;

    return(
        <React.Fragment>
            {(false)?
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Recent Jobs
                </InputLabel>
                <Select
                    disabled={!fetched}
                    onChange={handleServerAssignment}
                    >
                    <InputLabel>
                        Assignments
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {fetchData.map((data) => {
                        return (
                            <MenuItem key={data.job_batch_id} value={data.job_batch_id}>
                                {data.created_at}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select Assignment</FormHelperText>
            </FormControl>
            :null}
            <br/>
            {(false)?
            <Button 
                className={classes.button}
                variant= 'outlined'
                component='label'
                color= 'primary'
                disabled={!hasServerAssignment}
                onClick={handleServerResultShow}    
            >
                Show
            </Button>
            :null}
        </React.Fragment>
    )
}
