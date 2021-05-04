import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // alignItems: "center",
    // alignItems: "stretch",
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    display: 'flex',
    padding: 36
  },
  grid: {
    padding: 0,
    flexGrow: 1,
    height: '100%'
  },
  tableContainer: {
    height: '100%',
    padding: 24,
    paddingLeft: 32,
    paddingRight: 16,
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    height: '100%',
    padding: 24,
    paddingLeft: 16,
    paddingRight: 16
  }
}))

export function BaseTableWithForm({ table, form }) {
  const classes = useStyles()

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8} xl={9} className={classes.grid}>
          <Paper className={classes.tableContainer}>{table}</Paper>
        </Grid>
        <Grid item xs={12} lg={4} xl={3} className={classes.grid}>
          <Paper className={classes.formContainer}>{form}</Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
