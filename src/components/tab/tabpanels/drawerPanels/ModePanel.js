import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CodeIcon from "@material-ui/icons/Code";
import TableChartIcon from "@material-ui/icons/TableChart";
import TabPanel from "../Tabpanel";
import React from "react";
import GradeIcon from '@material-ui/icons/Grade';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function ModePanel(props){

    const handleChange = (event, newValue) => {
        props.setTabValue(newValue);
    };

    return (
        <TabPanel
            id="tabPanel_codeEditor"
            value={props.drawerValue}
            index={2}
        >
            <Title>Editor Mode</Title>
            <Divider/>
            <Container>
                <Tabs
                    value={props.tabValue}
                    onChange={handleChange}
                    indicatorColor="inherit"
                    orientation="vertical"
                    centered={true}
                >
                    <Tab
                        aria-label="tab_codeEditor"
                        icon={<CodeIcon/>}
                        label="Code Editor"
                        {...a11yProps(0)}
                    />
                    <Tab
                        aria-label="tab_tableView"
                        icon={<TableChartIcon />}
                        label="Table View"
                        {...a11yProps(1)}
                    />
                    <Tab
                        aria-label="tab_resultMode"
                        icon={<GradeIcon/>}
                        label="Grades"
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Container>
        </TabPanel>
    )
}