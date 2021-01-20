import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import LanguageSelect from "../../selectionBars/LanguageSelect";
import FrameworkSelect from "../../selectionBars/FrameworkSelect";
import DriverSelect from "../../selectionBars/DriverSelect";
import React, {useState} from "react";
import TabPanel from "../Tabpanel";
import Button from '@material-ui/core/Button';


export default function Configuration(props){
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
                    hidden

                    onChange={(e)=>{
                        props.setConfig({
                            ...props.config,
                            assignments: e.target.files[0],
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
        </div>
        <label htmlFor='file'>{file.name}</label>
    </TabPanel>
    )
}