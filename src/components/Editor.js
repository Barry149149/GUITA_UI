import React, { useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import GuitaAppBar from './GuitaAppBar'
import DrawerTab from './tab/DrawerTab'
import { BaseTableWithForm } from './tab/tabpanels/contentPanels/BaseTableWithForm'
import { BaseTable } from './tab/tabpanels/contentPanels/BaseTable'
import Container from '@material-ui/core/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams
} from 'react-router-dom'
import AssignmentTable from './submissionTable/AssignmentTable'
import Grow from '@material-ui/core/Grow'
import TablePanel from './tab/tabpanels/contentPanels/TablePanel'
import CommandForm from './commandTable/CommandForm'
import TreePanel from './tab/tabpanels/drawerPanels/TreePanel'
import StagePage from './page/Stage'
import ResultTable from './resultTable/ResultTable'
import JobTable from './resultTable/JobTable'
import ReportTable from './resultTable/resultReport/ReportTable'
import SubmitWarningDialog from './dialog/SubmitWarning'
import SubmitConfirmDialog from './dialog/SubmitCofirm'
import GuideTour from './guideTour'

export default function MainContainer() {
  const [themeOptions, setThemeOptions] = useState({
    darkTheme: true,
    fontSize: 14
  })

  function stateReducer(state, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      case 'SET':
        return {
          past: [],
          present: action.data,
          future: []
        }
      default:
        if (present === action.data) return state
        return {
          past: [...past, present],
          present: action.data,
          future: []
        }
    }
  }

  const [state, dispatch] = useReducer(stateReducer, {
    past: [],
    present: {
      tree: [
        {
          value: 'Test Cases',
          nodes: [
            {
              id: 1,
              value: 'Test 1',
              json: [],
              json_id: [],
              testcase_id: null
            }
          ]
        }
      ],
      selectedCase: {
        id: 1,
        json: [],
        json_id: []
      },
      createdCases: 1,
      noOfCases: 1
    },
    future: []
  })

  const [postings, setPostings] = useState(0)

  //this is for job batch result
  const [jobBatch, setJobBatch] = useState({
    assignment_id: null,
    assignment_name: 'Assignment',
    submission_batch_id: null,
    zip_filename: 'Submission Batch',
    job_config_id: null,
    job_config_name: 'Job Config'
  })

  //this is for the open of the corresponding entry
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [testcaseFetched, setTestcaseFetched] = useState(false)
  const [selectedJobConfig, setSelectedJobConfig] = useState(-1)
  const [selectedJobConfigName, setSelectedJobConfigName] = useState('')
  const [selectedAssignment, setSelectedAssignment] = useState(-1)
  const [selectedAssignmentName, setSelectedAssignmentName] = useState('')
  const [assignData, setAssignData] = useState([])
  const [configData, setConfigData] = useState([])
  const [selectedConfig, setSelectedConfig] = useState([])
  const [drawerValue, setDrawerValue] = useState(0)
  const [resultStep, setResultStep] = useState(0)

  const [lastEditedJobConfig, setLastEditedJobConfig] = useState({
    id: -1,
    name: ''
  })

  const handleDrawerChange = (event, newValue) => {
    if (drawerValue === newValue && (newValue === 0 || newValue === 1)) {
      setDrawerOpen(!drawerOpen)
    } else {
      if (newValue === 0 || newValue === 1) setDrawerOpen(true)
      else setDrawerOpen(false)
    }
    if (drawerValue === newValue && newValue === 3) {
      setResultStep(0)
    }
    setDrawerValue(newValue)
  }

  //==========================TESTCASE EDITOR STATES===============================

  const [tabValue, setTabValue] = useState(0)
  const [testCaseFetched, setTestCaseFetched] = useState(false)
  const [file, setFile] = useState({
    zip_filename: null,
    zip: null
  })
  const [deletedTestcase, setDeletedTestcase] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [node, setNode] = useState([])

  const [formData, setFormData] = useState({})

  const [cmdSchema, setCmdSchema] = useState({
    command: 'None',
    schema: {
      type: 'object'
    },
    formData: ''
  })

  //======================STAGE EDITOR STATES==========================================

  const [stageFormOpen, setStageFormOpen] = useState(false)
  const [stageSelectOpen, setStageSelectOpen] = useState(false)

  //this is for config management
  const [createConfig, setCreateConfig] = useState(false)

  const [stage, setStage] = useState([])
  const [createdStage, setCreatedStage] = useState(0)

  //======================RESULT PAGE STATES==========================================

  const [resultData, setResultData] = useState({
    taskNumber: null,
    jobBatch: null,
    result: []
  })
  const [result, setResult] = useState([])

  const [jobData, setJobData] = useState({
    imgPath: []
  })

  const [reportImg, setReportImg] = useState({
    name: '',
    path: '',
    paths: []
  })

  //======================SUBMIT DIALOG==========================================

  //this is for the test case management
  const [config, setConfig] = useState({
    driver: '',
    language: '',
    framework: '',
    assignment_id: '',
    assignments: '', //submission batch
    assignmentsName: ''
  })

  const [submitConfirm, setSubmitConfirm] = useState(false)
  const [submitWarning, setSubmitWarning] = useState(false)
  const [fileName, setFileName] = useState({
    name: []
  })

  function uploadFile() {
    let fData = new FormData()

    fData.append('driver', config.driver)
    fData.append('language', config.language)
    fData.append('framework', config.framework)

    const name = []
    for (let index = 0; index < state.present.tree[0].nodes.length; index++) {
      name.push(state.present.tree[0].nodes[index].value)
      const fileData = JSON.stringify(state.present.tree[0].nodes[index].json)
      const blob = new Blob([fileData], { type: 'application/json' })
      fData.append(
        'testcases[]',
        blob,
        'testcase' + state.present.tree[0].nodes[index].id + '.json'
      )
    }
    console.log(name)
    setFileName({
      ...fileName,
      name: name
    })
    console.log(fileName.name)
    fData.append('submission_file', config.assignments)

    // This is for testcase create
    const tData = new FormData()
    for (let index = 0; index < state.present.tree[0].nodes.length; index++) {
      name.push(state.present.tree[0].nodes[index].value)
      tData.append(
        'testcase_name',
        'testcase' + state.present.tree[0].nodes[index].id
      )
      const fileData = JSON.stringify(state.present.tree[0].nodes[index].json)
      const blob = new Blob([fileData], { type: 'application/json' })
      tData.append(
        'testcase_file',
        blob,
        'testcase' + state.present.tree[0].nodes[index].id + '.json'
      )
    }

    fetch('/api/v2/assignment/' + config.assignment_id + '/testcase', {
      method: 'POST',
      body: tData
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error))

    // This is for submission zip
    let aData = new FormData()
    aData.append('submission_file', config.assignments)

    fetch('/api/v2/assignment/' + config.assignment_id + '/submission_batch', {
      method: 'POST',
      body: aData
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
  }

  //this is for zip submission
  //TODO: clean submit function, put it in submission panel
  const handleSubmit = () => {
    if (config.driver && config.language && config.framework) {
      const name = []
      for (let index = 0; index < state.present.tree[0].nodes.length; index++) {
        name.push(state.present.tree[0].nodes[index].value)
      }
      console.log(name)
      setFileName({
        ...fileName,
        name: name
      })
      console.log(fileName.name)
      setSubmitConfirm(true)
    } else {
      setSubmitWarning(true)
    }
  }

  //======================TOUR GUIDE==========================================

  const [guideRun, setGuideRun] = useState(true)

  //this is for tour guide
  function useTourStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key)
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    })
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
  }

  const [tour, setTour] = useTourStickyState(0, 'tour')

  let guide

  if (tour < 1) {
    guide = (
      <GuideTour
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
      />
    )
  }

  //======================STYLES==========================================

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: `calc(100vh - 64px)`
    },
    content: {
      flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      display: 'flex',
      height: '100%',
      paddingLeft: (props) => (props.drawerOpen ? 0 : 'inherit')
    }
  }))

  const classes = useStyles({ drawerOpen })

  const assignmentTable = (
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
      setDrawerOpen={setDrawerOpen}
      state={state}
      setTestcaseFetched={setTestcaseFetched}
      setPostings={setPostings}
    />
  )

  const testcaseEditorTable = (
    <TablePanel
      classes={classes}
      tabValue={tabValue}
      selectedAssignmentName={selectedAssignmentName}
      dispatch={dispatch}
      setTabValue={setTabValue}
      state={state}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      fetched={testCaseFetched}
      setFetched={setTestCaseFetched}
      file={file}
      setFile={setFile}
      setPostings={setPostings}
      deletedTestcase={deletedTestcase}
      setDeletedTestcase={setDeletedTestcase}
      formOpen={formOpen}
      setFormOpen={setFormOpen}
      selectedAssignment={selectedAssignment}
      setNode={setNode}
      themeOptions={themeOptions}
      setSelectedAssignment={setSelectedAssignment}
      setSelectedAssignmentName={setSelectedAssignmentName}
    />
  )

  const commandForm = (
    <Grow in={formOpen} timeout={formOpen ? 1000 : 0}>
      <div>
        <CommandForm
          selectedCase={state.present.selectedCase}
          cmdSchema={cmdSchema}
          setCmdSchema={setCmdSchema}
          tree={state.present.tree}
          formData={formData}
          setFormData={setFormData}
          setFormOpen={setFormOpen}
          createdCases={state.present.createdCases}
          noOfCases={state.present.noOfCases}
          dispatch={dispatch}
        />
      </div>
    </Grow>
  )

  const testcaseEditor = (
    <React.Fragment>
      {drawerOpen ? (
        <TreePanel
          selectedCase={state.present.selectedCase}
          tree={state.present.tree}
          createdCases={state.present.createdCases}
          noOfCases={state.present.noOfCases}
          dispatch={dispatch}
          file={file}
          setFile={setFile}
          setDeletedTestcase={setDeletedTestcase}
          deletedTestcase={deletedTestcase}
        />
      ) : null}
      {formOpen ? (
        <BaseTableWithForm table={testcaseEditorTable} form={commandForm} />
      ) : (
        <BaseTable table={testcaseEditorTable} />
      )}
    </React.Fragment>
  )

  const stageEditor = (
    <StagePage
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
      createdStage={createdStage}
      setCreatedStage={setCreatedStage}
      state={state}
      setDrawerOpen={setDrawerOpen}
      selectedAssignment={selectedAssignment}
      setLastEditedJobConfig={setLastEditedJobConfig}
    />
  )

  return (
    <Router>
      <div className={classes.root}>
        {guide}
        <CssBaseline />
        <GuitaAppBar
          themeOptions={themeOptions}
          setThemeOptions={setThemeOptions}
          setGuideRun={setGuideRun}
          setTour={setTour}
          postings={postings}
        />
        <DrawerTab
          selectedAssignment={selectedAssignment}
          selectedAssignmentName={selectedAssignmentName}
          lastEditedJobConfig={lastEditedJobConfig}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container} maxWidth={false}>
            <Route exact path="/">
              <BaseTable table={assignmentTable} />
            </Route>
            <Route path={'/testcase/:assignId/:assignName'}>
              {testcaseEditor}
            </Route>
            <Route exact path={'/config/:configId/:configName'}>
              {stageEditor}
            </Route>

            <Route exact path="/result">
              <BaseTable
                table={
                  <ResultTable
                    setResultStep={setResultStep}
                    setJobData={setJobData}
                    jobData={jobData}
                    result={result}
                    setResult={setResult}
                    setDrawerOpen={setDrawerOpen}
                  />
                }
              />
            </Route>
            <Route
              exact
              path={'/result/job_batch/:jobBatchId'}
              component={JobTable}>
              <BaseTable
                table={
                  <JobTable
                    setResultStep={setResultStep}
                    setJobData={setJobData}
                    jobData={jobData}
                    setDrawerOpen={setDrawerOpen}
                  />
                }
              />
            </Route>
            <Route path={'/result/job/:jobId/stage/:stageId'}>
              <BaseTable
                table={
                  <ReportTable
                    setResultStep={setResultStep}
                    jobData={jobData}
                    setJobData={setJobData}
                    reportImg={reportImg}
                    setReportImg={setReportImg}
                    setDrawerOpen={setDrawerOpen}
                  />
                }
              />
            </Route>
          </Container>
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
    </Router>
  )
}
