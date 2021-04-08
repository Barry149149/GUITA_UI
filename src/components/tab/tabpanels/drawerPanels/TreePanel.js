import Title from "../../../Title";
import {ButtonGroup, Divider, Tooltip} from "@material-ui/core";
import CaseTree from "../../testCaseTree/CaseTree";
import TabPanel from "../Tabpanel";
import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import JSZip from "jszip";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import { saveAs } from 'file-saver';
import {Route} from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    readOnlyBox:{
        width:160,
        maxWidth:160,
        minWidth:160,
    },
    uploadButton:{
        height:40,
        overflowX:'hidden',
        overflow:'hidden',
    }
}))

export default function TreePanel(props){
    const classes = useStyles();

    const [file, setFile] = useState({
        zip_filename: null,
        zip: null
    });
    return (
        <Route path={'/testcase/'+props.pathid+'/'+props.pathname}>
            <Box p={3}>
            <Title>Test Cases</Title>
            <Divider/>
            <CaseTree
                selectedCase={props.selectedCase}
                tree={props.tree}
                createdCases={props.createdCases}
                noOfCases={props.noOfCases}
                dispatch={props.dispatch}/>
            <Box pt={3} />
            <div style={{
                position: 'absolute',
                bottom: 30,
                left: 150
            }}>
            <Button
                className={classes.uploadButton}
                id= 'button_upload'
                variant= 'outlined'
                component='label'
                color= 'primary'
                onClick={()=>{}}
            >
                Browse
                <input
                    type='file'
                    id='file'
                    name='file'
                    accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                    hidden

                    onChange={(e)=>{
                        setFile({
                            ...file,
                            zip_filename: e.target.files[0].name,
                            zip: e.target.files[0]
                        });
                        e.target.value=null;
                    }
                    }
                />
            </Button>
            <pr style={{fontSize:16, color:'#666666'}}>  {(file.zip_filename)?file.zip_filename:'No file selected'}</pr>
            <p style={{fontSize:12, color:'#888888'}}>
                Choose a Images ZIP for all test cases (optional)
            </p>
            <Box pt={1} />
                <Button
                    size="small"
                    id= 'button_upload'
                    variant='outlined'
                    component='label'
                    color= 'primary'
                    className={classes.uploadButton}
                    onClick={()=>{}}
                >
                    Upload test cases file
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
                </Button>
                <p style={{fontSize:12, color:'#888888'}}>Choose a Zip of Test Cases JSON from local</p>
                    <Button
                        className={classes.uploadButton}
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
                        Download Test Case File
                    </Button>
                <p style={{fontSize:12, color:'#888888'}}>Download a Zip of Test Cases JSON to local</p>
            </div>
            </Box>
        </Route>
    )
}