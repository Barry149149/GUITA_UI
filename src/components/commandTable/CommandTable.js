import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import Toolbar from '@material-ui/core/Toolbar'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'
import { PlaylistAdd } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import { Divider, styled } from '@material-ui/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { CommandTableRow } from './CommandTableRow'
import { TableHeaderCellStyle } from '../../style/mystyle'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: '#FFFFFF'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark
        },
  title: {
    flex: '1 1 100%'
  },
  paper: {
    height: '90%'
    // backgroundColor: '#DDDDDD'
  },
  tableRow: {
    backgroundColor: '#FFFFFF',
    '&$selected, &$selected:hover': {
      backgroundColor: lighten(theme.palette.primary.light, 0.85)
    }
  },
  selected: {}
}))

export default function CommandTable(props) {
  const classes = useStyles()

  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState([])

  const selectAll = () => {
    let newSelected = []
    if (selected.length > 0) {
      setSelected([])
      return
    }
    for (let i = 0; i < props.selectedCase.json_id.length; i++) {
      newSelected.push(i)
    }
    setSelected(newSelected)
  }

  const openAll = () => {
    let newSelected = []
    if (open.length > 0) {
      setOpen([])
      return
    }
    for (let i = 0; i < props.selectedCase.json_id.length; i++) {
      newSelected.push(i)
    }
    setOpen(newSelected)
  }

  const deleteSelected = () => {
    let newJsonId = [],
      newJson = []
    for (let i = 0; i < props.selectedCase.json_id.length; i++) {
      if (selected.indexOf(props.selectedCase.json_id[i].id) === -1) {
        newJsonId.push(props.selectedCase.json_id[i])
        newJson.push(props.selectedCase.json[i])
      }
    }

    let newNodes = [...props.tree[0].nodes]
    newNodes.find((x) => x.id === props.selectedCase.id).json = newJson
    newNodes.find((x) => x.id === props.selectedCase.id).json_id = newJsonId

    props.dispatch({
      data: {
        tree: [
          {
            value: props.tree[0].value,
            nodes: newNodes
          }
        ],
        createdCases: props.createdCases,
        noOfCases: props.noOfCases,
        selectedCase: {
          ...props.selectedCase,
          json: newJson,
          json_id: newJsonId
        }
      }
    })

    setSelected([])
  }

  const duplicateSelected = () => {
    let commandDup = [],
      commandDup_id = [],
      duplicated = 1
    for (let i = 0; i < props.selectedCase.json_id.length; i++) {
      if (selected.indexOf(props.selectedCase.json_id[i].id) !== -1) {
        commandDup_id.push({
          id: props.selectedCase.json_id.length + duplicated - 1,
          command: props.selectedCase.json_id[i].command
        })
        commandDup.push(props.selectedCase.json[i])
        duplicated++
      }
    }

    let newNodes = [...props.tree[0].nodes]
    newNodes.find((x) => x.id === props.selectedCase.id).json = [
      ...props.selectedCase.json,
      ...commandDup
    ]
    newNodes.find((x) => x.id === props.selectedCase.id).json_id = [
      ...props.selectedCase.json_id,
      ...commandDup_id
    ]

    props.dispatch({
      data: {
        tree: [
          {
            value: props.tree[0].value,
            nodes: newNodes
          }
        ],
        createdCases: props.createdCases,
        noOfCases: props.noOfCases,
        selectedCase: {
          ...props.selectedCase,
          json: [...props.selectedCase.json, ...commandDup],
          json_id: [...props.selectedCase.json_id, ...commandDup_id]
        }
      }
    })

    setSelected([])
  }

  // useEffect(() => {
  //   console.log(props.selectedCase.json_id)
  // })

  const isSelected = (id) => selected.indexOf(id) !== -1
  const isOpen = (id) => open.indexOf(id) !== -1
  const numSelected = selected.length

  const StyledHeaderCell = styled(TableCell)({
    ...TableHeaderCellStyle
  })

  return (
    <div className={classes.paper}>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0
        })}>
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h7" color="primary">
            Command Table
          </Typography>
        )}
        {!(numSelected > 0) ? (
          <Tooltip title="Add">
            <Grow in={!(props.formOpen || numSelected > 0)}>
              <Button
                id="button_commandAdd"
                onClick={() => {
                  props.setFormOpen(true)
                }}>
                <PlaylistAdd />
              </Button>
            </Grow>
          </Tooltip>
        ) : (
          <React.Fragment>
            <Tooltip title="Duplicate">
              <Button onClick={duplicateSelected}>
                <FileCopyIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Delete">
              <Button onClick={deleteSelected}>
                <DeleteIcon />
              </Button>
            </Tooltip>
          </React.Fragment>
        )}
      </Toolbar>
      <Divider />
      <Table stickyHeader>
        <TableHead>
          <TableRow
            hover
            selected={
              props.selectedCase.json_id.length > 0 &&
              props.selectedCase.json_id.length === selected.length
            }
            aria-checked={
              props.selectedCase.json_id.length > 0 &&
              props.selectedCase.json_id.length === selected.length
            }
            className={classes.tableRow}
            classes={{ selected: classes.selected }}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={
                  props.selectedCase.json_id.length > 0 &&
                  props.selectedCase.json_id.length === selected.length
                }
                color="primary"
                onChange={(event) => {
                  selectAll()
                }}
              />
            </TableCell>
            <StyledHeaderCell padding="checkbox">Step</StyledHeaderCell>
            <StyledHeaderCell align="left">Command</StyledHeaderCell>
            <StyledHeaderCell align="right" padding="checkbox">
              Weight
            </StyledHeaderCell>
            <TableCell align="right">
              <IconButton
                id="button_expandRow"
                size="small"
                onClick={(e) => openAll()}>
                {props.selectedCase.json_id.length > 0 &&
                props.selectedCase.json_id.length === open.length ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return

            let new_json_unordered = props.selectedCase.json_id
            const [removed] = new_json_unordered.splice(result.source.index, 1)
            new_json_unordered.splice(result.destination.index, 0, removed)

            let new_json_id = [],
              new_json = []
            for (let i = 0; i < new_json_unordered.length; i++) {
              new_json_id = [
                ...new_json_id,
                {
                  id: i,
                  command: new_json_unordered[i].command
                }
              ]
              new_json = [...new_json, new_json_unordered[i].command]
            }

            let newNodes = [...props.tree[0].nodes]
            newNodes.find((x) => x.id === props.selectedCase.id).json = new_json
            newNodes.find(
              (x) => x.id === props.selectedCase.id
            ).json_id = new_json_id

            props.dispatch({
              data: {
                tree: [
                  {
                    value: props.tree[0].value,
                    nodes: newNodes
                  }
                ],
                createdCases: props.createdCases,
                noOfCases: props.noOfCases,
                selectedCase: {
                  ...props.selectedCase,
                  json_id: new_json_id,
                  json: new_json
                }
              }
            })
          }}
          onBeforeDragStart={() => {
            open.length = 0
            selected.length = 0
          }}>
          <Droppable droppableId="1" type="Command">
            {(provided, snapshot) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {props.selectedCase.json_id.map((row, index) => {
                  const isItemOpened = isOpen(row.id)
                  const isItemSelected = isSelected(row.id)

                  return (
                    <React.Fragment>
                      <Draggable draggableId={`${row.id}`} index={index}>
                        {(provided, snapshot) => (
                          <CommandTableRow
                            selected={selected}
                            setSelected={setSelected}
                            open={open}
                            setOpen={setOpen}
                            row={row}
                            provided={provided}
                            index={index}
                            isItemSelected={isItemSelected}
                            isItemOpened={isItemOpened}
                            setFormOpen={props.setFormOpen}
                          />
                        )}
                      </Draggable>
                    </React.Fragment>
                  )
                })}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </div>
  )
}
