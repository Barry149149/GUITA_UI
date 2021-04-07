import TabPanel from "../Tabpanel";
import Grid from "@material-ui/core/Grid";
import JsonEditor from "../../../jsonEditor/jsonEditor";
import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function JsonEditorPanel(props){
    const {classes,tabValue,style,state,dispatch}=props

    return(
        <TabPanel value={tabValue} index={1}>
            <JsonEditor
                selectedCase={state.present.selectedCase}
                style={style}
                tree={state.present.tree}
                createdCases={state.present.createdCases}
                noOfCases={state.present.noOfCases}
                dispatch={dispatch}
            />
            <Box pt={6}/>
        </TabPanel>
    )
}