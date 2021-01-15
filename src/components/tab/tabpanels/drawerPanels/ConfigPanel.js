import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import LanguageSelect from "../../selectionBars/LanguageSelect";
import FrameworkSelect from "../../selectionBars/FrameworkSelect";
import DriverSelect from "../../selectionBars/DriverSelect";
import React from "react";
import TabPanel from "../Tabpanel";

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
        </div>
    </TabPanel>
    )
}