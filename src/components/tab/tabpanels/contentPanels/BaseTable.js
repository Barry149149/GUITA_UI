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
  tableContainer: {
    // height: "100%",
    width: '100%',
    overflowY: 'hidden',
    padding: 24,
    paddingLeft: 32,
    paddingRight: 32,
    display: 'flex',
    flexDirection: 'column'
  }
}))

export function BaseTable({ table }) {
  const classes = useStyles()
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Paper className={classes.tableContainer}>{table}</Paper>
    </Container>
  )
}
