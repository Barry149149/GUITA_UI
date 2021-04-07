import Tabs from "@material-ui/core/Tabs";
import Tooltip from "@material-ui/core/Tooltip";
import Tab from "@material-ui/core/Tab";
import TuneIcon from "@material-ui/icons/Tune";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TabIcon from "@material-ui/icons/Tab";
import DescriptionIcon from "@material-ui/icons/Description";
import PublishIcon from '@material-ui/icons/Publish';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



export default function DrawerTab(props){
    const {drawerValue, handleDrawerChange,classes}=props
    return(
        <Tabs
            value={drawerValue}
            onChange={handleDrawerChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            orientation="vertical"
        >
            <Tooltip title="Job Submission" placement="right">
                <Tab
                    aria-labelledby='tab_submit'
                    className={classes.tab}
                    icon={<PublishIcon color='primary'/>}
                    />
            </Tooltip>
            <Tooltip title="Test Case" placement="right">
                <Tab
                    aria-labelledby='tab_cases'
                    className={classes.tab}
                    icon={<ListAltIcon color='primary'/>}
                />
            </Tooltip>
            <Tooltip title="Job Config" placement="right">
                <Tab
                    aria-labelledby='tab_config'
                    className={classes.tab}
                    icon={<TuneIcon color='primary'/>}
                />
            </Tooltip>
            <Tooltip title="Grading Result" placement="right">
                <Tab
                    aria-labelledby='tab_result'
                    className={classes.tab}
                    icon={<DescriptionIcon color='primary'/>}
                />
            </Tooltip>
        </Tabs>

    )
}