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
import { DetailPaneStyle } from '../../../style/mystyle'
import { RowDetailBody } from '../../BaseRow'

const useStyles = makeStyles(() => ({
  ...DetailPaneStyle,
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
  }
}))

export function ReportRowDetail({ row, setSvEImg }) {
  const classes = useStyles()

  function Parameters({ params }) {
    return (
      <Grid container>
        <Grid item sm={12} md={3} lg={2}>
          <div className={classes.header}>Parameters</div>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          <RowDetailBody items={params} />
        </Grid>
      </Grid>
    )
  }

  function Result({ result }) {
    const [open, setOpen] = useState(false)

    return (
      <Grid container>
        <Grid item sm={12} md={3} lg={2}>
          <div className={classes.header}>Result</div>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          <div className={classes.parameter}>
            <span className={classes.emph}>{result.value.toString()}</span>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {open && (
              <RowDetailBody
                items={result}
                topLevelFieldsToIgnore={['value']}
              />
            )}
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
            {error.detail && (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
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
