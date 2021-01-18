import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Slider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function SettingDialog(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.setOpen(false);
    };


    const handleChange = (event) => {
        props.setStyle({
            ...props.style,
            darkTheme:event.target.checked
        });
    };

    const handleTour = () => {
        props.setTour(0);
        props.setRun(false);
    }
    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle >Preference</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <p>font size: {props.style.fontSize}</p>
                        <Slider
                            value={props.style.fontSize}
                            valueLabelDisplay="auto"
                            onChange={(e, newValue)=>{props.setStyle({...props.style, fontSize:newValue})}}
                        />
                        <FormControlLabel
                            className={classes.formControlLabel}
                            control={<Switch checked={props.style.darkTheme} onChange={handleChange} />}
                            label={(props.style.darkTheme)?"Dark Theme":"Light Theme"}
                        />
                    </form>

                    <Button 
                        variant= 'outlined'
                        color= 'primary'
                        onClick={handleTour}
                    >
                        Reset Guide Tour
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
