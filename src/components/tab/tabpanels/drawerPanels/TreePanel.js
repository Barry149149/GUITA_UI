import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import CaseTree from "../../testCaseTree/CaseTree";
import TabPanel from "../Tabpanel";
import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField"
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme)=>({
    readOnlyBox:{
        width:160,
        maxWidth:160,
        minWidth:160,
    },
    uploadButton:{
        height:40,
        width:80,
        maxWidth:80,
        minWidth:80,
    }
}))

export default function TreePanel(props){
    const classes = useStyles();

    const [file, setFile] = useState({
        zip_filename: null,
        zip: null
    });
    return (
        <TabPanel
        id="tabPanel_caseTree"
        value={props.drawerValue}
        index={1}>
            <Title>Test Cases</Title>
            <Divider/>
            <Box pt={3} />
            <TextField
                size="small"
                className={classes.readOnlyBox}
                label=""
                value={file.zip_filename}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
            <Button
                className={classes.uploadButton}
                id= 'button_upload'
                variant= 'outlined'
                component='label'
                color= 'primary'
                onClick={()=>{}}
            >
                Select
                <input
                    type='file'
                    id='file'
                    name='file'
                    accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                    hidden

                    onChange={(e)=>{
                        //TODO: submit img zip
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
            <p style={{fontSize:12, color:'#888888'}}> Select the Image Zip (Applicable to all Test Cases)</p>
            
            
            <CaseTree
                selectedCase={props.selectedCase}
                tree={props.tree}
                createdCases={props.createdCases}
                noOfCases={props.noOfCases}
                dispatch={props.dispatch}
            />
        </TabPanel>
    )
}