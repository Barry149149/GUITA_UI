import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import React, {useState} from "react";
import TabPanel from "../Tabpanel";
import CourseTree from "../../selectionBars/configSelect/ConfigCourse";
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

export default function Configuration(props){

    const classes = useStyles();

    const [file, setFile] = useState({
        name: '',
    });

    return (
    <TabPanel
        id="tabPanel_config"
        value={props.drawerValue}
        index={0} >
        <Title>Configuration</Title>
        <Divider/>
        <br/>
        <CourseTree
            config={props.config}
            setConfig={props.setConfig}
        />
        <Box pt={3} />
        <div style={{height:50, paddingLeft:8}}>
            <TextField
                size="small"
                className={classes.readOnlyBox}
                label=""
                value={file.name}
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
                        props.setConfig({
                            ...props.config,
                            assignments: e.target.files[0],
                            assignmentsName: e.target.files[0].name,
                        });

                        setFile({
                            ...file,
                            name: e.target.files[0].name,
                        });
                        e.target.value=null;
                    }
                    }
                />
            </Button>
            <p style={{fontSize:12, color:'#888888'}}> Upload the Student Submission </p>
        </div>
    </TabPanel>
    )
}