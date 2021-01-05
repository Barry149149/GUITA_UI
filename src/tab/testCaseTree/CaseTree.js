import React from 'react';
import MuiTreeView from 'material-ui-treeview';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";

const styleSmallText={
    fontSize: 'small',
    color: 'gainsboro',
    lineHeight: 0.8,
}

export default function CaseTree(props){
    const [open, setOpen]= React.useState(false);
    const [warningOpen, setWarningOpen] = React.useState(false)

    const handleWarningOpen=()=>{
        if(props.tree[0].nodes.length<=1){
            setWarningOpen(true)
        }
        else {
            setOpen(true);
        }
    };

    const handleWarningClose=()=>{
        setWarningOpen(false)
    }


    const handleClose=()=>{
        setOpen(false);
    }

    return (
        <div>
            <MuiTreeView
                tree={props.tree}
                onLeafClick={e=>{props.setSelectedCase(e.id)}}
            />
            <Box pt={4} />
            <Button
                variant= 'outlined'
                color= 'primary'
                fullWidth={true}
                onClick={()=>{
                    props.tree[0].nodes.push({
                        id: (props.createdCases+1),
                        value: 'Test ' + (props.createdCases+1),
                        json:[{
                            "command": "Test "+(props.createdCases+1)
                        }]
                    });
                    props.setCreatedCases(props.createdCases+1);
                    props.setNoOfCases(props.noOfCases+1)
                }
                }>Add</Button>
            <Button
                variant= 'outlined'
                color= 'primary'
                fullWidth={true}
                onClick={handleWarningOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Are you sure you want to delete this {props.selectedCase}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        for(let i=0; i < props.tree[0].nodes.length; i++) {

                            if(props.tree[0].nodes[i].id===props.selectedCase){
                                props.tree[0].nodes.splice(i,1);
                                i--;
                                props.setNoOfCases(props.noOfCases-1)
                            }
                        }
                        props.setSelectedCase(props.tree[0].nodes[0].id);
                        handleClose();
                    }}
                            color="secondary"
                            autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={warningOpen}
                onClose={handleClose}
            >
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        You cannot delete the last test case
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleWarningClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <p style={styleSmallText}>Selected Case is {props.selectedCase}</p>
            <p style={styleSmallText}>No. of Created Test Cases: {props.createdCases}</p>
            <p style={styleSmallText}>No. of Test Cases: {props.noOfCases}</p>


        </div>

    )
}
