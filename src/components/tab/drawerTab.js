import Tabs from "@material-ui/core/Tabs";
import Tooltip from "@material-ui/core/Tooltip";
import Tab from "@material-ui/core/Tab";
import TuneIcon from "@material-ui/icons/Tune";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TabIcon from "@material-ui/icons/Tab";
import DescriptionIcon from "@material-ui/icons/Description";
import PublishIcon from '@material-ui/icons/Publish';
import HomeIcon from '@material-ui/icons/Home';
import React,{useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";



export default function DrawerTab(props){
    const {drawerValue,classes}=props
    const location=useLocation()

    useEffect(()=>{
        console.log(location)
    })
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <List
            component="nav"
            variant="fullWidth"
            orientation="vertical"
        >

                <ListItem
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===0}
                    aria-checked={drawerValue===0}
                    selected={location.pathname=='/'}
                    component={Link}
                    to={'/'}
                    >
                    <ListItemText color="primary" primary="HomePage" />
                </ListItem>
                <ListItem
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===1}
                    aria-checked={drawerValue===1}
                    selected={location.pathname=='/testcase'}
                    component={Link}
                    to={'/testcase'}
                >
                    <ListItemText primary="TestCase" />
                </ListItem>
                <ListItem
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===2}
                    aria-checked={drawerValue===2}
                    selected={location.pathname=='/config'}
                    component={Link}
                    to={'/config'}
                >
                    <ListItemText primary="JobConfig" />
                </ListItem>
                <ListItem
                    button
                    className={{root:classes.tab2, selected: classes.selected}}
                    selected={drawerValue===3}
                    aria-checked={drawerValue===3}
                    selected={location.pathname=='/result'}
                    component={Link}
                    to={'/result'}
                >
                    <ListItemText primary="Result" />
                </ListItem>
        </List>
        </nav>

    )
}