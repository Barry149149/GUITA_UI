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
import { Chip, Paper, Tooltip } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { getCommandDescription, TOKEN_TYPE } from '../../../docs/commandList'
import { CommandDescriptionText } from '../../BaseRow'
import { TableRowStyle } from '../../../style/mystyle'

const useStyles = makeStyles(() => ({
  root: {},
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
  ...TableRowStyle
}))

export function Row(props) {
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

  const classes = useStyles({ isItemOpened })

  const screenshotPath = () => {
    if (!row.screenshotPath) return null
    return `/uploads/job/${jobData.job_id}/report/${jobData.stage_id}/${row.screenshotPath}`
  }

  function ImageThumbnail({ imgPath }) {
    return (
      <img
        className={classes.thumbnail}
        src={imgPath}
        onClick={(e) => {
          e.stopPropagation()
          setReportImg({
            ...reportImg,
            name: row.screenshotPath,
            path: reportImg.paths.indexOf(row.screenshotPath)
          })
          handleImgDialogOpen()
        }}
      />
    )
  }

  function ResultIcon({ status }) {
    const chipStyle = {
      success: [CheckCircle, 'seagreen'],
      failed: [CancelIcon, 'orangered'],
      aborted: [CancelIcon, 'lightgrey']
    }
    return ((IconType, color) => {
      return <IconType style={{ color: color }} />
    })(
      ...(status in chipStyle ? [...chipStyle[status]] : [status, 'lightgrey'])
    )
  }

  return (
    <React.Fragment>
      <TableRow
        className={classes.mainContainer}
        hover
        tabIndex={-1}
        key={row.commandId}
        onClick={(e) => handleOpenClick(e, row.commandId)}>
        <TableCell className={classes.commandId}>{row.commandId}</TableCell>
        <TableCell className={classes.thumbnailCell}>
          {screenshotPath() ? (
            <ImageThumbnail imgPath={screenshotPath()} />
          ) : null}
        </TableCell>
        <TableCell>
          <Box className={classes.commandName}>{row.command}</Box>
          <div className={classes.commandDescription}>
            {row.parameters.description ? (
              row.parameters.description
            ) : row.fullCommand ? (
              <CommandDescriptionText command={row.fullCommand} />
            ) : null}
          </div>
        </TableCell>
        <TableCell align="center">
          <ResultIcon status={row.status} />
        </TableCell>
        <TableCell align="center">
          <div className={classes.score}>
            {row.maxScore > 0 && row.score + '/' + row.maxScore}
          </div>
        </TableCell>
        <TableCell className={classes.openButton} align="right">
          <IconButton
            id="button_expandRow"
            size="small"
            className={classes.openButton}
            onClick={(e) => handleOpenClick(e, row.commandId)}>
            {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.detailContainer} colSpan={6}>
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
