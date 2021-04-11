import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import { PlaylistAdd } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button_container: {
    width: 260
  }
}))

export default function CourseTree(props) {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()

  const [createAssignment, setCreateAssignment] = useState(false)

  const handleCreateAssignmentOpen = () => {
    setCreateAssignment(true)
  }
  const handleCreateAssignmentClose = () => {
    setCreateAssignment(false)
  }

  const handleCreateAssignment = (data) => {
    fetch('/api/v2/assignment', {
      method: 'POST',
      body: JSON.stringify({ assignment_name: data.assignmentName }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
    console.log(data.assignmentName)
    handleCreateAssignmentClose()
  }

  return (
    <div>
      <Button onClick={handleCreateAssignmentOpen}>
        <PlaylistAdd />
      </Button>
      <Dialog open={createAssignment} onClose={handleCreateAssignmentClose}>
        <DialogTitle>Create Assignment</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter assignment name.</DialogContentText>
          <form onSubmit={handleSubmit(handleCreateAssignment)}>
            <input name="assignmentName" ref={register({ required: true })} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateAssignmentClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(handleCreateAssignment)}
            color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
