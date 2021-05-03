import { getCommandDescription, TOKEN_TYPE } from '../docs/commandList'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TableRowStyle } from '../style/mystyle'

const useStyles = makeStyles(() => ({
  variable: {
    fontFamily: 'Inconsolata',
    color: 'steelblue'
  },
  stub: {
    color: 'lightgray',
    fontWeight: 'normal'
  }
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
