import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CaseAndConfigTab from "./tab/Tab";
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import SettingDialog from "./SettingDialog";
import SettingsIcon from "@material-ui/icons/Settings";
import UploadFiles from "./components/upload-files.component";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodeIcon from '@material-ui/icons/Code';
import ViewListIcon from '@material-ui/icons/ViewList';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import SchemaForm from 'jsonschema-form-for-material-ui';
import {commandList} from "./docs/commandList";
import {FormControl} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import {Select, MenuItem}from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

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
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    paddingTop: theme.spacing(1),
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#dcdcdc',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

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
    backgroundColor: theme.palette.background.paper,
    width: 200,

  },
  table:{
    '& > *': {
      borderBottom: 'unset',
      backgroundColor: '#FFFFFF',
      borderRadius: 1,
      boxShadow: '0 3px 3px 3px rgba(70, 70, 70, .3)',
      padding: '0 30px',
      tableLayout: 'fixed'
    },
  },
  formControl: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(2.5),
    minWidth: 120,
  },
  form:{
    minHeight: 200,
  }
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


function Row(props){
  const {row} =props;
  const [open ,setOpen] = useState(false);
  const classes = useStyles();

  return(
      <React.Fragment className={classes.table}>
        <TableRow >
          <TableCell width='30px'>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row"  align="left">
            {row.command}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{paddingBottom:0 ,paddingTop:0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h8" gutterBottom component="div">
                  Detail
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>WidgetName</TableCell>
                      <TableCell>widget</TableCell>
                      <TableCell>setVariable</TableCell>
                      <TableCell>valueLhs</TableCell>
                      <TableCell>valueRhs</TableCell>
                      <TableCell>time</TableCell>
                      <TableCell>value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">{(row.widgetName===undefined)?" ":row.widgetName}</TableCell>
                      <TableCell>{(row.widget===undefined)?" ":"Type: "+ row.widget.type+", Value: "+row.widget.value}</TableCell>
                      <TableCell>{(row.setVariable===undefined)?" ":row.setVariable}</TableCell>
                      <TableCell>{(row.valueLhs===undefined)?" ":"Type: "+row.valueLhs.type+", Value:"+row.valueLhs.value}</TableCell>
                      <TableCell>{(row.valueRhs===undefined)?" ":row.valueRhs}</TableCell>
                      <TableCell>{(row.time===undefined)?" ":row.time}</TableCell>
                      <TableCell>{(row.value===undefined)?" ":"Type: "+row.value.type+", Value:"+row.value.value}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
  )

}

export default function Editor() {

  const classes = useStyles();

  //this is for the test case management
  const [driver,setDriver] = useState('');
  const [language, setLanguage] = useState('');
  const [framework,setFramework] = useState('');

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
              ]
          },
      ],
    },
  ]);
  const [selectedCase,setSelectedCase] = useState(1);
  const [createdCases,setCreatedCases] = useState(1);
  const [noOfCases,setNoOfCases] = useState(1);

  //this is for the open of the corresponding entry
  const [settingsOpen,setSettingsOpen] = useState(false);

  //this is for the editor
  const [darkTheme, setDarkTheme]=useState(true);
  const [fontSize, setFontSize] = useState(14);

  const [tabValue, setTabValue] = React.useState(0);
  const [cmdSchema,setCmdSchema]=useState({
    command:'None',
    schema: {
      "type":"object",
    }
  })

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() =>{

  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            GUITA Test Case Creator \ Test Case \ Test {selectedCase}
          </Typography>
          <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="inherit"
          >
            <Tab icon={<CodeIcon fontSize='small'/>} label="Code Editor" fontSize='16px' {...a11yProps(0)} size="small" />
            <Tab icon={<ViewListIcon fontSize='small'/>} label="Table View" fontSize='16px' {...a11yProps(1)} />
          </Tabs>
          <IconButton color="inherit" onClick={()=>{setSettingsOpen(true)}}>
            <SettingsIcon/>
          </IconButton>
          <SettingDialog
              open={settingsOpen}
              setOpen={setSettingsOpen}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
              fontSize={fontSize}
              setFontSize={setFontSize}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <CaseAndConfigTab
            selectedCase={selectedCase}
            setSelectedCase={setSelectedCase}
            tree={tree}
            setTree={setTree}
            createdCases={createdCases}
            setCreatedCases={setCreatedCases}
            noOfCases={noOfCases}
            setNoOfCases={setNoOfCases}
            driver={driver}
            setDriver={setDriver}
            language={language}
            setLanguage={setLanguage}
            framework={framework}
            setFramework={setFramework}
          />
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>
            <TabPanel value={tabValue} index={0}>
                <JSONInput
                    id     = 'a_unique_id'
                    locale = { locale }
                    width  = "100%"
                    height = "550px"
                    placeholder = {tree[0].nodes.find(x=>x.id === selectedCase).json}
                    colors = {(darkTheme)?{
                      default: '#D4D4D4',
                      background: '#1E1E1E',
                      background_warning: '#1E1E1E',
                      string: '#CE8453',
                      number: '#B5CE9F',
                      colon: '#49B8F7',
                      keys: '#9CDCFE',
                      keys_whiteSpace: '#AF74A5',
                      primitive: '#6392C6'
                    }:
                    {
                      default: '#000000',
                      background: '#FFFFFF',
                      background_warning: '#FEECEB',
                      string: '#FA7921',
                      number: '#70CE35',
                      colon: '#49B8F7',
                      keys: '#59A5D8',
                      keys_whiteSpace: '#835FB6',
                      primitive: '#386FA4'
                    }
                    }
                    style = {{
                      body: {
                        fontSize: fontSize,
                        fontWeight: 800,
                      }
                    }}
                    onChange = {(e)=>{
                      if(!e.error) {
                        tree[0].nodes.find(x => x.id === selectedCase).json = e.jsObject;
                      }
                    }
                    }
                  />
              <Box pt={2}>
                <Copyright />
              </Box>
              <Box pt={4}>
                <UploadFiles />
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <div style={{ overflow: 'auto', height: '550px' }}>
              <Table className={classes.table} >
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell> Command </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tree[0].nodes.find(x => x.id === selectedCase).json.map(row=>(
                      <Row key={row.command} row={row}/>
                  ))}
                </TableBody>
              </Table>
              </div>
              <Box pt={1}></Box>
              <div  style={{ overflow: 'auto', height: '300px' , background:'#FFFFFF'}}>
                <FormControl className={classes.formControl}>
                  <InputLabel>
                    Command
                  </InputLabel>
                  <Select
                    onChange={e=>{
                      //Should be update through this onChange
                      setCmdSchema({
                        ...cmdSchema,
                          command: e.target.value,
                          schema: commandList.find(x => x.command === e.target.value).schema
                        });

                    }}
                    value={cmdSchema.command}
                  >
                    {commandList.map(({index,command})=>{
                      return(
                          <MenuItem key={index} value={command}>
                            {command}
                          </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
                <SchemaForm
                    classes={classes.form}
                    schema={cmdSchema.schema}
                    onSubmit={()=>{}}
                />
              </div>
            </TabPanel>
        </Container>
      </main>
    </div>
  );
}
