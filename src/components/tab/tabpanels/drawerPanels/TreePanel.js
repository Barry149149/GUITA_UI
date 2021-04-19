import Title from '../../../Title'
import { ButtonGroup, Divider, Tooltip } from '@material-ui/core'
import CaseTree from '../../testCaseTree/CaseTree'
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Prompt, Route, useParams } from 'react-router-dom'
import NavigationBlocker from '../../../Prompt/Warning'
import { commandDescription } from '../../../../docs/commandList'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

const useStyles = makeStyles((theme) => ({
  readOnlyBox: {
    width: 160,
    maxWidth: 160,
    minWidth: 160
  },
  uploadButton: {
    height: 40,
    // overflowX: 'hidden',
    // overflow: 'hidden',
    textTransform: 'capitalize',
    // fontWeight: "bold",
    fontSize: '14px',
    minWidth: 220,
    backgroundColor: 'aliceblue'
    // color: "white"
    // border: "2px solid"
  },
  tooltip: {
    color: 'lightgray',
    marginLeft: 20
  },
  tooltipText: {
    // color: "red"
    padding: '8px',
    fontSize: '14px',
    lineHeight: '1.5em'
  },
  buttonWithTooltip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonGroup: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  panelBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '95%'
  }
}))

export default function TreePanel(props) {
  const classes = useStyles()

  let { assignment_id, assignment_name } = useParams()

  return (
    // Case tree width is 260
    <Box p={3} style={{ width: 260, height: '90%' }}>
      <Title>Test Cases</Title>
      <Divider />
      <div className={classes.panelBody}>
        <CaseTree
          selectedCase={props.selectedCase}
          tree={props.tree}
          createdCases={props.createdCases}
          noOfCases={props.noOfCases}
          dispatch={props.dispatch}
          assignment_name={assignment_name}
          setDeletedTestcase={props.setDeletedTestcase}
          deletedTestcase={props.deletedTestcase}
        />
        <div className={classes.buttonGroup}>
          <div>
            <div style={{ fontSize: 14, fontStyle: 'italic', padding: '6px' }}>
              {props.file.zip_filename ? (
                <div style={{ color: '#3f51b3' }}>
                  {props.file.zip_filename}
                </div>
              ) : (
                <div style={{ color: 'lightgray' }}>No file uploaded</div>
              )}
            </div>
            <div className={classes.buttonWithTooltip}>
              <Button
                className={classes.uploadButton}
                id="button_upload"
                variant="outlined"
                component="label"
                color="primary"
                // startIcon={<CloudUploadIcon/>}
                onClick={() => {}}>
                Upload Image File
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                  hidden
                  onChange={(e) => {
                    //TODO: submit img zip
                    props.setFile({
                      ...props.file,
                      zip_filename: e.target.files[0].name,
                      zip: e.target.files[0]
                    })
                    e.target.value = null
                  }}
                />
              </Button>
              <Tooltip
                className={classes.tooltip}
                title={
                  <div className={classes.tooltipText}>
                    Upload a ZIP of .png files for image comparisons
                  </div>
                }>
                <HelpOutlineIcon />
              </Tooltip>
            </div>
          </div>

          {/*<Box pt={1} />*/}
          {/*{*/}
          {/*  // TODO: not applicable format*/}
          {/*}*/}
          <div className={classes.buttonWithTooltip}>
            <Button
              // size="small"
              id="button_upload"
              variant="outlined"
              component="label"
              color="primary"
              // startIcon={<CloudUploadIcon/>}
              className={classes.uploadButton}
              onClick={() => {}}>
              Upload test cases file
              <input
                type="file"
                id="file"
                name="file"
                accept="application/octet-stream,application/zip-compressed,application/x-zip,application/x-zip-compressed"
                // TODO: Chrome accept also i.e. pptx, docx, xlsx, other browsers work fine
                hidden
                onChange={(e) => {
                  const promises = []

                  JSZip.loadAsync(e.target.files[0]).then(function (zip) {
                    zip.forEach(function (relativePath, zipEntry) {
                      promises.push(zip.file(zipEntry.name).async('string'))
                    })

                    Promise.all(promises).then(
                      function (data) {
                        let newNodes = [...props.tree[0].nodes]
                        console.log(data.length)
                        console.log(props.createdCases)
                        let last_jsObject = []
                        let last_new_json_id = []
                        let last_id = 0

                        for (const i in data) {
                          const jsObject = JSON.parse(data[i])
                          console.log(jsObject)

                          let new_json_id = []
                          let new_json = []
                          for (let j = 0; j < jsObject.length; j++) {
                            let tempDescription =
                              typeof jsObject[i].description === 'undefined'
                                ? commandDescription(jsObject[j])
                                : jsObject[i].description
                            new_json.push({
                              ...jsObject[i],
                              description: tempDescription
                            })
                            new_json_id.push({
                              id: j + 1,
                              command: {
                                ...jsObject[j],
                                description: tempDescription
                              }
                            })
                          }

                          newNodes.push({
                            id: props.createdCases + parseInt(i) + 1,
                            value:
                              'Test ' + (props.createdCases + parseInt(i) + 1),
                            json: new_json,
                            json_id: new_json_id
                          })

                          last_id = i
                          last_jsObject = new_json
                          last_new_json_id = new_json_id
                        }

                        props.dispatch({
                          data: {
                            tree: [
                              {
                                value: 'Test Cases',
                                nodes: newNodes
                              }
                            ],
                            createdCases: props.createdCases + data.length,
                            noOfCases: props.createdCases + data.length,
                            selectedCase: {
                              id: last_id,
                              json: last_jsObject,
                              json_id: last_new_json_id
                            }
                          }
                        })
                      },
                      function (err) {}
                    )
                  })
                  e.target.value = null
                }}
              />
            </Button>
            <Tooltip
              className={classes.tooltip}
              title={
                <div className={classes.tooltipText}>
                  All test case files should be placed under the root of the ZIP
                </div>
              }>
              <HelpOutlineIcon />
            </Tooltip>
          </div>
          <Divider variant="middle" />

          <Button
            className={classes.uploadButton}
            // size="small"
            id="button_download"
            variant="outlined"
            color="primary"
            // startIcon={<CloudDownloadIcon/>}
            onClick={() => {
              const zip = new JSZip()
              console.log(props.tree[0].nodes[0].json)
              for (const index in props.tree[0].nodes) {
                const fileData = JSON.stringify(props.tree[0].nodes[index].json)
                zip.file(props.tree[0].nodes[index].value + '.json', fileData)
              }
              zip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, 'testcases.zip')
              })
            }}>
            Download Test Cases File
          </Button>
        </div>
      </div>
    </Box>
  )
}
