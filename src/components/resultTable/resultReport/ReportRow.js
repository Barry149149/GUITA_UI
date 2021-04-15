import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import { CheckCircle } from '@material-ui/icons'
import CancelIcon from '@material-ui/icons/Cancel'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Collapse from '@material-ui/core/Collapse'
import { ReportRowDetail } from './ReportRowDetail'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Tooltip } from '@material-ui/core'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(() => ({
  thumbnailCell: {
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  thumbnail: {
    maxHeight: '100px',
    maxWidth: '100px',
    textAlign: 'center',
    verticalAlign: 'middle',
    boxShadow: '2px 2px 4px lightgrey',
    '&:hover, &:focus': { boxShadow: '4px 4px 8px lightgrey' }
  },
  commandId: {
    color: 'gray'
  }
}))

export function Row(props) {
  const classes = useStyles()
  const {
    row,
    isOpen,
    handleOpenClick,
    jobData,
    setJobData,
    reportImg,
    setReportImg,
    setSvEImg,
    handleImgDialogOpen
  } = props

  const isItemOpened = isOpen(row.commandId)

  return (
    <React.Fragment>
      <TableRow
        hover
        style={{ cursor: 'pointer' }}
        tabIndex={-1}
        key={row.commandId}
        onClick={(e) => handleOpenClick(e, row.commandId)}>
        <TableCell className={classes.commandId}>{row.commandId}</TableCell>
        <TableCell className={classes.thumbnailCell}>
          <img
            className={classes.thumbnail}
            src={
              '/uploads/job/' +
              jobData.job_id +
              '/report/' +
              jobData.stage_id +
              '/' +
              reportImg.paths[row.commandId - 1]
            }
            onClick={(e) => {
              console.log('click on img')
              e.stopPropagation()
              setReportImg({
                ...reportImg,
                name: row.screenshotPath,
                path: reportImg.paths.indexOf(row.screenshotPath)
              })
              handleImgDialogOpen()
            }}
          />
        </TableCell>
        <TableCell>
          {row.command}
          <Typography
            style={{
              fontSize: 16,
              color: '#3f51b3',
              fontWeight: 'bold'
            }}>
            {row.parameters.description}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {row.status === 'success' ? (
            <CheckCircle style={{ color: 'green' }} />
          ) : row.status === 'failed' ? (
            <CancelIcon color="secondary" />
          ) : row.status === 'aborted' ? (
            <RemoveCircleIcon />
          ) : (
            row.status
          )}
          {row.maxScore > 0 && <div>{row.score + '/' + row.maxScore}</div>}
        </TableCell>
        <TableCell align="right">
          <IconButton
            id="button_expandRow"
            size="small"
            onClick={(e) => handleOpenClick(e, row.commandId)}>
            {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
            <ReportRowDetail
              row={row}
              reportImg={reportImg}
              setReportImg={setReportImg}
              setSvEImg={setSvEImg}
              handleImgDialogOpen={handleImgDialogOpen}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
