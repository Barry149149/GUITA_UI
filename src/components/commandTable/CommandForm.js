import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { commandDescription, commandSchema } from '../../docs/commandList'
import Form from '@rjsf/material-ui'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Title from '../Title'
import drawerTab from '../tab/drawerTab'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'

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

function CustomArrayFieldTemplate(props) {
  return (
    <div className={props.className}>
      <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.54)' }}>
        {`${props.title} ${props.required ? '*' : ''}`}
      </div>
      {props.items &&
        props.items.map((element) => {
          // console.log(element.children)
          return (
            <div>
              {element.children}
              <div style={{ padding: 4 }}></div>
              {/*  Adding margin/padding to the outer div doesn't work arrrrrr*/}
            </div>
          )
        })}
      <div style={{ float: 'right' }}>
        {props.canAdd && (
          <IconButton onClick={props.onAddClick} size="small">
            <AddIcon />
          </IconButton>
        )}
        {props.items && (
          <IconButton
            onClick={(e) => {
              const last = props.items[props.items.length - 1]
              last.onDropIndexClick(last.index)(e)
            }}
            size="small">
            <RemoveIcon />
          </IconButton>
        )}
      </div>
    </div>
  )
}

const uiSchema = {
  'ui:order': [
    '*', // all undefined ones come here.
    'weight',
    'description'
  ]
}

export default function CommandForm(props) {
  const classes = useStyles()

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Title>Command Form</Title>
        <Box p={1} />
        <div id="select_command">
          <Select
            style={{ marginLeft: 6, fontSize: 'large', fontWeight: 'bold' }}
            onChange={(e) => {
              //Should be update through this onChange
              props.setCmdSchema({
                ...props.cmdSchema,
                command: e.target.value,
                schema: commandSchema[e.target.value].schema
              })
              props.setFormData({})
            }}
            value={props.cmdSchema.command}>
            {Object.keys(commandSchema).map((command) => {
              return (
                <MenuItem key={`${command}-selector`} value={command}>
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
          uiSchema={uiSchema}
          ArrayFieldTemplate={CustomArrayFieldTemplate}
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
