import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import { TableRowStyle } from '../../style/mystyle'
import { CommandDescriptionText } from '../BaseRow'
import Collapse from '@material-ui/core/Collapse'
import { CommandTableRowDetail } from './CommandTableRowDetail'

const useStyles = makeStyles(() => ({
  ...TableRowStyle,
  selected: {
    // backgroundColor: 'blue'
  }
}))

export function CommandTableRow({
  selected,
  setSelected,
  open,
  setOpen,
  row,
  provided,
  index,
  isItemSelected,
  isItemOpened,
  setFormOpen
}) {
  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleOpenClick = (event, id) => {
    const openedIndex = open.indexOf(id)
    let newSelected = []

    if (openedIndex === -1) {
      newSelected = newSelected.concat(open, id)
    } else if (openedIndex === 0) {
      newSelected = newSelected.concat(open.slice(1))
    } else if (openedIndex === open.length - 1) {
      newSelected = newSelected.concat(open.slice(0, -1))
    } else if (openedIndex > 0) {
      newSelected = newSelected.concat(
        open.slice(0, openedIndex),
        open.slice(openedIndex + 1)
      )
    }
    setOpen(newSelected)
  }

  const classes = useStyles({ isItemOpened })
  const command = row.command

  return (
    <React.Fragment>
      <TableRow
        hover
        key={row.id}
        aria-checked={isItemSelected}
        selected={isItemSelected}
        className={classes.mainContainer}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <TableCell padding="checkbox">
          <Checkbox
            id="checkbox_commandTableRow"
            checked={isItemSelected}
            color="primary"
            onChange={(event) => {
              setFormOpen(false)
              handleRowClick(event, row.id)
            }}
          />
        </TableCell>
        <TableCell className={classes.commandId}>{index + 1}</TableCell>

        <TableCell>
          <Box className={classes.commandName}>{command.command}</Box>
          <div className={classes.commandDescription}>
            {command.description ? (
              command.description
            ) : (
              <CommandDescriptionText command={row.command} />
            )}
          </div>
        </TableCell>
        <TableCell className={classes.score} align="center">
          {typeof row.command.weight === 'undefined' ? 1 : row.command.weight}
        </TableCell>
        <TableCell align="right">
          <IconButton
            id="button_expandRow"
            size="small"
            onClick={(e) => handleOpenClick(e, row.id)}>
            {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.detailContainer} colSpan={5}>
          <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
            <CommandTableRowDetail row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
