import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Box from '@material-ui/core/Box'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DetailPaneStyle } from '../../style/mystyle'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { RowDetailBody } from '../BaseRow'

const useStyles = makeStyles(() => ({
  ...DetailPaneStyle
}))

function DetailSection({ header, items }) {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item sm={12} md={3} lg={2}>
        <div className={classes.header}>{header}</div>
      </Grid>
      <RowDetailBody items={items} />
    </Grid>
  )
}

export function StageTableRowDetail({ row }) {
  const classes = useStyles()

  // I don't know how to pop item from javascript object and I had this snippet lying around so... -.-
  const meta = (() => {
    const meta = {}
    Object.entries(row.json).forEach(([key, val]) => {
      if (key !== 'stage_config') meta[key] = val
    })
    return meta
  })()

  return (
    <Box margin={0} className={classes.container}>
      <DetailSection header="Stage Config" items={row.json.stage_config} />
      <Divider variant="fullWidth" className={classes.divider} />
      <DetailSection header="Meta" items={meta} />
    </Box>
  )
}
