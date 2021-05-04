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
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useParams } from 'react-router-dom'
import { styled } from '@material-ui/core'
import ClipLoader from 'react-spinners/ClipLoader'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ReportImageDialog } from './ReportImageDialog'
import { Row } from './ReportRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { TableHeaderCellStyle } from '../../../style/mystyle'

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
  table: {
    minWidth: 450
  },
  title: {
    flex: '1'
  },
  container: {
    // maxHeight: 'calc(75vh - 64px)' // 64 is toolbar height
  },
  openButton: {
    width: 32,
    height: 32
  },
  totalScore: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 'large'
  }
}))

const HeaderCell = styled(TableCell)({
  ...TableHeaderCellStyle
})

function ReportTableToolbar(props) {
  const { classes, table, result, setResultStep, fetched } = props

  if (fetched) {
    return (
      <Toolbar>
        <Typography className={classes.title} color="primary" variant="h6">
          {table}
        </Typography>
        <div className={classes.totalScore}>
          {'Total Score: ' +
            result.summary.score +
            '/' +
            result.summary.maxScore}
        </div>
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
  const [svEImg, setSvEImg] = useState({
    student: '',
    expected: '',
    open: false
  })

  const [imgDialogOpen, setImgDialogOpen] = useState(false)

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
          job_id: jobId,
          stage_id: stageId,
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
    <React.Fragment>
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
              <TableRow>
                <HeaderCell>{}</HeaderCell>
                <HeaderCell>{}</HeaderCell>

                <HeaderCell>Command</HeaderCell>
                <HeaderCell align="center">Result</HeaderCell>
                <HeaderCell align="center">Score</HeaderCell>
                <HeaderCell align="center">
                  <IconButton
                    className={classes.openButton}
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
                </HeaderCell>
              </TableRow>
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
                    handleImgDialogOpen={() => setImgDialogOpen(true)}
                    reportImg={reportImg}
                    setReportImg={setReportImg}
                    setSvEImg={setSvEImg}
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
      <Dialog
        open={svEImg.open}
        onClose={() =>
          setSvEImg({
            ...svEImg,
            open: false
          })
        }>
        <DialogTitle>{svEImg.student + ' v. expected'}</DialogTitle>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            margin: 0
          }}>
          <div style={{ width: '50%' }}>
            Student:
            <img
              src={
                '/uploads/job/' +
                jobId +
                '/report/' +
                stageId +
                '/' +
                svEImg.student
              }
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ width: 20 }} />
          <div style={{ width: '50%' }}>
            Expected:
            <img
              src={
                '/uploads/job/' +
                jobId +
                '/report/' +
                stageId +
                '/' +
                svEImg.expected
              }
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Dialog>
      <ReportImageDialog
        open={imgDialogOpen}
        handleClose={() => setImgDialogOpen(false)}
        title={reportImg.name}
        jobData={jobData}
        reportImg={reportImg}
        setReportImg={setReportImg}
        //imgPath="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
      />
    </React.Fragment>
  )
}
