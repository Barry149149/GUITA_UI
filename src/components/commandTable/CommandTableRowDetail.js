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

const useStyles = makeStyles(() => ({
  ...DetailPaneStyle
}))

function DetailSection({ header, items }) {
  function DetailSectionBody({ items }) {
    return (
      <Grid item sm={12} md={9} lg={10}>
        <div style={{ paddingLeft: '10px' }}>
          {Object.entries(items).map(([key, val]) => {
            return typeof val === 'object' ? (
              <div>
                <div className={classes.parameter}>{key}:</div>
                <DetailSectionBody items={val} />
              </div>
            ) : (
              <div className={classes.parameter}>
                {key === 'setVariable' ? '' : `${key}: `}
                {val ? val : 'none'}
              </div>
            )
          })}
        </div>
      </Grid>
    )
  }

  const classes = useStyles()

  return (
    <Grid container>
      <Grid item sm={12} md={3} lg={2}>
        <div className={classes.header}>{header}</div>
      </Grid>
      <DetailSectionBody items={items} />
    </Grid>
  )
}

export function CommandTableRowDetail({ row }) {
  const [parameters, setVariable, misc] = (() => {
    const param = {}
    const setVar = {}
    const misc = {}
    Object.entries(row.command).forEach(([key, val]) => {
      if (key === 'command') return
      else if (key === 'setVariable') {
        setVar[key] = val
      } else if (['weight', 'description', 'driver'].includes(key)) {
        misc[key] = val
      } else {
        param[key] = val
      }
    })
    return [param, setVar, misc]
  })()

  const classes = useStyles()

  return (
    <Box margin={0} className={classes.container}>
      <DetailSection header="Parameters" items={parameters} />
      {Object.keys(setVariable).length ? (
        <Divider variant="fullWidth" className={classes.divider} />
      ) : null}
      {Object.keys(setVariable).length ? (
        <DetailSection header="Set Variable" items={setVariable} />
      ) : null}
      {Object.keys(misc).length ? (
        <Divider variant="fullWidth" className={classes.divider} />
      ) : null}
      {Object.keys(misc).length ? (
        <DetailSection header="Misc." items={misc} />
      ) : null}
    </Box>
  )
}
