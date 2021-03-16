import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TabPanel from "../Tabpanel";
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
    },
    detailBox:{
        width:260,
        maxWidth:260,
        minWidth:260,
    },
}))

export default function SubmitPanel(props){
    const {drawerValue, jobBatch, setJobBatch}= props

    const classes = useStyles();
    
    const [file, setFile] = useState({
        zip_filename: null,
        zip: null
    });

    return (
    <TabPanel
        id="tabPanel_submit"
        value={props.drawerValue}
        index={2} >
        <Title>Job Batch Submission</Title>
        <Divider/>
        <div style={{height:50, paddingLeft:8}}>
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
                Upload
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

                        setJobBatch({
                            ...jobBatch,
                            zip_filename: e.target.files[0].name
                        })
                        e.target.value=null;
                    }
                    }
                />
            </Button>
            <p style={{fontSize:12, color:'#888888'}}> Upload the Student Submission </p>
            <Box pt={3} />
            <TextField
                size="small"
                className={classes.detailBox}
                label=""
                value={jobBatch.assignment_name}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
                <br/>
            <TextField
                size="small"
                className={classes.detailBox}
                label=""
                value={jobBatch.job_config_name}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
                <br/>
            <TextField
                size="small"
                className={classes.detailBox}
                label=""
                value={jobBatch.zip_filename}
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
            />
                <br/>
            <Box pt={3} />
            <Button
                id= 'button_delete'
                variant= 'outlined'
                color= 'primary'
                width={200}
                onClick={()=>{}}>
                Submit Job Batch
            </Button>
        </div>
    </TabPanel>
    )
}