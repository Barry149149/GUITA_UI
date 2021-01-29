import TabPanel from "../Tabpanel";
import Grid from "@material-ui/core/Grid";
import JsonEditor from "../../../jsonEditor/jsonEditor";
import React from "react";

export default function JsonEditorPanel(props){
    const {classes,tabValue,style,state,dispatch}=props

    return(
        <TabPanel value={tabValue} index={0}>
            <Grid  container spacing={2} justify='center' alignItems="stretch">
                <Grid item className={classes.container} xs={10} id="jsonEditor" >
                    <JsonEditor
                        selectedCase={state.present.selectedCase}
                        style={style}
                        tree={state.present.tree}
                        createdCases={state.present.createdCases}
                        noOfCases={state.present.noOfCases}
                        dispatch={dispatch}
                    />
                </Grid>
            </Grid>
        </TabPanel>
    )
}