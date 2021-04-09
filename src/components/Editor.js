import React, {useState, useReducer,useLayoutEffect, useEffect} from 'react';
import {lighten, makeStyles} from '@material-ui/core/styles';
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
import StageTable from "./stageTable/stageTable";
import Grid from "@material-ui/core/Grid"
import StageForm from "./stageTable/stageForm";
import Grow from "@material-ui/core/Grow";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CodeIcon from "@material-ui/icons/Code";
import TableChartIcon from "@material-ui/icons/TableChart";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import TabPanel from "./tab/tabpanels/Tabpanel";
import AssignmentTable from './submissionTable/AssignmentTable';
import JobConfigTable from './submissionTable/JobConfigTable';
import JobTable from './resultTable/JobTable';
import ReportTable from './resultTable/resultReport/ReportTable';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import StageSelect from './stageTable/stageSelect';
import {BrowserRouter as Router, Switch, Route, Link, useLocation} from 'react-router-dom';
import SubmitPanel from "./tab/tabpanels/drawerPanels/SubmitPanel";
import TreePanel from "./tab/tabpanels/drawerPanels/TreePanel";
import { useHistory } from 'react-router-dom'


const drawerWidth = 440;

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
    case 'SET':
      return{
        past:[],
        present: action.data,
        future: []
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
  toolbar2: {
    paddingLeft: 20,
    paddingRight: 24,
    backgroundColor:'#FFFFFF'// keep right padding when drawer closed
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
    width: theme.spacing(16) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(16) + 1,
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
  paper2: {
    padding: theme.spacing(2),
  },
  fixedHeight: {
    height: 240,
  },
  tab2:{
    display: 'flex',
    minWidth: 120,
    width: 120,
    "&$selected": {
      backgroundColor: lighten(theme.palette.primary.light, 0.85),
    }
  },
  tab:{
    display: 'flex',
    minWidth: 80,
    width: 80,

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
    height:'100%',
    overflow: 'auto',
  },
  submissionPaper:{
    height:'100%',
    overflow: 'auto',
    [theme.breakpoints.down(800)]:{
      minWidth:600
    }
  },
  submissionContainer: {
    display: 'flex',
    flexGrow: 1,
  },
  selected:{}
}));
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


