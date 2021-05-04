import { getCommandDescription, TOKEN_TYPE } from '../docs/commandList'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DetailPaneStyle, TableRowStyle } from '../style/mystyle'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() => ({
  variable: {
    fontFamily: 'Inconsolata',
    color: 'steelblue'
  },
  stub: {
    color: 'lightgray',
    fontWeight: 'normal'
  },
  ...DetailPaneStyle
}))

export function CommandDescriptionText({ command }) {
  const description = getCommandDescription(command)
  const classes = useStyles()
  return (
    <div>
      {
        // description.plainText
        description.stringAndFormatList.map(([token, token_type]) => {
          switch (token_type) {
            case TOKEN_TYPE.VARIABLE:
              return <span className={classes.variable}>{token} </span>
            case TOKEN_TYPE.STUB:
              return <span className={classes.stub}>{token} </span>
            default:
              return token + ' '
          }
        })
      }
    </div>
  )
}

// TODO Use this for CommandTableRowDetail too
export function RowDetailBody({ items, indent, topLevelFieldsToIgnore }) {
  const classes = useStyles()
  const leftPad = indent ? '10px' : '0'
  return (
    <div style={{ paddingLeft: leftPad }}>
      {Object.entries(items).map(([key, val]) => {
        if (topLevelFieldsToIgnore && topLevelFieldsToIgnore.includes(key))
          return null

        const isPrimitive = typeof val !== 'object'
        const isArrayOfPrimitive =
          Array.isArray(val) && !val.some((item) => typeof item === 'object')
        if (!val || isPrimitive || isArrayOfPrimitive)
          return (
            <div className={classes.parameter}>
              {key}: {val ? val.toString() : 'none'}
            </div>
          )
        else
          return (
            <div>
              <div className={classes.parameter}>{key}:</div>
              <RowDetailBody indent={true} items={val} />
            </div>
          )
      })}
    </div>
  )
}
