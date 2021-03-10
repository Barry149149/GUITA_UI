import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import React from "react";
import TabPanel from "../Tabpanel";
import Box from "@material-ui/core/Box";

export default function SubmitPanel(props){
    return (
    <TabPanel
        id="tabPanel_submit"
        value={props.drawerValue}
        index={2} >
        <Title>Job Batch Submission</Title>
        <Divider/>
    </TabPanel>
    )
}