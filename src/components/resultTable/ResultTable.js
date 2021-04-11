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
import { TextField } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import { Link } from 'react-router-dom'

function descendingComparator(a, b, orderBy) {
  if (orderBy == 'created_at') {
    if (Date.parse(b[orderBy]) < Date.parse(a[orderBy])) {
      return -1
    }
    if (Date.parse(b[orderBy]) > Date.parse(a[orderBy])) {
      return 1
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
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
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  const headCells = [
    { id: 'assignment_name', numeric: false, label: 'Assignment Name' },
    { id: 'created_at', numeric: false, label: 'Submitted At' },
    { id: 'job_config_name', numeric: false, label: 'Job Config Name' },
    // TODO: get zip
    { id: 'zip_filename', numeric: false, label: 'Submission Batch' }
  ]

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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

export default function ResultTable(props) {
  const { setResultStep, setJobData, jobData, result, setResult } = props

  const classes = useStyles()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('assignment_name')
  const [filterCriteria, setFilterCriteria] = useState('')
  const [fetched, setFetched] = useState(false)
  const [selected, setSelected] = useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleRowClick = (event, row) => {
    setJobData({
      ...jobData,
      job_batch_id: row.job_batch_id,
      assignment_name: row.assignment.assignment_name,
      created_at: row.created_at
    })
    console.log(row)
    setResultStep(1)
  }

  useEffect(() => {
    //TODO: change to correct path
    props.setDrawerOpen(false)
    fetch(
      '/api/v2/job_batch?assignment=true&job_config=true&submission_batch=true',
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const array = []
        for (const value of data) {
          array.push(value)
        }
        setResult(array)
        setFetched(true)
      })
  }, [])

  return (
    <div className={classes.root}>
      <ResultTableToolbar
        table="Job Batch List"
        classes={classes}
        setFilterCriteria={setFilterCriteria}
      />
      <TableContainer className={classes.container}>
        {fetched ? (
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
            />
            <TableBody>
              {stableSort(result, getComparator(order, orderBy))
                .filter((e) => {
                  console.log(e)
                  return (
                    e.assignment.assignment_name
                      .toString()
                      .toLowerCase()
                      .includes(filterCriteria.toLowerCase()) ||
                    e.created_at
                      .toLowerCase()
                      .includes(filterCriteria.toLowerCase())
                  )
                })
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  //const moment = require("moment-timezone");
                  return (
                    <Tooltip title={row.created_at}>
                      <TableRow
                        hover
                        style={{ cursor: 'pointer' }}
                        tabIndex={-1}
                        key={row.job_batch_id}
                        to={'/result/job batch/' + row.job_batch_id}
                        component={Link}
                        onClick={(event) => {
                          handleRowClick(event, row)
                        }}>
                        <TableCell>
                          {row.assignment !== null
                            ? row.assignment.assignment_name
                            : null}
                        </TableCell>
                        <TableCell>
                          {row.created_at !== null ? row.created_at : null}
                        </TableCell>
                        <TableCell>
                          {row.job_config !== null
                            ? row.job_config.job_config_name
                            : null}
                        </TableCell>
                        <TableCell>
                          {row.submission_batch !== null
                            ? row.submission_batch.zip_filename
                            : null}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  )
                })}
            </TableBody>
          </Table>
        ) : null}
      </TableContainer>
    </div>
  )
}
