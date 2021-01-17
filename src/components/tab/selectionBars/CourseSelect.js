import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { courseOption, comp2012Option, comp3021Option } from '../../../docs/data';
import {Select, MenuItem}from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CourseSelect(props) {
    const classes = useStyles();

    const handleChange = e => props.setConfig({
        ...props.config
    });

    const handleCourseChange = e => {
        
    };

    return(
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Course
                </InputLabel>
                <Select
                    onChange={handleCourseChange}
                    >
                    <MenuItem key="" value="">
                        <em>none</em>
                    </MenuItem>
                    {courseOption.map(({index,value,label}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select the Course</FormHelperText>
                <Select
                    >
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {comp2012Option.map(({index,value,label}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select the Assignment</FormHelperText>
            </FormControl>
        </div>
    )
}
