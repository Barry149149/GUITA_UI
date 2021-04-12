import { Box, Divider, FormControl, MenuItem, Select } from '@material-ui/core'
import { commandDescription, commandList } from '../../../docs/commandList'
import Form from '@rjsf/material-ui'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Title from '../../Title'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(2.5),
    minWidth: 120
  },
  form: {
    minHeight: 180,
    marginTop: 0,
    width: 300
  }
}))

export default function CommandForm(props) {
  const classes = useStyles()

  useEffect(() => {
    console.log(props.selectedCase)
  })

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Title>Command Form</Title>
        <Box p={1} />
        <div id="select_command">
          <Select
            onChange={(e) => {
              //Should be update through this onChange
              props.setCmdSchema({
                ...props.cmdSchema,
                command: e.target.value,
                schema: commandList.find((x) => x.command === e.target.value)
                  .schema
              })
              props.setFormData({})
            }}
            value={props.cmdSchema.command}>
            {commandList.map(({ index, command }) => {
              return (
                <MenuItem key={index} value={command}>
                  {command}
                </MenuItem>
              )
            })}
          </Select>
        </div>
      </FormControl>
      <Divider />
      <div style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
        <Form
          classes={classes.form}
          schema={props.cmdSchema.schema}
          formData={props.formData}
          onChange={(e) => {
            props.setFormData(e.formData)
          }}
          onSubmit={(e) => {
            let tempDescription
            if (!e.formData.description) {
              tempDescription = commandDescription({
                command: props.cmdSchema.command,
                ...e.formData
              })
            } else {
              tempDescription = e.formData.description
            }

            if (props.cmdSchema.command === 'None') {
              return
            }
            let newNodes = [...props.tree[0].nodes]
            newNodes.find((x) => x.id === props.selectedCase.id).json = [
              ...props.selectedCase.json,
              {
                command: props.cmdSchema.command,
                ...e.formData,
                description: tempDescription
              }
            ]
            newNodes.find((x) => x.id === props.selectedCase.id).json_id = [
              ...props.selectedCase.json_id,
              {
                id: props.selectedCase.json.length,
                command: {
                  command: props.cmdSchema.command,
                  ...e.formData,
                  description: tempDescription
                }
              }
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
                  json: [
                    ...props.selectedCase.json,
                    {
                      command: props.cmdSchema.command,
                      ...e.formData,
                      description: tempDescription
                    }
                  ],
                  json_id: [
                    ...props.selectedCase.json_id,
                    {
                      id: props.selectedCase.json.length,
                      command: {
                        command: props.cmdSchema.command,
                        ...e.formData,
                        description: tempDescription
                      }
                    }
                  ]
                }
              }
            })
          }}
        />
      </div>
    </div>
  )
}
