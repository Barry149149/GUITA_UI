import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import React, { useEffect } from 'react'
import { commandDescription } from '../../docs/commandList'

export default function JsonEditor(props) {
  useEffect(() => {
    return console.log(props.tree)
  })

  return (
    <React.Fragment>
      <JSONInput
        id="a_unique_id"
        locale={locale}
        width="100%"
        height="600px"
        placeholder={props.selectedCase.json}
        colors={
          props.style.darkTheme
            ? {
                default: '#D4D4D4',
                background: '#1E1E1E',
                background_warning: '#1E1E1E',
                string: '#CE8453',
                number: '#B5CE9F',
                colon: '#49B8F7',
                keys: '#9CDCFE',
                keys_whiteSpace: '#AF74A5',
                primitive: '#6392C6'
              }
            : {
                default: '#000000',
                background: '#FFFFFF',
                background_warning: '#FEECEB',
                string: '#FA7921',
                number: '#70CE35',
                colon: '#0978B7',
                keys: '#097598',
                keys_whiteSpace: '#835FB6',
                primitive: '#386FA4'
              }
        }
        style={{
          body: {
            fontSize: props.style.fontSize,
            fontWeight: 800
          }
        }}
        onChange={(e) => {
          if (!e.error) {
            let new_json_id = []
            if (e.jsObject === undefined || e.jsObject === '') {
              return
            }

            //TODO:Dont know why add description automatically will cause crash

            for (let i = 0; i < e.jsObject.length; i++) {
              new_json_id.push({
                id: i,
                command: {
                  ...e.jsObject[i],
                  description:
                    typeof e.jsObject[i].description === 'undefined' ||
                    !e.jsObject[i].description
                      ? commandDescription(e.jsObject[i])
                      : e.jsObject[i].description
                }
              })
            }

            let newNodes = [...props.tree[0].nodes]
            newNodes.find((x) => x.id === props.selectedCase.id).json =
              e.jsObject
            newNodes.find(
              (x) => x.id === props.selectedCase.id
            ).json_id = new_json_id

            props.dispatch({
              data: {
                tree: [
                  {
                    value: 'Test Cases',
                    nodes: newNodes
                  }
                ],
                createdCases: props.createdCases,
                noOfCases: props.noOfCases,
                selectedCase: {
                  ...props.selectedCase,
                  json: e.jsObject,
                  json_id: new_json_id
                }
              }
            })
          }
        }}
      />
    </React.Fragment>
  )
}

/*
    let tempDescription=null
                            if(typeof e.jsObject[i].description==='undefined') {
                                if(typeof e.jsObject[i].setVariable!=='undefined') tempDescription =e.jsObject[i].setVariable
                                else if(typeof e.jsObject[i].widgetName!=='undefined') tempDescription =e.jsObject[i].widgetName
                                else if(typeof e.jsObject[i].widget!=='undefined') tempDescription =e.jsObject[i].widget.value
                                else if(typeof e.jsObject[i].time!=='undefined') tempDescription =e.jsObject[i].time
                                else if(typeof e.jsObject[i].value!=='undefined') tempDescription = e.jsObject[i].value
                                else tempDescription=' '
                            }

                            new_json_id.push({
                                id: i,
                                command: {
                                    ...e.jsObject[i],
                                    description:(tempDescription==null)?e.jsObject[i].description:JSON.stringify(tempDescription).replace(/\"/g, ""),
                                },
                            })
 */
