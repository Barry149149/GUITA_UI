import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { languageOption } from '../../docs/data';
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

export default function LanguageSelect() {
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
                <InputLabel>
                    Language
                </InputLabel>
                <NativeSelect
                    value={state.age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-label-placeholder',
                    }}
                >
                    {languageOption.map(({index,value,label}) => {
                        return (
                            <option key={index} value={value}>
                                {label}
                            </option>
                        )
                    })
                    }
                </NativeSelect>
                <FormHelperText>Select the language for the assignment</FormHelperText>
            </FormControl>
        </div>
    )
}
