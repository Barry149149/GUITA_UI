import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingDialog from "./SettingDialog";
import SettingsIcon from "@material-ui/icons/Settings";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodeIcon from '@material-ui/icons/Code';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import CommandTable from "./commandTable/CommandTable";
import CommandForm from "./commandTable/commandForm/commandForm";
import JsonEditor from "./jsonEditor/jsonEditor";
import Tooltip from "@material-ui/core/Tooltip";
import GuideTour from "./guideTour";
import LanguageSelect from "./tab/selectionBars/LanguageSelect";
import FrameworkSelect from "./tab/selectionBars/FrameworkSelect";
import DriverSelect from "./tab/selectionBars/DriverSelect";
import CaseTree from "./tab/testCaseTree/CaseTree";
import ListAltIcon from '@material-ui/icons/ListAlt';
import TuneIcon from '@material-ui/icons/Tune';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Divider} from "@material-ui/core";
import TabIcon from '@material-ui/icons/Tab';
import TableChartIcon from '@material-ui/icons/TableChart';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Title from './Title';

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: 100,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#dcdcdc',
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  tab:{
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    minWidth: 60,
    width: 60,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: 600
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Editor() {

  const classes = useStyles();

  //this is for the test case management
  const [config,setConfig] = useState({
    driver:'',
    language:'',
    framework:'',
  });

  const [tree,setTree] = useState([
    {
      value: 'Test Cases',
      nodes: [
        {id:1,
          value: 'Test 1',
          json: [
                {
                  "command": 'Test 1'
                }
              ],
          json_id:[
                  {
                    id:1,
                    command:{
                      "command":'Test1'
                    }
                  }
          ]
          },
      ],
    },
  ]);


  const [selectedCase,setSelectedCase] = useState({
    id:1,
    json:tree[0].nodes[0].json,
    json_id:tree[0].nodes[0].json_id
  });
  const [createdCases,setCreatedCases] = useState(1);
  const [noOfCases,setNoOfCases] = useState(1);

  //this is for the open of the corresponding entry
  const [settingsOpen,setSettingsOpen] = useState(false);
  const [formOpen,setFormOpen] = useState(false);
  const [drawerOpen,setDrawerOpen]=useState(false);

  //this is for the editor
   const [style, setStyle]= useState({
    darkTheme: true,
    fontSize: 14,
  })

  const [tabValue, setTabValue] = useState(0);
  const [cmdSchema,setCmdSchema]=useState({
    command:'None',
    schema: {
      "type":"object",
    },
    formData:''
  })
  const [formData,setFormData]=useState({})

  const [drawerValue, setDrawerValue] = React.useState(0);

  const handleDrawerChange = (event, newValue) => {
    if(drawerValue===newValue){
      setDrawerOpen(!drawerOpen)
    }else{
      setDrawerOpen(true)
    }
    setDrawerValue(newValue);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <GuideTour/>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            GUITA Test Case Creator \ Test Case \ Test {selectedCase.id}
          </Typography>

          <IconButton color="inherit" onClick={()=>{setSettingsOpen(true)}} id='button_setting'>
            <SettingsIcon/>
          </IconButton>
          <SettingDialog
              open={settingsOpen}
              setOpen={setSettingsOpen}
              style={style}
              setStyle={setStyle}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >

        <div className={classes.drawerContainer} id='Drawer'>
          <div>
            <Box p={4}/>
              <Tabs
                  value={drawerValue}
                  onChange={handleDrawerChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  orientation="vertical"
                  className={classes.tab}

              >
                <Tab
                    aria-labelledby='tab_config'
                    className={classes.tab}
                    icon={<TuneIcon color='primary'/>}
                    {...a11yProps(0)}
                />
                <Tab
                    aria-labelledby='tab_cases'
                    className={classes.tab}
                    icon={<ListAltIcon color='primary'/>}
                    {...a11yProps(1)}
                />
                <Tab
                    aria-labelledby='tab_editorMode'
                    className={classes.tab}
                    icon={<TabIcon color='primary'/>}
                    {...a11yProps(2)}
                />
              </Tabs>
          </div>
              <div>
                <Box p={3}/>
                <TabPanel
                    id="tabPanel_config"
                    value={drawerValue}
                    index={0} >
                  <Title>Configuration</Title>
                  <Divider/>
                  <div>
                    <LanguageSelect
                        config={config}
                        setConfig={setConfig}
                    />
                    <FrameworkSelect
                        config={config}
                        setConfig={setConfig}
                    />
                    <DriverSelect
                        config={config}
                        setConfig={setConfig}
                    />
                  </div>
                </TabPanel>
                <TabPanel
                    id="tabPanel_caseTree"
                    value={drawerValue}
                    index={1}>
                  <Title>Case Tree</Title>
                  <Divider/>
                  <CaseTree
                      selectedCase={selectedCase}
                      setSelectedCase={setSelectedCase}
                      tree={tree}
                      setTree={setTree}
                      createdCases={createdCases}
                      setCreatedCases={setCreatedCases}
                      noOfCases={noOfCases}
                      setNoOfCases={setNoOfCases}
                  />
                </TabPanel>
                <TabPanel
                    id="tabPanel_codeEditor"
                    value={drawerValue}
                    index={2}
                >
                  <Title>Editor Mode</Title>
                  <Divider/>
                  <Container>
                  <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      indicatorColor="inherit"
                      orientation="vertical"
                      centered={true}
                  >
                    <Tab
                        id="tab_codeEditor"
                        icon={<CodeIcon/>}
                        label="Code Editor"
                        {...a11yProps(0)}
                    />
                    <Tab
                        id="tab_tableView"
                        icon={<TableChartIcon />}
                        label="Table View"
                        {...a11yProps(1)}
                    />
                  </Tabs>
                  </Container>
                </TabPanel>
              </div>
          </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid  container spacing={0} justify='centered' style={{height:"93%"}}>
          <Grid xs={(drawerOpen)?12:12}>
            <TabPanel value={tabValue} index={0}>
              <Grid  container spacing={2} justify='center' alignItems="stretch">
                <Grid className={classes.container} xs={10} id="jsonEditor" >
                  <JsonEditor
                      selectedCase={selectedCase}
                      setSelectedCase={setSelectedCase}
                      style={style}
                      setTree={setTree}
                      tree={tree}
                  />
                </Grid>
              </Grid>
            </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={1} justify='center'>
            <Grid item xs={(formOpen)?8:12}>
              <div id="commandTable">
                <CommandTable
                    selectedCase={selectedCase}
                    setSelectedCase={setSelectedCase}
                    formOpen={formOpen}
                    setFormOpen={setFormOpen}
                    tree={tree}
                    setTree={setTree}
                />
              </div>
            </Grid>
            {(formData)?
              <Grow in={formOpen} timeout={(formOpen) ? 1000 : 0}>
                <Grid item xs={(formOpen) ? 4 : 1}>
                  <Paper id="commandForm">
                    <Box pt={1}/>
                    <Tooltip title="Close" style={{float: "right"}}>
                      <Button onClick={() => {
                        setFormOpen(false)
                      }} variant='small'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                          <path
                              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                        </svg>
                      </Button>
                    </Tooltip>
                    <CommandForm
                        selectedCase={selectedCase}
                        setSelectedCase={setSelectedCase}
                        cmdSchema={cmdSchema}
                        setCmdSchema={setCmdSchema}
                        setTree={setTree}
                        tree={tree}
                        formData={formData}
                        setFormData={setFormData}
                    />
                  </Paper>
                </Grid>
              </Grow>:null
            }
          </Grid>
        </TabPanel>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}