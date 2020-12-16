import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { frameworkOption } from '../../docs/data';
import NativeSelect from '@material-ui/core/NativeSelect';
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

export default function FrameworkSelect() {
        const classes = useStyles();
        const [state, setState] = React.useState({
            framework:''
        });

        const handleChange = (event) => {
            const name = event.target.name;
            setState({
                ...state,
                [name]: event.target.value,
            });
        };
        return(
        <div>
        <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
            Framework
        </InputLabel>
            <NativeSelect
                value={state.age}
                onChange={handleChange}
                inputProps={{
                     name: 'age',
                     id: 'age-native-label-placeholder',
                }}
                 >
                {frameworkOption.map(({index,value,label}) => {
                    return (
                        <option key={index} value={value}>
                            {label}
                        </option>
                    )
                })
                }
                 </NativeSelect>
              <FormHelperText>Select the framework for the assignment</FormHelperText>
            </FormControl>
        </div>
    )
}
