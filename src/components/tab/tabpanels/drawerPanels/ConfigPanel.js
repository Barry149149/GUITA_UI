import Title from '../../../Title'
import { Divider } from '@material-ui/core'
import React from 'react'
import TabPanel from '../Tabpanel'

export default function Configuration(props) {
  return (
    <TabPanel id="tabPanel_config" value={props.drawerValue} index={2}>
      <Title>Configuration</Title>
      <Divider />
      <br />
    </TabPanel>
  )
}
