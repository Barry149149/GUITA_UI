import Tabs from "@material-ui/core/Tabs";
import Tooltip from "@material-ui/core/Tooltip";
import Tab from "@material-ui/core/Tab";
import TuneIcon from "@material-ui/icons/Tune";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TabIcon from "@material-ui/icons/Tab";
import DescriptionIcon from "@material-ui/icons/Description";
import PublishIcon from '@material-ui/icons/Publish';
import HomeIcon from '@material-ui/icons/Home';
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



export default function DrawerTab(props){
    const {drawerValue, handleDrawerChange,classes}=props
    return(
        <List
            component="nav"
            variant="fullWidth"
            orientation="vertical"
        >
                <ListItem
                    aria-labelledby='tab_submit'
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===0}
                    aria-checked={drawerValue===0}
                    onClick={(event)=>{handleDrawerChange(event,0)}}
                    >
                    <ListItemText color="primary" primary="HomePage" />
                </ListItem>
                <ListItem
                    aria-labelledby='tab_submit'
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===1}
                    aria-checked={drawerValue===1}
                    onClick={(event)=>{handleDrawerChange(event,1)}}
                >
                    <ListItemText primary="TestCase" />
                </ListItem>
                <ListItem
                    aria-labelledby='tab_submit'
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===2}
                    aria-checked={drawerValue===2}
                    onClick={(event)=>{handleDrawerChange(event,2)}}
                >
                    <ListItemText primary="JobConfig" />
                </ListItem>
                <ListItem
                    aria-labelledby='tab_submit'
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===3}
                    aria-checked={drawerValue===3}
                    onClick={(event)=>{handleDrawerChange(event,3)}}
                >
                    <ListItemText primary="Result" />
                </ListItem>

        </List>

    )
}