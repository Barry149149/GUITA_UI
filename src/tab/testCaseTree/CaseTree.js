import React from 'react';
import MuiTreeView from 'material-ui-treeview';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";
import JSZip from 'jszip'
import { saveAs } from 'file-saver';

const styleSmallText={
    fontSize: 'small',
    color: 'gainsboro',
    lineHeight: 0.8,
}

export default function CaseTree(props){
    const [open, setOpen]= React.useState(false);
    const [warningOpen, setWarningOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleWarningOpen=()=>{
        if(props.tree[0].nodes.length<=1){
            setWarningOpen(true)
        }
        else {
            setOpen(true);
        }
    };

    const handleConfirmOpen=()=>{
        setConfirmOpen(true);
    }

    const handleWarningClose=()=>{
        setWarningOpen(false)
    }


    const handleClose=()=>{
        setOpen(false);
    }

    const handleConfirmClose=()=>{
        setConfirmOpen(false);
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
            <Button
                variant= 'outlined'
                color= 'primary'
                fullWidth={true}
                onClick={()=>{
                    var zip = new JSZip();
                    for(const index in props.tree[0].nodes){
                        //const fileData = JSON.stringify(props.tree[0].nodes[props.selectedCase-1].json);
                        const fileData = JSON.stringify(props.tree[0].nodes[index].json);
                        //zip.file('testcase'+props.selectedCase+'.json', fileData);
                        zip.file('testcase'+props.tree[0].nodes[index].id+'.json', fileData);
                    }
                    zip.generateAsync({type:"blob"})
                    .then(function(content) {
                        // see FileSaver.js
                        saveAs(content, "testcases.zip");
                    });
                    //const blob = new Blob([fileData], {type: "text/plain"});
                    //const url = URL.createObjectURL(blob);
                    //const link = document.createElement('a');
                    //link.download = 'testcase'+props.selectedCase+'.json';
                    //link.href = url;
                    //link.click();
                }
                }>
                Download
            </Button>
            <Button
                variant= 'outlined'
                component='label'
                color= 'primary'
                fullWidth={true}
                // TODO: 1. Open confirm window 2. Get input file 3. Extract file 4. Copy to test case
                onClick={()=>{
                    const fs = require('fs');
                    
                }
                }
                >
                Open
                <input
                    type='file'
                    // TODO: Chrome accept also i.e. pptx, docx, xlsx, other browsers work fine
                    accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                    hidden
                />
            </Button>
            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
            >
                <DialogTitle>{"Confirm Open Test Case"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The following file(s) will be open:
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleConfirmClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                        
                            onClick={handleConfirmClose}
                            color="primary"
                            autofocus
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
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
