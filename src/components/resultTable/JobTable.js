import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip
} from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle } from '@material-ui/icons'
import CancelIcon from '@material-ui/icons/Cancel'
import Button from '@material-ui/core/Button'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import ClipLoader from 'react-spinners/ClipLoader'
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty'
import useSWR from 'swr'
import Box from '@material-ui/core/Box'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

const fetcher = (url) => fetch(url).then((r) => r.json())

function descendingComparator(a, b, orderBy) {
  if (b.submission[orderBy] < a.submission[orderBy]) {
    return -1
  }
  if (b.submission[orderBy] > a.submission[orderBy]) {
    return 1
  }

  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    result,
    stageName,
    maxCol
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  let headCell_stage = []

  // TODO: Check valid length
  for (let i = 0; i < maxCol; i++) {
    headCell_stage.push({
      id: i + 1,
      numeric: false,
      label: stageName[i]
    })
  }

  const headCells = [
    { id: 'submission_name', numeric: false, label: 'Submission Name' }
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {headCell_stage.map((cell) => (
          <TableCell key={cell.id} align="center">
            {cell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

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
  }
}))

function ResultTableToolbar(props) {
  const { classes, table, setFilterCriteria } = props

  return (
    <Toolbar>
      <Typography className={classes.title} color="primary" variant="h6">
        {table}
      </Typography>
      <TextField
        label="Search"
        onChange={(e) => {
          setFilterCriteria(e.target.value)
        }}
      />
    </Toolbar>
  )
}

export default function JobTable(props) {
  let { jobBatchId } = useParams()

  const { setResultStep, setJobData, jobData, setDrawerOpen } = props

  const classes = useStyles()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('submission_name')
  const [filterCriteria, setFilterCriteria] = useState('')
  const [fetched, setFetched] = useState(false)
  const [stageName, setStageName] = useState([])
  const [maxCol, setMaxCol] = useState(0)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleCellClick = (event, row, stage_id) => {
    setJobData({
      ...jobData,
      job_id: row.job_id,
      stage_id: stage_id
    })
    console.log('haha, I have been clicked')
  }

  useEffect(() => {
    //TODO: change to correct path
    setDrawerOpen(false)
    if (jobBatchId) {
      fetch(
        '/api/v2/job_batch/' + jobBatchId + '?assignment=true&job_config=true',
        {
          headers: { 'content-Type': 'application/json' }
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let name = []
          for (let i = 0; i < data.job_config.job_stage.length; i++) {
            name.push(data.job_config.job_stage[i].stage_name)
          }
          setJobData({
            ...jobData,
            assignment_name: data.assignment.assignment_name
          })
          setMaxCol(data.job_config.job_stage.length)
          setStageName(name)
          setFetched(true)
          console.log(name)
        })
      // fetch('/api/v2/job_batch/' + jobBatchId + '/report', {
      //   headers: {
      //     'content-type': 'application/json'
      //   }
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log(data)
      //     const array = []
      //     for (const value of data) {
      //       array.push(value)
      //     }
      //     setJob(array)
      //     setFetched(true)
      //   })
    }
  }, [])
  const { data: job, error, isValidating } = useSWR(
    '/api/v2/job_batch/' + jobBatchId + '/report',
    fetcher,
    {
      refreshInterval: 5000
    }
  )
  /*
  if (fetched) {
    for (let i = 0; i < job.length; i++) {
      maxCol = job[i].reports.length > maxCol ? job[i].reports.length : maxCol
    }
  }
*/
  return (
    <div className={classes.root}>
      <ResultTableToolbar
        table={jobData.assignment_name}
        classes={classes}
        setFilterCriteria={setFilterCriteria}
        setResultStep={setResultStep}
      />
      <Box style={{ backgroundColor: '#FFFFFF' }}>
        {isValidating ? (
          <ListItem dense>
            <ListItemIcon>
              <ClipLoader color={'#222222'} loading={isValidating} size={16} />
            </ListItemIcon>
            <ListItemText style={{ color: '#777777', fontSize: 12 }}>
              Auto Reload Every 5 seconds
            </ListItemText>
          </ListItem>
        ) : (
          <ListItem dense>
            <ListItemText style={{ color: '#777777', fontSize: 12 }}>
              Completed
            </ListItemText>
          </ListItem>
        )}
      </Box>
      <TableContainer className={classes.container}>
        {job && !error && fetched ? (
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
            stickyHeader>
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              result={job}
              stageName={stageName}
              maxCol={maxCol}
            />
            <TableBody>
              {stableSort(job, getComparator(order, orderBy))
                .filter((e) =>
                  e.submission.submission_name
                    .toString()
                    .toLowerCase()
                    .includes(filterCriteria.toLowerCase())
                )
                .map((row, index) => {
                  console.log(row)
                  const labelId = `enhanced-table-checkbox-${index}`
                  let cell_stage = []
                  for (let i = 0; i < row.reports.length; i++) {
                    cell_stage.push(
                      <TableCell
                        hover={true}
                        label={row.reports[i].stage_id}
                        style={{ cursor: 'pointer' }}
                        to={
                          '/result/job/' +
                          row.job_id +
                          '/stage/' +
                          row.reports[i].stage_id
                        }
                        component={Link}
                        align="center"
                        onClick={(event) => {
                          handleCellClick(event, row, row.reports[i].stage_id)
                        }}>
                        <Tooltip title={row.reports[i].status}>
                          <Button fullWidth={true} size="large">
                            {
                              // TODO: add cell for stages after failed
                              typeof row.reports[i].status !== 'undefined' ? (
                                row.reports[i].status === 'success' ? (
                                  <div>
                                    <CheckCircle style={{ color: 'green' }} />
                                    {row.reports[i].report_summary &&
                                      row.reports[
                                        i
                                      ].report_summary.hasOwnProperty(
                                        'score'
                                      ) &&
                                      row.reports[
                                        i
                                      ].report_summary.hasOwnProperty(
                                        'maxScore'
                                      ) && (
                                        <div>
                                          {row.reports[i].report_summary.score +
                                            '/' +
                                            row.reports[i].report_summary
                                              .maxScore}
                                        </div>
                                      )}
                                  </div>
                                ) : row.reports[i].status === 'pending' ? (
                                  <ClipLoader
                                    color={'#3f51b5'}
                                    loading={true}
                                    size={24}
                                  />
                                ) : row.reports[i].status === 'failed' ? (
                                  <CancelIcon color="secondary" />
                                ) : (
                                  <RemoveCircleIcon />
                                )
                              ) : (
                                ''
                              )
                            }
                          </Button>
                        </Tooltip>
                      </TableCell>
                    )
                  }
                  for (let i = 0; i < maxCol - row.reports.length; i++) {
                    cell_stage.push(
                      <TableCell align="center">
                        <Tooltip title="in queue">
                          <HourglassEmptyIcon color="#ffea00" />
                        </Tooltip>
                      </TableCell>
                    )
                  }

                  return (
                    <TableRow
                      tabIndex={-1}
                      key={row.submission.submission_name}>
                      {
                        // TODO: Set onClick
                      }
                      <TableCell
                        label={row.submission.submission_name}
                        align="center">
                        {row.submission.submission_name}
                      </TableCell>
                      {cell_stage}
                    </TableRow>
                  )
                })}
            </TableBody>
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
