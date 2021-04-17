import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Box from '@material-ui/core/Box'
import { Link } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(() => ({
  container: {
    // borderTopColor: "white",
    // borderTopWidth: 2,
    // borderTopStyle: "solid",
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    maxHeight: 650,
    padding: 20,
    color: 'dimgrey',
    backgroundColor: '#fbfbfb',
    fontFamily: 'Lato'
    // backgroundColor: "rgba(240, 248, 255, 0.5)"
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    lineHeight: '2em'
  },
  parameter: {
    lineHeight: '1.5em'
  },
  emph: {
    fontWeight: 'bold'
  },
  error: {
    color: 'orangered'
  },
  errorDetail: {
    color: 'orangered',
    fontSize: 'small',
    fontFamily: 'Monospace',
    wordWrap: 'break-word'
  },
  tableCell: {
    padding: '0px 8px'
  },
  divider: {
    margin: '12px 0px'
  }
}))

export function ReportRowDetail({
  row,
  reportImg,
  setReportImg,
  setSvEImg,
  handleImgDialogOpen
}) {
  const classes = useStyles()

  // const {row, reportImg, setReportImg} = props

  const [open, setOpen] = useState({
    result: false,
    error: false
  })

  function Parameters({ params }) {
    return (
      <Grid container>
        <Grid item sm={12} md={3} lg={2}>
          <div className={classes.header}>Parameters</div>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          {Object.entries(params).map(([key, val]) => {
            return (
              <div className={classes.parameter}>
                {key}: {val ? val : 'none'}
              </div>
            )
          })}
        </Grid>
      </Grid>
    )
  }

  function Result({ result }) {
    const [open, setOpen] = useState(false)
    const resultDetail = Object.entries(result).map(([key, val]) => {
      return key === 'value' ? null : (
        <div className={classes.parameter} key={key}>
          {key}: {val ? val : 'none'}
        </div>
      )
    })

    return (
      <Grid container>
        <Grid item sm={12} md={3} lg={2}>
          <div className={classes.header}>Result</div>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          <div className={classes.parameter}>
            <span className={classes.emph}>{result.value}</span>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {open ? resultDetail : null}
          </div>
        </Grid>
      </Grid>
    )
  }

  function Error({ error, idx, showIdx }) {
    const [open, setOpen] = useState(false)

    return (
      <Grid container>
        <Grid item sm={12} md={3} lg={2}>
          <div className={`${classes.header} ${classes.error}`}>
            {showIdx ? `Error #${idx}` : 'Error'}
          </div>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          <div className={classes.parameter}>
            <span className={`${classes.emph} ${classes.error}`}>
              {error.message}
            </span>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </div>
        </Grid>
        <Grid item>
          {open ? (
            <div className={classes.errorDetail}>{error.detail}</div>
          ) : null}
        </Grid>
      </Grid>
    )
  }

  return (
    <Box margin={0} className={classes.container}>
      <Parameters
        params={{
          ...row.parameters,
          driver: row.driver,
          setVariable: row.setVariable
        }}
      />
      <Divider variant="fullWidth" className={classes.divider} />
      {row.result ? <Result result={row.result} /> : null}
      {row.errors.length ? (
        <Error error={row.errors[0]} showIdx={false} />
      ) : null}
      <Table>
        {row.studentImgPath && row.expectedImgPath ? (
          <TableRow>
            <TableCell size="small" className={classes.tableCell}>
              <Typography variant="h8" gutterBottom component="div">
                Student v Expected Screenshot:
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    setSvEImg({
                      open: true,
                      student: row.studentImgPath,
                      expected: row.expectedImgPath
                    })
                  }}>
                  {row.studentImgPath + '& ...expected.png'}
                </Link>
              </Typography>
            </TableCell>
          </TableRow>
        ) : null}
      </Table>
    </Box>
  )
}
