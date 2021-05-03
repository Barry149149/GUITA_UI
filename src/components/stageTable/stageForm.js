import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Toolbar,
  Input,
  OutlinedInput
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
import IconButton from '@material-ui/core/IconButton'
import { FormStyle } from '../../style/mystyle'

const useStyle = makeStyles((theme) => ({
  ...FormStyle,
  slider: {
    width: 150
  },
  formControl: {
    // width: 42
    paddingTop: 12,
    paddingBottom: 12
    // paddingLeft: 12,
    // paddingRight: 12
  },
  stageFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "flex-start",
    paddingTop: 12,
    // height: "100%",
    flexGrow: 1
  },
  paper: {
    overflowX: 'visible',
    minWidth: 250
  },
  title: {
    flex: '1 1 100%'
  }
}))

export default function StageForm(props) {
  const classes = useStyle()
  const [error, setError] = useState({ message: '' })
  const [newStage, setNewStage] = useState({
    stage_name: null,
    priority: null,
    stage_config: {},
    testcase_id: null
  })
  const [fetched, setFetched] = useState(false)
  const [testcase, setTestcase] = useState([])
  useEffect(() => {
    console.log(props.stage)
  })

  useEffect(() => {
    fetch('/api/v2/assignment/' + props.selectedAssignment + '/testcase', {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((result) => result.json())
      .then((data) => {
        let tempTestcase = []
        for (let i = 0; i < data.length; i++) {
          tempTestcase.push(data[i])
        }
        setTestcase(tempTestcase)
      })
      .then(setFetched(true))
  }, [fetched])

  return (
    <div className={classes.form}>
      <Toolbar className={classes.titleBar}>
        <Typography color="primary" component="h2" variant="h6">
          Stage Form
        </Typography>
        <Tooltip title="Close">
          <IconButton
            className={classes.closeButton}
            onClick={() => props.setStageFormOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <div className={classes.stageFormContainer}>
        <FormControl className={classes.formControl}>
          <TextField
            id="stage_name"
            label="Stage Name"
            required={true}
            onChange={(e) =>
              setNewStage({
                ...newStage,
                stage_name: e.target.value
              })
            }
          />
        </FormControl>
        <FormControl className={classes.formControl} required={true}>
          <TextField
            label="Priority"
            value={newStage.priority}
            required={true}
            onChange={(e) =>
              setNewStage({
                ...newStage,
                priority: e.target.value === '' ? '' : Number(e.target.value)
              })
            }
            inputProps={{
              step: 1,
              min: 1,
              max: 50,
              type: 'number',
              'aria-labelledby': 'input-slider'
            }}
          />
        </FormControl>
        {fetched && (
          <FormControl className={classes.formControl}>
            <TextField
              select
              label="Test Case"
              value={newStage.testcase_id}
              onChange={(e) => {
                setNewStage({
                  ...newStage,
                  assignment_id: props.selectedAssignment,
                  testcase_id: e.target.value
                })
              }}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {testcase.map((row) => (
                <MenuItem value={row.testcase_id}>{row.testcase_name}</MenuItem>
              ))}
            </TextField>
          </FormControl>
        )}
        <Divider style={{ marginTop: 12 }} variant="light" />
        <div
          style={{
            color: 'gray',
            fontSize: '16px',
            paddingTop: 12,
            paddingBottom: 12
          }}>
          Configuration
        </div>
        <div style={{ flex: 1, marginBottom: 12 }}>
          <JSONInput
            locale={locale}
            colors={{
              default: '#000000',
              background: 'white',
              background_warning: '#FEECEB',
              string: 'orangered',
              number: 'green',
              colon: '#0978B7',
              keys: '#006d8e',
              keys_whiteSpace: '#835FB6',
              primitive: '#386FA4',
              error: 'red'
            }}
            style={{
              outerBox: {
                borderTop: '1px solid',
                borderTopColor: 'gray',
                borderBottom: '1px solid',
                borderBottomColor: 'gray'
              },
              labelColumn: {
                width: 32,
                backgroundColor: '#f9f9f9',
                color: 'dimgray'
              },
              body: {
                fontSize: '13px'
                // fontWeight: "bold"
              }
            }}
            placeholder={{
              image: '',
              jobType: '',
              stopTimeout: 60,
              abortOnError: false
            }}
            width="100%"
            height="100%"
            onChange={(e) => {
              if (!e.error) {
                setNewStage({
                  ...newStage,
                  stage_config: e.jsObject
                })
              }
            }}
          />
        </div>
        {
          //TODO: Sync Test Case
        }

        <FormControl>
          <Button
            color="primary"
            variant="contained"
            style={{ width: 100 }}
            onClick={() => {
              if (newStage.stage_name && newStage.priority) {
                setError({ message: '' })
                props.setStage([
                  ...props.stage,
                  {
                    id: props.createdStage,
                    json: newStage
                  }
                ])
                props.setCreatedStage(props.createdStage + 1)
              } else {
                if (!newStage.priority)
                  setError({ message: 'Missing Priority' })
                if (!newStage.stage_name)
                  setError({ message: 'Missing Stage Name' })
              }
            }}>
            Submit
          </Button>
        </FormControl>
        {error.message ? <p style={{ color: 'red' }}>{error.message}</p> : null}
      </div>
    </div>
  )
}
