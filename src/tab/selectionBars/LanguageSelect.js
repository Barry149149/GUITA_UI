import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { languageOption } from '../../docs/data';
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

export default function LanguageSelect() {
    const classes = useStyles();
    const [value, setValue] = useState('');

    const handleChange = e => setValue(e.target.value)

    return(
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Language
                </InputLabel>
                <Select
                    onChange={handleChange}>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {languageOption.map(({index,value,label}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select the Language for the assignment</FormHelperText>
            </FormControl>
        </div>
    )
}
