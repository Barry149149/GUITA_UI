import React, {useState} from 'react';
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
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
import UploadFiles from "./components/upload-files.component";
=======
>>>>>>> 2466b02bb5eec63024ba88de200dfb7471366588


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
}));

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
        {id:1, value: 'Test 1', json: {name: 'Test 1'} },
      ],
    },
  ]);
  const [selectedCase,setSelectedCase] = useState(1);
  const [createdCases,setCreatedCases] = useState(1);
  const [noOfCases,setNoOfCases] = useState(1);

  //this is for the open of the setting page
  const [settingsOpen,setSettingsOpen] = useState(false);

  //this is for the editor
  const [darkTheme, setDarkTheme]=useState(true);
  const [fontSize, setFontSize] = useState(14);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            GUITA Test Case Creator
          </Typography>
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
          <Box pt={4}>
            <Copyright />
          </Box>
          <Box pt={4}>
            <UploadFiles />
          </Box>
        </Container>
      </main>
    </div>
  );
}
