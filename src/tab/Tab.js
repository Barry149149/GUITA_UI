import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FrameworkSelect from './selectionBars/FrameworkSelect';
import DriverSelect from './selectionBars/DriverSelect';
import LanguageSelect from './selectionBars/LanguageSelect'
import CaseTree from './testCaseTree/CaseTree';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CaseAndConfigTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Configuration" {...a11yProps(0)} />
                    <Tab label="Test Cases" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>
                    <LanguageSelect/>
                    <FrameworkSelect/>
                    <DriverSelect/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CaseTree
                    selectedCase={props.selectedCase}
                    setSelectedCase={props.setSelectedCase}
                    tree={props.tree}
                    setTree={props.setTree}
                    createdCases={props.createdCases}
                    setCreatedCases={props.setCreatedCases}
                    noOfCases={props.noOfCases}
                    setNoOfCases={props.setNoOfCases}
                />
            </TabPanel>
        </div>
    );
}
