import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {frameworkOption} from '../../docs/data';
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

export default function FrameWorkSelect(props) {
    const classes = useStyles();

    const handleChange = e => props.setFramework(e.target.value);

    return(
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    FrameWork
                </InputLabel>
                <Select
                    onChange={handleChange}>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {frameworkOption.map(({index,value,label}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select the FrameWork for the assignment</FormHelperText>
            </FormControl>
        </div>
    )
}
