import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Box from '@material-ui/core/Box'
import { Link } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

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

  console.log('expanding!')
  return (
    <Box margin={1}>
      <Table>
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
                    {JSON.stringify(row.result, null, 2).replace(/\\n/gm, '\n')}
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
                      JSON.stringify(err, null, 2).replace(/\\n/gm, '\n')
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
                Screenshot:
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    setReportImg({
                      ...reportImg,
                      name: row.screenshotPath,
                      path: reportImg.paths.indexOf(row.screenshotPath)
                    })
                    handleImgDialogOpen()
                  }}>
                  {row.screenshotPath}
                </Link>
              </Typography>
            </TableCell>
          </TableRow>
        ) : null}
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
