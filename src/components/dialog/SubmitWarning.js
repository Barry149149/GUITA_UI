import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";


export default function SubmitWarningDialog(props) {

    const handleSubmitWarningClose=()=>{
        props.setSubmitWarning(false);
    }

    return (
        <Dialog
            open={props.submitWarning}
            onClose={handleSubmitWarningClose}
        >
            <DialogTitle>{"Configuration Warning"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please make sure valid configuration
                </DialogContentText>
                <DialogActions>
                    <Button

                        onClick={handleSubmitWarningClose}
                        color="primary"
                        autofocus
                    >
                        Close
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}