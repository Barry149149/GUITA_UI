import React, {useState, useReducer} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import SettingDialog from "./dialog/SettingDialog";
import GuideTour from "./guideTour";
import clsx from 'clsx';
import SubmitConfirmDialog from "./dialog/SubmitCofirm";
import SubmitWarningDialog from "./dialog/SubmitWarning";
import DrawerTab from "./tab/drawerTab";
import PanelsContainer from "./tab/tabpanels/drawerPanels/panelsContainer";
import TablePanel from "./tab/tabpanels/contentPanels/TablePanel";
import JsonEditorPanel from "./tab/tabpanels/contentPanels/JsonEditorPanel";
import GuitaAppBar from "./GuitaAppBar";
import Paper from "@material-ui/core/Paper";
import ResultTable from "./resultTable/ResultTable";
import Container from "@material-ui/core/Container";

const drawerWidth = 360;

function stateReducer(state, action){
  const {past, present, future} = state;

  switch (action.type) {
    case 'UNDO':
      const previous=past[past.length-1]
      const newPast=past.slice(0,past.length-1)
      return{
        past:newPast,
        present:previous,
        future:[present,...future]
      }
    case 'REDO':
      const next=future[0]
      const newFuture=future.slice(1)
      return{
        past: [...past,present],
        present: next,
        future: newFuture
      }
    default:
      if(present===action.data) return state
        return{
          past: [...past, present],
          present: action.data,
          future:[]
        }
  }

}

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
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
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
  drawer_button:{
    display: 'flex',
    minWidth: 30,
    width: 30,
  },
  resultContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: 800
  },
  resultPaper:{
    height:'100%'
  }
}));

