import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { resultSample } from '../../../docs/resultSample'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import Text from 'recharts/lib/component/Text'
import { useParams } from 'react-router-dom'
import { CheckCircle } from '@material-ui/icons'
import CancelIcon from '@material-ui/icons/Cancel'
import { Link } from '@material-ui/core'
import { ClimbingBoxLoader } from 'react-spinners'
import ClipLoader from 'react-spinners/ClipLoader'

/*function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'job_batch_id', numeric: false, label: "Job Batch ID"},
        { id: 'assignment_name', numeric: false, label: 'Assignment Name'},
        { id: 'created_at', numeric: false, label: 'Submitted At'},
        { id: 'job_config_name', numeric: false, label: 'Job Config Name'},
        { id: 'zip_filename', numeric: false, label: 'Submission Batch'}
    ];

    return (
        <TableHead >
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}*/

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    padding: '10px'
  },
  table: {
    minWidth: 450
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  title: {
    flex: '1 1 100%'
  },
  container: {
    maxHeight: 650
  },
  tableCell: {
    padding: '0px 8px'
  }
}))

function Row(props) {
  const classes = useStyles()
  const {
    row,
    isOpen,
    handleOpenClick,
    jobData,
    setJobData,
    reportImg,
    setReportImg
  } = props

  const isItemOpened = isOpen(row.commandId)
  const [open, setOpen] = useState({
    result: false,
    error: false
  })

  return (
    <React.Fragment>
      <TableRow
        hover
        style={{ cursor: 'pointer' }}
        tabIndex={-1}
        key={row.commandId}
        onClick={(e) => handleOpenClick(e, row.commandId)}>
        <TableCell>{row.commandId}</TableCell>
        <TableCell>{row.command}</TableCell>
        <TableCell>
          {row.score == row.maxScore ? (
            <CheckCircle style={{ color: 'green' }} />
          ) : (
            <CancelIcon color="secondary" />
          )}
        </TableCell>
        <TableCell align="right">
          <IconButton
            id="button_expandRow"
            size="small"
            onClick={(e) => handleOpenClick(e, row.commandId)}>
            {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detail:
              </Typography>
              <Table>
                <TableRow>
                  <TableCell size="small" className={classes.tableCell}>
                    Score: {row.score + '/' + row.maxScore}
                  </TableCell>
                </TableRow>
                {row.parameters ? (
                  <TableRow>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography variant="h8" gutterBottom component="div">
                        Parameters:
                      </Typography>
                      <Box
                        border={1}
                        borderColor="grey.500"
                        style={{
                          minHeight: 60,
                          width: '100%'
                        }}>
                        <pre
                          style={{
                            textAlign: 'left',
                            padding: 5,
                            'white-space': 'pre-wrap'
                          }}>
                          {JSON.stringify(row.parameters, null, 2)}
                        </pre>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : null}
                {row.driver ? (
                  <TableRow>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography variant="h8" gutterBottom component="div">
                        Driver: {row.driver}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
                {row.setVariable ? (
                  <TableRow>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography variant="h8" gutterBottom component="div">
                        setVariable: {row.setVariable}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
                {row.result ? (
                  <TableRow
                    onClick={(e) =>
                      setOpen({
                        ...open,
                        result: !open.result
                      })
                    }
                    style={{
                      cursor: 'pointer'
                    }}>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography variant="h8" gutterBottom component="div">
                        result:{' '}
                        <Link component="button" variant="body2">
                          {row.result.value === null
                            ? 'null'
                            : row.result.value.toString()}
                        </Link>
                      </Typography>
                      <Collapse in={open.result}>
                        <Box
                          border={1}
                          borderColor="grey.500"
                          style={{
                            minHeight: 60,
                            width: '100%',
                            minWidth: '100%'
                          }}>
                          <pre
                            style={{
                              textAlign: 'left',
                              padding: 5,
                              'white-space': 'pre-wrap'
                            }}>
                            {JSON.stringify(row.result, null, 2).replace(
                              /\\n/gm,
                              '\n'
                            )}
                          </pre>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                ) : null}
                {row.errors.length ? (
                  <TableRow>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography variant="h8" gutterBottom component="div">
                        errors:{' '}
                        <Link
                          component="button"
                          variant="body2"
                          onClick={(e) =>
                            setOpen({
                              ...open,
                              error: !open.error
                            })
                          }
                          style={{
                            cursor: 'pointer'
                          }}>
                          {row.errors.map(
                            (err, index) => index + 1 + ') ' + err.message
                          ) + ','}
                        </Link>
                      </Typography>
                      <Collapse in={open.error}>
                        <Box
                          border={1}
                          borderColor="grey.500"
                          style={{
                            minHeight: 60,
                            width: '100%',
                            minWidth: '100%'
                          }}>
                          <pre
                            style={{
                              textAlign: 'left',
                              padding: 5,
                              'white-space': 'pre-wrap'
                            }}>
                            {row.errors.map((err, index) =>
                              JSON.stringify(err, null, 2).replace(
                                /\\n/gm,
                                '\n'
                              )
                            )}
                          </pre>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                ) : null}
                {row.screenshotPath ? (
                  <TableRow>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography variant="h8" gutterBottom component="div">
                        Screenshot Path:
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setReportImg({
                              ...reportImg,
                              name: row.screenshotPath,
                              path: reportImg.paths.indexOf(row.screenshotPath)
                            })
                            props.handleImgDialogOpen()
                          }}>
                          {row.screenshotPath}
                        </Link>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function ReportTableToolbar(props) {
  const { classes, table, result, setResultStep, fetched } = props

  if (fetched) {
    return (
      <Toolbar>
        <Typography className={classes.title} color="primary" variant="h6">
          {table}
        </Typography>
        <Typography variant="body1">
          {'Result: ' + result.summary.score + '/' + result.summary.maxScore}
        </Typography>
      </Toolbar>
    )
  } else {
    return (
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          No Report is provided for this stage
        </Typography>
      </Toolbar>
    )
  }
}

export default function ReportTable(props) {
  let { jobId, stageId } = useParams()

  const {
    setResultStep,
    jobData,
    setJobData,
    reportImg,
    setReportImg,
    setDrawerOpen
  } = props

  const classes = useStyles()

  const [fetched, setFetched] = useState(false)
  const [result, setResult] = useState([])
  const [open, setOpen] = useState([])

  useEffect(() => {
    setDrawerOpen(false)
    let jobBatchId = 0
    //TODO: change to correct path
    fetch('/uploads/job/' + jobId + '/report/' + stageId + '/report.json', {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data)

        let paths = []
        if (typeof data.breakdown !== 'undefined') {
          data.breakdown.map((row) => {
            if (
              typeof row.screenshotPath !== 'undefined' &&
              row.screenshotPath
            ) {
              paths.push(row.screenshotPath)
            }
          })
          setReportImg({
            paths: paths
          })
        }

        setResult(data)

        return fetch('/api/v2/job/' + jobId, {
          headers: {
            'content-type': 'application/json'
          }
        })
      })
      .then((response) => response.json())
      .then((data) => {
        jobBatchId = data.job_batch_id
        return fetch(
          '/api/v2/job_batch?assignment=true&job_config=true&submission_batch=true',
          {
            headers: {
              'content-type': 'application/json'
            }
          }
        )
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        for (let i = 0, numData = data.length; i < numData; i++) {
          console.log(data[i].job_batch_id)
          if (data[i].job_batch_id == jobBatchId) {
            return data[i].assignment.assignment_name
          }
        }
      })
      .then((result) => {
        setJobData({
          ...jobData,
          assignment_name: result
        })

        setFetched(true)
      })
  }, [])

  useEffect(() => {})

  const handleOpenClick = (event, id) => {
    const openedIndex = open.indexOf(id)
    let newSelected = []

    if (openedIndex === -1) {
      newSelected = newSelected.concat(open, id)
    } else if (openedIndex === 0) {
      newSelected = newSelected.concat(open.slice(1))
    } else if (openedIndex === open.length - 1) {
      newSelected = newSelected.concat(open.slice(0, -1))
    } else if (openedIndex > 0) {
      newSelected = newSelected.concat(
        open.slice(0, openedIndex),
        open.slice(openedIndex + 1)
      )
    }
    setOpen(newSelected)
  }

  const openAll = () => {
    let newSelected = []
    if (open.length > 0) {
      setOpen([])
      return
    }
    if (typeof result.breakdown !== 'undefined') {
      for (let i = 0; i < result.breakdown.length; i++) {
        newSelected.push(i + 1)
      }
      setOpen(newSelected)
    }
  }

  const isOpen = (id) => open.indexOf(id) !== -1

  return (
    <div className={classes.root}>
      <ReportTableToolbar
        table={jobData.assignment_name + ' / Stage ' + stageId}
        classes={classes}
        result={result}
        setResultStep={props.setResultStep}
        fetched={fetched}
      />
      <TableContainer className={classes.container}>
        {fetched ? (
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
            stickyHeader>
            <TableHead>
              <TableCell>Command ID</TableCell>
              <TableCell>Command</TableCell>
              <TableCell>Result</TableCell>
              <TableCell align="right">
                <IconButton
                  id="button_expandRow"
                  size="small"
                  onClick={(e) => openAll()}>
                  {typeof result.breakdown !== 'undefined' &&
                  result.breakdown.length > 0 &&
                  result.breakdown.length === open.length ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
            </TableHead>
            {typeof result.breakdown !== 'undefined' ? (
              <TableBody>
                {result.breakdown.map((row, index) => (
                  <Row
                    row={row}
                    isOpen={isOpen}
                    jobData={jobData}
                    setJobData={setJobData}
                    handleOpenClick={handleOpenClick}
                    handleImgDialogOpen={props.handleImgDialogOpen}
                    reportImg={reportImg}
                    setReportImg={setReportImg}
                  />
                ))}
              </TableBody>
            ) : null}
          </Table>
        ) : (
          <div
            style={{
              position: 'relative',
              top: '50%',
              left: '50%',
              overflowX: 'hidden'
            }}>
            <ClipLoader color={'#3f51b5'} loading={true} size={50} />
          </div>
        )}
      </TableContainer>
    </div>
  )
}