export default function Editor() {

  const classes = useStyles();

  const [width, height] = useWindowSize();

  //this is for the test case management
  const [config,setConfig] = useState({
    driver:'',
    language:'',
    framework:'',
    assignment_id:'',
    assignments:'', //submission batch
    assignmentsName: '',
  });
  const [selectedConfig, setSelectedConfig]=useState([])
  const [stage,setStage]=useState([])
  const [createdStage,setCreatedStage]=useState(0)

  const [state ,dispatch]=useReducer(stateReducer,{
    past:[],
    present:{
      tree:[
        {
          value: 'Test Cases',
          nodes: [
            {
              id:1,
              value: 'Test 1',
              json: [],
              json_id:[]
            },
          ],
        },
      ],
      selectedCase:{
        id:1,
        json: [],
        json_id:[]
      },
      createdCases: 1,
      noOfCases:1
    },
    future:[]
  })

  const [node,setNode]=useState([])

  const [assignData, setAssignData] = useState([]);

  //this is for the open of the corresponding entry
  const [settingsOpen,setSettingsOpen] = useState(false);
  const [formOpen,setFormOpen] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(true);
  const [stageFormOpen,setStageFormOpen]=useState(false)
  const [stageSelectOpen, setStageSelectOpen]=useState(false)
  const [imgDialogOpen,setImgDialogOpen] = useState(false);
  const contentWidth= width-((drawerOpen)?360:80)

  //this is for the editor
   const [style, setStyle] = useState({
    darkTheme: true,
    fontSize: 14,
  })

  const [tabValue, setTabValue] = useState(0);
  const [drawerValue, setDrawerValue] = useState(0);
  const [resultStep,setResultStep]=useState(0);

  const [guideRun,setGuideRun] = useState(true);

  const handleDrawerChange = (event, newValue) => {
    if(drawerValue===newValue && (newValue===0||newValue===1) ){
      setDrawerOpen(!drawerOpen)
    }else{
      if(newValue===0||newValue===1) setDrawerOpen(true)
      else setDrawerOpen(false)
    }
    if(drawerValue===newValue && newValue===3){
      setResultStep(0);
    }
    setDrawerValue(newValue);
  };

  const [submitConfirm, setSubmitConfirm]= useState(false);
  const [submitWarning, setSubmitWarning]= useState(false);
  const [fileName, setFileName] = useState({
    name: [],
  });

  //this is for config management
  const [createConfig, setCreateConfig]= useState(false);

  //this is for result page
  const [resultData, setResultData]= useState({
    taskNumber: null,
    jobBatch: null,
    result: [],
  });
  const [result, setResult]= useState([]);

  const [jobData, setJobData]= useState({
    imgPath:[]
  })
  const [configData, setConfigData] = useState([]);

  //this is for job batch result
  const [jobBatch, setJobBatch]= useState({
      assignment_id: null,
      assignment_name: 'Assignment',
      submission_batch_id: null,
      zip_filename: 'Submission Batch',
      job_config_id: null,
      job_config_name: 'Job Config',
  });

  const [reportImg, setReportImg]= useState({
    name:"",
    path:"",
    paths:[]
  });
 
  const [selectedJobConfig, setSelectedJobConfig] = useState(-1);
  const [selectedJobConfigName, setSelectedJobConfigName] = useState('');
  const [selectedAssignment, setSelectedAssignment]=useState(-1);
  const [selectedAssignmentName, setSelectedAssignmentName]=useState('');
  const [lastEditedJobConfig, setLastEditedJobConfig] = useState({id:-1,name:''});

  //this is for zip submission
  //TODO: clean submit function, put it in submission panel
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

  useEffect(()=>{
    console.log(node)
  })

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
      <Router>
        <div className={classes.root}>
          {guide}
          <CssBaseline />
          <GuitaAppBar
              classes={classes}
              state={state}
              handleSubmit={handleSubmit}
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
                      classes={classes}
                      selectedAssignment={selectedAssignment}
                      selectedAssignmentName={selectedAssignmentName}
                      lastEditedJobConfig={lastEditedJobConfig}
                  />
              </div>
              <div style={{width:240}}>
                <Box p={3}/>
                <SubmitPanel
                    drawerValue={drawerValue}
                    jobBatch={jobBatch}
                    setJobBatch={setJobBatch}
                    state={state}
                />
                {assignData.map((row)=>{
                  if (drawerOpen) return (
                      <TreePanel
                          drawerValue={drawerValue}
                          selectedCase={state.present.selectedCase}
                          tree={state.present.tree}
                          createdCases={state.present.createdCases}
                          noOfCases={state.present.noOfCases}
                          dispatch={dispatch}
                          pathname={row.assignment_name}
                          pathid={row.assignment_id}
                      />
                      )
                })}
              </div>
            </div>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route exact path='/'>
              <Box p={3}>
                <Paper className={classes.submissionPaper}>
                  <AssignmentTable
                    jobBatch={jobBatch}
                    setJobBatch={setJobBatch}
                    setSelectedAssignment={setSelectedAssignment}
                    handleDrawerChange={handleDrawerChange}
                    setSelectedJobConfig={setSelectedJobConfig}
                    selectedConfig={selectedConfig}
                    setSelectedConfig={setSelectedConfig}
                    setSelectedAssignmentName={setSelectedAssignmentName}
                    setSelectedJobConfigName={setSelectedJobConfigName}
                    assignData={assignData}
                    setAssignData={setAssignData}
                    setLastEditedJobConfig={setLastEditedJobConfig}
                    configData={configData}
                    setConfigData={setConfigData}
                  />
                </Paper>
              </Box>
            </Route>
            {assignData.map((row)=> {
              return(
                  <React.Fragment>
                  <Route path={['/testcase/'+row.assignment_id+'/'+row.assignment_name, '/testcase/' +row.assignment_id+'/'+ row.assignment_name+'/jsoneditor']}>
                    <Box p={3}>
                      <Paper className={classes.paper2}>
                        <Toolbar className={classes.toolbar2}>
                          <Typography className={classes.title} color="primary" variant="h5" component="div">
                            {(selectedAssignmentName !== '') ? selectedAssignmentName : ((tabValue === 0) ? "Table & Form Mode " : "JSON Code Editor ")} / Test Case {state.present.selectedCase.id}
                          </Typography>
                          <IconButton color="inherit" disabled={state.past.length === 0} onClick={() => {
                            dispatch({type: "UNDO"})
                          }}>
                            <UndoIcon/>
                          </IconButton>
                          <IconButton color="inherit" disabled={state.future.length === 0} onClick={() => {
                            dispatch({type: "REDO"})
                          }}>
                            <RedoIcon/>
                          </IconButton>
                          <Tabs
                              value={tabValue}
                              onChange={(value, newValue) => setTabValue(newValue)}
                              indicatorColor="primary"
                              centered={true}
                          >
                            <Tooltip title="Table Mode">
                              <Tab
                                  className={classes.tab}
                                  aria-label="tab_tableView"
                                  icon={<TableChartIcon color="primary"/>}
                                  {...a11yProps(0)}
                                  component={Link}
                                  to={'/testcase/'+row.assignment_id+'/'+row.assignment_name}
                              />
                            </Tooltip>
                            <Tooltip title="CodeEditor">
                              <Tab
                                  className={classes.tab}
                                  aria-label="tab_codeEditor"
                                  icon={<CodeIcon color="primary"/>}
                                  {...a11yProps(1)}
                                  component={Link}
                                  to={'/testcase/'+row.assignment_id+'/'+row.assignment_name+'/jsoneditor'}
                              />
                            </Tooltip>
                          </Tabs>
                        </Toolbar>
                        <JsonEditorPanel
                            classes={classes}
                            tabValue={tabValue}
                            style={style}
                            state={state}
                            dispatch={dispatch}
                            pathname={row.assignment_name}
                            pathid={row.assignment_id}
                        />
                        <TablePanel
                            tabValue={tabValue}
                            formOpen={formOpen}
                            state={state}
                            setFormOpen={setFormOpen}
                            dispatch={dispatch}
                            width={(drawerOpen) ? (width - drawerWidth) : width}
                            selectedAssignment={selectedAssignment}
                            pathname={row.assignment_name}
                            setNode={setNode}
                            pathid={row.assignment_id}
                        />
                      </Paper>
                    </Box>
                  </Route>
                  </React.Fragment>
                   )
                  }
                )}
            {configData.map(row=>
            <Route exact path={'/config/'+row.job_config_id+'/'+row.job_config_name}>
              <Box p={3}>
              <div style={(width<1080)?{
                width:'100%'
              }:{
                display: 'flex',
                flexGrow: 1,
                margin:0,
                width:'100%',
              }}>
                <div id="commandTable" style={(contentWidth<1080)?{width:'100%'}:((!stageFormOpen)?{width:'100%'}:{width:'69%'})}>
                    <StageTable
                        stage={stage}
                        setStage={setStage}
                        stageFormOpen={stageFormOpen}
                        setStageFormOpen={setStageFormOpen}
                        stageSelectOpen={stageSelectOpen}
                        setStageSelectOpen={setStageSelectOpen}
                        createConfig={createConfig}
                        setCreateConfig={setCreateConfig}
                        selectedJobConfig={selectedJobConfig}
                        selectedJobConfigName={selectedJobConfigName}
                    />
                  </div>
                <div style={{height:'20px',width:'2%'}}/>
                  {(stageFormOpen)?
                      <Grow in={stageFormOpen} timeout={(stageFormOpen) ? 1000 : 0}>
                        <div style={(contentWidth<1080)?{width:'100%'}:{width:'29%'}}>
                          <StageForm
                              stage={stage}
                              setStage={setStage}
                              stageFormOpen={stageFormOpen}
                              setStageFormOpen={setStageFormOpen}
                              createdStage={createdStage}
                              setCreatedStage={setCreatedStage}
                              testcases={state.present.tree[0].nodes}
                          />
                        </div>
                      </Grow>
                      :null}
                    {(stageSelectOpen)?
                      <Grow in={stageSelectOpen} timeout={(stageSelectOpen) ? 1000 : 0}>
                        <Grid item xs={3}>
                          <StageSelect
                              stage={stage}
                              setStage={setStage}
                              stageSelectOpen={stageSelectOpen}
                              setStageSelectOpen={setStageSelectOpen}
                              createdStage={createdStage}
                              setCreatedStage={setCreatedStage}
                              testcases={state.present.tree[0].nodes}
                          />
                        </Grid>
                      </Grow>
                      :null}
                </div>
              </Box>
            </Route>
              )}

              <Box p={3}>
                      <Paper className={classes.resultPaper}>
                        <Route exact path='/result'>
                          {(resultStep===0)?
                          <ResultTable
                                setResultStep={setResultStep}
                                setJobData={setJobData}
                                jobData={jobData}
                                result={result}
                                setResult={setResult}
                            />:
                              (resultStep===1)?
                                <JobTable
                                    setResultStep={setResultStep}
                                    setJobData={setJobData}
                                    jobData={jobData}
                                />:
                                <ReportTable
                                  setResultStep={setResultStep}
                                  jobData={jobData}
                                  setJobData={setJobData}
                                  handleImgDialogOpen={()=>{setImgDialogOpen(true)}}
                                  reportImg={reportImg}
                                  setReportImg={setReportImg}
                                />}
                        </Route>
                        </Paper>
              </Box>

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
              <ReportImageDialog
                  open={imgDialogOpen}
                  handleClose={()=>setImgDialogOpen(false)}
                  title={reportImg.name}
                  jobData={jobData}
                  reportImg={reportImg}
                  setReportImg={setReportImg}
                  //imgPath="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
              />
          </main>
        </div>
      </Router>
  );
}

