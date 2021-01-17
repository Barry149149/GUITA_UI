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
import {makeStyles} from '@material-ui/core/styles';
import { ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles({
    button_container: {
        width:260
    }
});



export default function CaseTree(props){
    const classes = useStyles();

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
            <div id="caseTree">
            <MuiTreeView
                tree={props.tree}
                onLeafClick={e=>{props.setSelectedCase({
                    ...props.selectedCase,
                    id: e.id,
                    json: props.tree[0].nodes.find(x=>x.id===e.id).json,
                    json_id: props.tree[0].nodes.find(x=>x.id===e.id).json_id,
                })}}
            />
            </div>
            <ButtonGroup
                className={classes.button_container}
                id= 'button_caseTree'
                fullWidth={true}
                orientation='vertical'
            >
            <Box pt={4} />
            <Button
                id= 'button_add'
                variant= 'outlined'
                color= 'primary'
                fullWidth={true}
                onClick={()=>{
                    props.tree[0].nodes.push({
                        id: (props.createdCases+1),
                        value: 'Test ' + (props.createdCases+1),
                        json:[{
                            "command": "Test "+(props.createdCases+1)
                        }],
                        json_id:[{
                            id:1,
                            command: {
                                "command": "Test " + (props.createdCases + 1)
                            }
                        }]
                    });
                    props.setCreatedCases(props.createdCases+1);
                    props.setNoOfCases(props.noOfCases+1)

                    props.setSelectedCase({
                        ...props.selectedCase,
                        id: props.tree[0].nodes[props.tree[0].nodes.length-1].id,
                        json: props.tree[0].nodes[props.tree[0].nodes.length-1].json,
                        json_id: props.tree[0].nodes[props.tree[0].nodes.length-1].json_id,
                    })
                }
                }>Add</Button>
            <Button
                id= 'button_delete'
                variant= 'outlined'
                color= 'primary'
                fullWidth={true}
                onClick={handleWarningOpen}>
                Delete
            </Button>
            <Button
                id= 'button_download'
                variant= 'outlined'
                color= 'primary'
                fullWidth={true}
                onClick={()=>{
                    const zip = new JSZip();
                    console.log(props.tree[0].nodes[0].json);
                    for(const index in props.tree[0].nodes){
                        const fileData = JSON.stringify(props.tree[0].nodes[index].json);
                        zip.file('testcase'+props.tree[0].nodes[index].id+'.json', fileData);
                    }
                    zip.generateAsync({type:"blob"})
                    .then(function(content) {
                        saveAs(content, "testcases.zip");
                    });
                }
                }>
                Download
            </Button>
            <Button
                id= 'button_upload'
                variant= 'outlined'
                component='label'
                color= 'primary'
                fullWidth={true}
                onClick={()=>{}}
                >
                Upload
                <input
                    type='file'
                    id='file'
                    name='file'
                    accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                    // TODO: Chrome accept also i.e. pptx, docx, xlsx, other browsers work fine
                    hidden

                    onChange={(e)=>{
                        const promises = [];

                        JSZip.loadAsync(e.target.files[0]).then(function (zip) {
                            
                            zip.forEach(function (relativePath, zipEntry){
                                promises.push(zip.file(zipEntry.name).async('string'));
                            });

                            Promise.all(promises).then(function (data) {
                                
                                let newNodes=[
                                    ...props.tree[0].nodes,
                                ]
                                console.log(data.length);
                                console.log(props.createdCases);
                                let last_jsObject=[];
                                let last_new_json_id =[];
                                
                                for(const i in data){
                                    
                                    const jsObject = JSON.parse(data[i]);
                                    console.log(jsObject);

                                    let new_json_id=[];
                                    for(let j=0;j<jsObject.length;j++) {
                                        new_json_id.push({
                                            id:(j+1),
                                            command:jsObject[j],
                                        })
                                    }

                                    newNodes.push({
                                        id: (props.createdCases+parseInt(i)+1),
                                        value: 'Test ' + (props.createdCases+parseInt(i)+1),
                                        json:jsObject,
                                        json_id:new_json_id,
                                    });

                                    last_jsObject = jsObject;
                                    last_new_json_id = new_json_id;
                                }
                                props.setTree([
                                    {
                                        value: 'Test Cases',
                                        nodes: newNodes
                                    }
                                ])
                                props.setCreatedCases(props.createdCases+data.length);
                                props.setNoOfCases(props.createdCases+data.length);

                                props.setSelectedCase({
                                    ...props.selectedCase,
                                    json: last_jsObject,
                                    json_id: last_new_json_id,
                                })
                            }, function(err){
                            })
                        });
                        e.target.value = null;
                    }
                    }
                />
                
            </Button>
            </ButtonGroup>
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
                        Are you sure you want to delete this {props.selectedCase.id}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{
                        for(let i=0; i < props.tree[0].nodes.length; i++) {

                            if(props.tree[0].nodes[i].id===props.selectedCase.id){
                                props.tree[0].nodes.splice(i,1);
                                i--;
                                props.setNoOfCases(props.noOfCases-1)
                            }
                        }

                        props.setSelectedCase({
                            ...props.selectedCase,
                            id:props.tree[0].nodes[0].id,
                            json:props.tree[0].nodes[0].json,
                            json_id:props.tree[0].nodes[0].json_id
                        });
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



        </div>

    )
}

/*
*     <p style={styleSmallText}>Selected Case is {props.selectedCase}</p>
            <p style={styleSmallText}>No. of Created Test Cases: {props.createdCases}</p>
            <p style={styleSmallText}>No. of Test Cases: {props.noOfCases}</p>
* */
