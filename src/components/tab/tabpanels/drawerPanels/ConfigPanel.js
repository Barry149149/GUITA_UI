import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import LanguageSelect from "../../selectionBars/LanguageSelect";
import FrameworkSelect from "../../selectionBars/FrameworkSelect";
import DriverSelect from "../../selectionBars/DriverSelect";
import React from "react";
import TabPanel from "../Tabpanel";
import Button from '@material-ui/core/Button';

export default function Configuration(props){
    return (
    <TabPanel
        id="tabPanel_config"
        value={props.drawerValue}
        index={0} >
        <Title>Configuration</Title>
        <Divider/>
        <div>
            <LanguageSelect
                config={props.config}
                setConfig={props.setConfig}
            />
            <FrameworkSelect
                config={props.config}
                setConfig={props.setConfig}
            />
            <DriverSelect
                config={props.config}
                setConfig={props.setConfig}
            />
            <Button
                id= 'button_upload'
                variant= 'outlined'
                component='label'
                color= 'primary'
                fullWidth={true}
                onClick={()=>{}}
                >
                Upload Student Assignments
                <input
                    type='file'
                    id='file'
                    name='file'
                    accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                    // TODO: Chrome accept also i.e. pptx, docx, xlsx, other browsers work fine
                    hidden

                    onChange={(e)=>{
                        props.setConfig({
                            ...props.config,
                            assignments: e.target.files[0],
                        });
                        e.target.value=null;
                        /*
                        const promises = [];

                        JSZip.loadAsync(e.target.files[0]).then(function (zip) {
                            props.setConfig({
                                ...props.config,
                                assignments: ,
                            });
                            
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
                        e.target.value = null;*/
                    }
                    }
                />
                
            </Button>
        </div>
    </TabPanel>
    )
}