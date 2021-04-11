import Title from '../../../Title'
import { Divider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import TabPanel from '../Tabpanel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  readOnlyBox: {
    width: 160,
    maxWidth: 160,
    minWidth: 160
  },
  uploadButton: {
    height: 40,
    width: 80,
    maxWidth: 80,
    minWidth: 80
  }
}))

export default function SubmitPanel(props) {
  const { drawerValue, jobBatch, setJobBatch, state } = props

  const classes = useStyles()

  const [file, setFile] = useState({
    zip_filename: null,
    zip: null
  })

  const handleSubmitJobBatch = async () => {
    let aData = new FormData()

    aData.append('submission_file', file.zip)

    // SubmissionBatch
    const response = await fetch(
      '/api/v2/assignment/' + jobBatch.assignment_id + '/submission_batch',
      {
        method: 'POST',
        body: aData
      }
    )
    const data = await response.json()

    // Testcase
    const tData = new FormData()
    for (let index = 0; index < state.present.tree[0].nodes.length; index++) {
      tData.append(
        'testcase_name',
        'testcase' + state.present.tree[0].nodes[index].id
      )
      const fileData = JSON.stringify(state.present.tree[0].nodes[index].json)
      const blob = new Blob([fileData], { type: 'application/json' })
      tData.append(
        'testcase_file',
        blob,
        'testcase' + state.present.tree[0].nodes[index].id + '.json'
      )
    }

    fetch('/api/v2/assignment/' + jobBatch.assignment_id + '/testcase', {
      method: 'POST',
      body: tData
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error))

    // JobBatch
    fetch('/api/v2/job_batch', {
      method: 'POST',
      body: JSON.stringify({
        assignment_id: jobBatch.assignment_id,
        submission_batch_id: data.submission_batch_id,
        job_config_id: jobBatch.job_config_id
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <Route exact path="/">
      <Box p={3}>
        <Title>Job Batch Submission</Title>
        <Divider />
        <div style={{ height: 50, paddingLeft: 8 }}>
          <Box pt={3} />
          <TextField
            size="small"
            className={classes.readOnlyBox}
            label=""
            value={file.zip_filename}
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <Button
            className={classes.uploadButton}
            id="button_upload"
            variant="outlined"
            component="label"
            color="primary"
            onClick={() => {}}>
            Upload
            <input
              type="file"
              id="file"
              name="file"
              accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
              hidden
              onChange={(e) => {
                setFile({
                  ...file,
                  zip_filename: e.target.files[0].name,
                  zip: e.target.files[0]
                })

                setJobBatch({
                  ...jobBatch,
                  zip_filename: e.target.files[0].name
                })
                e.target.value = null
              }}
            />
          </Button>
          <p style={{ fontSize: 12, color: '#888888' }}>
            {' '}
            Upload the Student Submission{' '}
          </p>
          <Box pt={3} />
          <div style={{ width: '100%' }}>
            <TextField
              size="small"
              className={classes.detailBox}
              label=""
              value={jobBatch.assignment_name}
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
            <br />
            <TextField
              size="small"
              className={classes.detailBox}
              label=""
              value={jobBatch.job_config_name}
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
            <br />
            <TextField
              size="small"
              className={classes.detailBox}
              label=""
              value={jobBatch.zip_filename}
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />
          </div>
          <br />
          <Box pt={3} />
          <Button
            id="button_delete"
            variant="outlined"
            color="primary"
            width={200}
            onClick={handleSubmitJobBatch}>
            Submit Job Batch
          </Button>
        </div>
      </Box>
    </Route>
  )
}
