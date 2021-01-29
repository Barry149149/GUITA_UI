import Box from "@material-ui/core/Box";
import Configuration from "./ConfigPanel";
import TreePanel from "./TreePanel";
import ModePanel from "./ModePanel";
import ResultPanel from "./ResultPanel";
import React from "react";


export default function PanelsContainer(props){
    const {drawerValue,config,setConfig,state,resultData,setResultData,tabValue,setTabValue, dispatch}=props
    return (
        <React.Fragment>
            <Box p={3}/>
            <Configuration
                drawerValue={drawerValue}
                config={config}
                setConfig={setConfig}
            />
            <TreePanel
                drawerValue={drawerValue}
                selectedCase={state.present.selectedCase}
                tree={state.present.tree}
                createdCases={state.present.createdCases}
                noOfCases={state.present.noOfCases}
                dispatch={dispatch}
            />
            <ModePanel
                drawerValue={drawerValue}
                tabValue={tabValue}
                setTabValue={setTabValue}
            />
            <ResultPanel
                resultData={resultData}
                setResultData={setResultData}
                drawerValue={drawerValue}
            />

        </React.Fragment>
    )
}