import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import React from "react";
import TabPanel from "../Tabpanel";
import CourseSelect from "../../selectionBars/CourseSelect";
import Box from "@material-ui/core/Box";

export default function ResultPanel(props){
    return (
    <TabPanel
        id="tabPanel_config"
        value={props.drawerValue}
        index={3} >
        <Title>Results</Title>
        <Divider/>
        <Box pt={1}/>
        <div>
            <CourseSelect />
        </div>
    </TabPanel>
    )
}