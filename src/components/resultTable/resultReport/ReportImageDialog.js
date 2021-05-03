import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Container from '@material-ui/core/Container'
import Slider from '@material-ui/core/Slider'
import React, { useState } from 'react'

export function ReportImageDialog(props) {
  const { open, title, handleClose, jobData, reportImg, setReportImg } = props
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <div
        style={{
          overflow: 'hidden'
        }}>
        <DialogTitle>{reportImg.paths[reportImg.path]}</DialogTitle>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            margin: 0
          }}>
          <Button
            disabled={0 === reportImg.path}
            onClick={() => {
              if (reportImg.path > 0) {
                setReportImg({
                  ...reportImg,
                  path: reportImg.path - 1
                })
              }
            }}>
            <KeyboardArrowLeftIcon />
          </Button>
          <div
            style={{
              width: '100%'
            }}>
            <img
              src={
                '/uploads/job/' +
                jobData.job_id +
                '/report/' +
                jobData.stage_id +
                '/' +
                reportImg.paths[reportImg.path]
              }
              width="100%"
              height="100%"
            />
          </div>
          <Button
            disabled={reportImg.paths.length - 1 === reportImg.path}
            onClick={() => {
              if (reportImg.path < reportImg.paths.length - 1) {
                setReportImg({
                  ...reportImg,
                  path: reportImg.path + 1
                })
              }
            }}>
            <KeyboardArrowRightIcon />
          </Button>
        </div>
        <Container>
          <Slider
            value={reportImg.path + 1}
            step={1}
            marksf
            min={0}
            max={reportImg.paths.length - 1}
            onChange={(e, value) => {
              setReportImg({
                ...reportImg,
                path: value
              })
            }}
            valueLabelDisplay="auto"
          />
        </Container>
      </div>
    </Dialog>
  )
}
