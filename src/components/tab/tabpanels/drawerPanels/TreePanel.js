import Title from "../../../Title";
import {Divider} from "@material-ui/core";
import CaseTree from "../../testCaseTree/CaseTree";
import TabPanel from "../Tabpanel";
import React from "react";

export default function TreePanel(props){
    return (
        <TabPanel
        id="tabPanel_caseTree"
        value={props.drawerValue}
        index={0}>
            <Title>Test Cases</Title>
            <Divider/>
            <CaseTree
                selectedCase={props.selectedCase}
                tree={props.tree}
                createdCases={props.createdCases}
                noOfCases={props.noOfCases}
                dispatch={props.dispatch}
            />
        </TabPanel>
    )
}