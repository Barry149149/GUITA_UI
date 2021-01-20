import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import {Divider} from "@material-ui/core";

export default function SubmitConfirmDialog(props){

    const handleSubmitConfirmClose=()=>{
        props.setSubmitConfirm(false);
    }

    return (
        <Dialog
            open={props.submitConfirm}
            onClose={handleSubmitConfirmClose}
        >
            <DialogTitle>{"Submission Confirm"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The following files will be submitted:
                    <Divider/>
                    {props.fileName.name}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleSubmitConfirmClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={()=>{
                            handleSubmitConfirmClose();
                            props.uploadFile();
                        }}
                        color="primary"
                        autofocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}