import React, { useState } from 'react'
import MuiTreeView from 'material-ui-treeview'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Box from '@material-ui/core/Box'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonGroup, Divider } from '@material-ui/core'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import IconButton from '@material-ui/core/IconButton'
import { Tooltip } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  button_container: {
    width: 260
  }
})

export default function CaseTree(props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [warningOpen, setWarningOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [addOpen, setAddOpen] = React.useState(false)
  const [caseName, setCaseName] = useState('')

  const handleWarningOpen = () => {
    if (props.tree[0].nodes.length <= 1) {
      setWarningOpen(true)
    } else {
      setOpen(true)
    }
  }

  const handleWarningClose = () => {
    setWarningOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirmClose = () => {
    setConfirmOpen(false)
  }

  return (
    <div>
      <Box pt={2} />
      <ButtonGroup
        className={classes.button_container}
        id="button_caseTree"
        variant="outlined">
        <Tooltip title="Add">
          <IconButton
            size="small"
            id="button_add"
            variant="outlined"
            color="primary"
            onClick={() => setAddOpen(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            id="button_delete"
            variant="outlined"
            color="primary"
            onClick={handleWarningOpen}>
            <RemoveIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <div
        style={{
          overflow: 'auto',
          // maxHeight: 400,
          // height: 400,
          width: 270
        }}>
        <MuiTreeView
          defaultExpanded
          tree={props.tree}
          onLeafClick={(e) => {
            if (e.id === props.selectedCase.id) return
            props.dispatch({
              data: {
                tree: props.tree,
                createdCases: props.createdCases,
                noOfCases: props.noOfCases,
                selectedCase: {
                  id: e.id,
                  json: props.tree[0].nodes.find((x) => x.id === e.id).json,
                  json_id: props.tree[0].nodes.find((x) => x.id === e.id)
                    .json_id,
                  value: props.tree[0].nodes.find((x) => x.id === e.id).value
                }
              }
            })
          }}
        />
      </div>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>{'Confirm Open Test Case'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The following file(s) will be open:
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmClose} color="primary" autofocus>
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {props.selectedCase.value}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              let newNodes = [...props.tree[0].nodes]
              let newNoOfCases = props.noOfCases
              for (let i = 0; i < newNodes.length; i++) {
                if (newNodes[i].id === props.selectedCase.id) {
                  newNodes.splice(i, 1)
                  i--
                  newNoOfCases--
                }
              }
              props.dispatch({
                data: {
                  tree: [
                    {
                      value: 'Test Cases',
                      nodes: newNodes
                    }
                  ],
                  createdCases: props.createdCases,
                  noOfCases: newNoOfCases,
                  selectedCase: {
                    id: props.tree[0].nodes[0].id,
                    value: props.tree[0].nodes[0].value,
                    json: props.tree[0].nodes[0].json,
                    json_id: props.tree[0].nodes[0].json_id
                  }
                }
              })
              if (
                props.tree[0].nodes.find((x) => x.id === props.selectedCase.id)
                  .testcase_id !== null ||
                typeof props.tree[0].nodes.find(
                  (x) => x.id === props.selectedCase.id
                ).testcase_id != 'undefined'
              ) {
                let tempDelete = props.deletedTestcase
                tempDelete.push(
                  props.tree[0].nodes.find(
                    (x) => x.id === props.selectedCase.id
                  ).testcase_id
                )
                props.setDeletedTestcase(tempDelete)
                console.log(tempDelete)
              }
              handleClose()
            }}
            color="secondary"
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={warningOpen} onClose={handleClose}>
        <DialogTitle>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot delete the last test case
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWarningClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addOpen}>
        <DialogTitle>Add new test case</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input the name for the new test case
          </DialogContentText>
          Name:
          <TextField
            onChange={(e) => {
              setCaseName(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={caseName == false}
            onClick={() => {
              props.dispatch({
                data: {
                  tree: [
                    {
                      value: 'Test Cases',
                      nodes: [
                        ...props.tree[0].nodes,
                        {
                          id: props.createdCases + 1,
                          value: caseName,
                          json: [],
                          json_id: []
                        }
                      ]
                    }
                  ],
                  createdCases: props.createdCases + 1,
                  noOfCases: props.noOfCases + 1,
                  selectedCase: {
                    id: props.createdCases + 1,
                    value: caseName,
                    json: [],
                    json_id: []
                  }
                }
              })
              setAddOpen(false)
            }}>
            Submit
          </Button>
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