function ReportImageDialog(props){
  const {open, title, handleClose, jobData, reportImg, setReportImg}=props
  return(
      <Dialog
          open={open}
          onClose={handleClose}
          maxWidth='md'
      >
        <DialogTitle>{reportImg.paths[reportImg.path]}</DialogTitle>
        <div
            style={{
              display: 'flex',
              flexGrow: 1,
              margin:0
            }}
        >
          <Button
              disabled={0===reportImg.path}
              onClick={()=>{
            if(reportImg.path>0){
              setReportImg({
                ...reportImg,
                path:reportImg.path-1,
              })
            }
          }}>
            <KeyboardArrowLeftIcon/>
          </Button>
            <div style={{
              width: '100%',
            }}>
              <img src={'/uploads/job/'+jobData.job_id+'/report/'+jobData.stage_id+'/'+reportImg.paths[reportImg.path]} width="100%" height="100%"/>
            </div>
            <Button
                disabled={reportImg.paths.length-1===reportImg.path}
                onClick={()=>{
            if(reportImg.path<reportImg.paths.length-1){
              setReportImg({
                ...reportImg,
                path:reportImg.path+1
              })
            }
          }}>
            <KeyboardArrowRightIcon/>
          </Button>
        </div>
      </Dialog>
  )
}
/*
                      <Route exact path='/result'>
                            <ResultTable
                                setResultStep={setResultStep}
                                setJobData={setJobData}
                                jobData={jobData}
                                result={result}
                                setResult={setResult}
                            />
                        </Route>
                        {result.map((row)=>
                            <Route exact path={'/result/jobbatch/'+row.job_batch_id}>
                            <JobTable
                            setResultStep={setResultStep}
                            setJobData={setJobData}
                            jobData={jobData}
                            />
                            </Route>
                        )}
                        {jobData.map(row=>
                            <Route exact path={'/result/jobbatch/'+jobData.job_batch_id+'/job/'+row.job_id+'/stage/'}>
                                <ReportTable
                                  setResultStep={setResultStep}
                                  jobData={jobData}
                                  setJobData={setJobData}
                                  handleImgDialogOpen={()=>{setImgDialogOpen(true)}}
                                  reportImg={reportImg}
                                  setReportImg={setReportImg}
                                />
                            </Route>
                                )}*/


