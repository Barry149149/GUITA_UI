import React from 'react';
import MuiTreeView from 'material-ui-treeview';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {makeStyles} from '@material-ui/core/styles';
import { ButtonGroup, Divider } from '@material-ui/core';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton'
import {Tooltip} from "@material-ui/core";

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
            <Box pt={2}/>
            <ButtonGroup
                className={classes.button_container}
                id= 'button_caseTree'
                variant='outlined'
            >
            <Tooltip title="Add">
            <IconButton
                size="small"
                id= 'button_add'
                variant='outlined'
                color= 'primary'
                onClick={()=>{
                    props.dispatch({
                        data:{
                            tree:[
                                {
                                    value: 'Test Cases',
                                    nodes: [
                                        ...props.tree[0].nodes,
                                        {
                                            id: (props.createdCases+1),
                                            value: 'Test ' + (props.createdCases+1),
                                            json:[],
                                            json_id:[]
                                        }
                                    ]
                                }
                            ],
                            createdCases:props.createdCases+1,
                            noOfCases:props.noOfCases+1,
                            selectedCase:{
                                id: (props.createdCases+1),
                                json: [],
                                json_id: [],
                            },
                        }
                    })
                }
                }><AddIcon/></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
            <IconButton
                size="small"
                id= 'button_delete'
                variant='outlined'
                color= 'primary'
                onClick={handleWarningOpen}>
                <RemoveIcon/>
            </IconButton>
            </Tooltip>
            <Tooltip title="Download">
            <IconButton
                size="small"    
                id= 'button_download'
                variant='outlined'
                color= 'primary'
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
                <VerticalAlignBottomIcon/>
            </IconButton>
            </Tooltip>
            <Tooltip title="Upload">
            <IconButton
                size="small"
                id= 'button_upload'
                variant='outlined'
                component='label'
                color= 'primary'
                onClick={()=>{}}
                >
                <VerticalAlignTopIcon/>
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
                                let last_id=0

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

                                    last_id=i;
                                    last_jsObject = jsObject;
                                    last_new_json_id = new_json_id;
                                }

                                props.dispatch({
                                    data:{
                                        tree:[
                                            {
                                                value: 'Test Cases',
                                                nodes: newNodes
                                            }
                                        ],
                                        createdCases:props.createdCases+data.length,
                                        noOfCases:props.createdCases+data.length,
                                        selectedCase:{
                                            id:last_id,
                                            json: last_jsObject,
                                            json_id: last_new_json_id,
                                        },
                                    }
                                })
                            }, function(err){
                            })
                        });
                        e.target.value = null;
                    }
                    }
                />

            </IconButton>
            </Tooltip>
            </ButtonGroup>
            <Box id="caseTree">
            <MuiTreeView
                defaultExpanded
                tree={props.tree}
                onLeafClick={e=>{
                    if(e.id===props.selectedCase.id) return
                    props.dispatch({
                        data:{
                            tree: props.tree,
                            createdCases:props.createdCases,
                            noOfCases:props.noOfCases,
                            selectedCase:{
                                id: e.id,
                                json: props.tree[0].nodes.find(x=>x.id===e.id).json,
                                json_id: props.tree[0].nodes.find(x=>x.id===e.id).json_id,
                            }
                        }
                    })

                }}
            />
            </Box>

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
                        let newNodes=[...props.tree[0].nodes];
                        let newNoOfCases=props.noOfCases
                        for(let i=0; i < newNodes.length; i++) {
                            if(newNodes[i].id===props.selectedCase.id){
                                newNodes.splice(i,1);
                                i--;
                                newNoOfCases--
                            }
                        }
                        props.dispatch({
                            data:{
                                tree:[
                                    {
                                        value: 'Test Cases',
                                        nodes: newNodes
                                    }
                                ],
                                createdCases:props.createdCases,
                                noOfCases:newNoOfCases,
                                selectedCase:{
                                    id:props.tree[0].nodes[0].id,
                                    json:props.tree[0].nodes[0].json,
                                    json_id:props.tree[0].nodes[0].json_id
                                },
                            }
                        })
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

