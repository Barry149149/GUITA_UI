import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import React from "react";
import TabPanel from "../Tabpanel";

export default function ResultPanel(props){
    return (
    <TabPanel
        id="tabPanel_config"
        value={props.drawerValue}
        index={3} >
        <Title>Assignments</Title>
        <Divider/>
        <div>
        </div>
    </TabPanel>
    )
}