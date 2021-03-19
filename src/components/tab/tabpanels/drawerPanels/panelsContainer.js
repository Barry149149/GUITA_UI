import Box from "@material-ui/core/Box";
import Configuration from "./ConfigPanel";
import TreePanel from "./TreePanel";
import ModePanel from "./ModePanel";
import ResultPanel from "./ResultPanel";
import React from "react";
import SubmitPanel from "./SubmitPanel";


export default function PanelsContainer(props){
    const {drawerValue,config,setConfig,state,resultData,setResultData,tabValue,setTabValue, dispatch, createConfig, setCreateConfig, jobBatch, setJobBatch}=props
    return (
        <React.Fragment>
            <Box p={3}/>
            <TreePanel
                drawerValue={drawerValue}
                selectedCase={state.present.selectedCase}
                tree={state.present.tree}
                createdCases={state.present.createdCases}
                noOfCases={state.present.noOfCases}
                dispatch={dispatch}
            />
            <Configuration
                drawerValue={drawerValue}
                config={config}
                setConfig={setConfig}
                createConfig={createConfig}
                ssetCreateConfig={setCreateConfig}
            />
            <SubmitPanel
                drawerValue={drawerValue}
                jobBatch={jobBatch}
                setJobBatch={setJobBatch}
            />
            <ResultPanel
                resultData={resultData}
                setResultData={setResultData}
                drawerValue={drawerValue}
            />

        </React.Fragment>
    )
}