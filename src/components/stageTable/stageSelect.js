import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Input
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Title from '../Title'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from '@material-ui/icons/Close'

const useStyle = makeStyles((theme) => ({
  slider: {
    width: 150
  },
  input: {
    width: 42
  },
  form: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    minWidth: 150
  },
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    overflowX: 'visible',
    minWidth: 250
  },
  title: {
    flex: '1 1 100%'
  }
}))

export default function StageSelect(props) {
  const classes = useStyle()
  const [error, setError] = useState({ message: '' })
  const [newStage, setNewStage] = useState({
    stage_name: null,
    priority: null,
    stage_config: {},
    testcase_id: null
  })
  useEffect(() => {
    console.log(props.stage)
  })
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Toolbar>
          <Typography
            className={classes.title}
            color="primary"
            component="h2"
            variant="h6">
            Stage Form
          </Typography>
          <Tooltip title="Close Form">
            <Button onClick={() => props.setStageSelectOpen(false)}>
              <CloseIcon />
            </Button>
          </Tooltip>
        </Toolbar>
        <Divider />
        <div className={classes.container}></div>
      </Paper>
    </React.Fragment>
  )
}