export default function Editor() {

  const classes = useStyles();

  //this is for the test case management
  const [config,setConfig] = useState({
    driver:'',
    language:'',
    framework:'',
    assignment_id:'',
    assignments:'', //submission batch
    assignmentsName: '',
  });

  const [state ,dispatch]=useReducer(stateReducer,{
    past:[],
    present:{
      tree:[
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
      ],
      selectedCase:{
        id:1,
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
      createdCases: 1,
      noOfCases:1
    },
    future:[]
  })

  //this is for the open of the corresponding entry
  const [settingsOpen,setSettingsOpen] = useState(false);
  const [formOpen,setFormOpen] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(false);

  //this is for the editor
   const [style, setStyle] = useState({
    darkTheme: true,
    fontSize: 14,
  })

  const [tabValue, setTabValue] = useState(0);


  const [drawerValue, setDrawerValue] = useState(-1);

  const [guideRun,setGuideRun] = useState(true);

  const handleDrawerChange = (event, newValue) => {
    if(drawerValue===newValue){
      setDrawerOpen(!drawerOpen)
    }else{
      setDrawerOpen(true)
    }

    setDrawerValue(newValue);
  };

  const [submitConfirm, setSubmitConfirm]= useState(false);
  const [submitWarning, setSubmitWarning]= useState(false);
  const [fileName, setFileName] = useState({
    name: [],
  });

  //this is for course management
  const [courseList, setCourseList]= useState([]);

  //this is for result page
  const [resultData, setResultData]= useState({
    // semester: null,
    // courseName: null,
    // assignment: null,
    taskNumber: null,
    jobBatch: null,
    result: [],
  });

  //this is for zip submission
  const handleSubmit = () => {
    if (config.driver && config.language && config.framework) {
      const name = [];
      for(let index=0;index<state.present.tree[0].nodes.length;index++){
        name.push(state.present.tree[0].nodes[index].value);
      }
      console.log(name);
      setFileName({
        ...fileName,
        name: name,
      });
      console.log(fileName.name);
      setSubmitConfirm(true);
    } else{
      setSubmitWarning(true);
    }
  }

  function uploadFile(){
    let fData = new FormData();

    fData.append('driver', config.driver);
    fData.append('language', config.language);
    fData.append('framework',config.framework);

    const name = [];
    for(let index=0;index<state.present.tree[0].nodes.length;index++){
      name.push(state.present.tree[0].nodes[index].value);
      const fileData = JSON.stringify(state.present.tree[0].nodes[index].json);
      const blob = new Blob([fileData],{type:'application/json'});
      fData.append('testcases[]',blob, 'testcase'+state.present.tree[0].nodes[index].id+'.json');
    }
    console.log(name);
    setFileName({
      ...fileName,
      name: name,
    });
    console.log(fileName.name);
    fData.append('submission_file', config.assignments);
    

    // (MOVED TO CourseTree)This is for assignment create
    /*
    //fetch('/api/v2/assignment', {transports: ['websocket']}, {
      fetch('/api/v2/assignment', {
        method: 'POST',
        body: JSON.stringify({"assignment_name": config.assignmentsName}),
        headers: {
          'content-type': 'application/json'
        }
      }).then(result => console.log(result)).catch(error => console.log(error));
    */

    // This is for testcase create
    const tData = new FormData();
    for(let index=0;index<state.present.tree[0].nodes.length;index++){
      name.push(state.present.tree[0].nodes[index].value);
      tData.append('testcase_name', 'testcase'+state.present.tree[0].nodes[index].id);
      const fileData = JSON.stringify(state.present.tree[0].nodes[index].json);
      const blob = new Blob([fileData],{type:'application/json'});
      tData.append('testcase_file',blob, 'testcase'+state.present.tree[0].nodes[index].id+'.json');
    }

    
    fetch('/api/v2/assignment/'+config.assignment_id+'/testcase', {
      method: 'POST',
      body: tData,
    }).then(result => console.log(result)).catch(error => console.log(error));
    
    // This is for submission zip
    let aData = new FormData();
    aData.append('submission_file', config.assignments);

    fetch('/api/v2/assignment/'+config.assignment_id+'/submission_batch', {
      method: 'POST',
      body: aData,
    }).then(result => console.log(result)).catch(error => console.log(error));
  }

  //this is for tour guide
  function useTourStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const [
    tour,
    setTour
  ] = useTourStickyState(0, "tour");

  let guide;

  if(tour<1){
    guide= <GuideTour
      drawerValue={drawerValue}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      setDrawerValue={setDrawerValue}
      setTabValue={setTabValue}
      setFormOpen={setFormOpen}
      setRun={setGuideRun}
      tour={tour}
      setTour={setTour}
      run={guideRun}
    />;
  }

  return (
    <div className={classes.root}>
      {guide}
      <CssBaseline />
      <GuitaAppBar
          classes={classes}
          state={state}
          handleSubmit={handleSubmit}
          dispatch={dispatch}
          setSettingsOpen={setSettingsOpen}
          setGuideRun={setGuideRun}
          setTour={setTour}
      />
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
        <div className={classes.drawerContainer} >
          <div id='Drawer'>
              <Box p={4}/>
              <DrawerTab
                  drawerValue={drawerValue}
                  handleDrawerChange={handleDrawerChange}
                  classes={classes}
              />
          </div>
              <div style={{width:240}}>
                {(drawerOpen)?
                    <PanelsContainer
                        drawerValue={drawerValue}
                        config={config}
                        setConfig={setConfig}
                        state={state}
                        resultData={resultData}
                        setResultData={setResultData}
                        tabValue={tabValue}
                        setTabValue={setTabValue}
                        dispatch={dispatch}
                    />
                  :null}
              </div>
          </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {(drawerValue === 3)?
            <Container className={classes.resultContainer}>
              {(resultData.jobBatch)?
                  <Paper className={classes.resultPaper}>
                    <ResultTable
                        resultData={resultData}
                        setResultData={setResultData}
                    />
                  </Paper>:null}
            </Container>
            :
            <React.Fragment>
              <JsonEditorPanel
                  classes={classes}
                  tabValue={tabValue}
                  style={style}
                  state={state}
                  dispatch={dispatch}
              />
              <TablePanel
                  tabValue={tabValue}
                  formOpen={formOpen}
                  state={state}
                  setFormOpen={setFormOpen}
                  dispatch={dispatch}
              />
            </React.Fragment>
            }
          <SettingDialog
              open={settingsOpen}
              setOpen={setSettingsOpen}
              style={style}
              setStyle={setStyle}
          />
          <SubmitConfirmDialog
              submitConfirm={submitConfirm}
              setSubmitConfirm={setSubmitConfirm}
              uploadFile={uploadFile}
              fileName={fileName}
          />
          <SubmitWarningDialog
              submitWarning={submitWarning}
              setSubmitWarning={setSubmitWarning}
          />
      </main>
    </div>
  );
}
