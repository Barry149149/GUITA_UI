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
    </TabPanel>
    )
}