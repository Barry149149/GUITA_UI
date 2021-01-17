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
        index={1}>
            <Title>Case Tree</Title>
            <Divider/>
            <CaseTree
                selectedCase={props.selectedCase}
                setSelectedCase={props.setSelectedCase}
                tree={props.tree}
                setTree={props.setTree}
                createdCases={props.createdCases}
                setCreatedCases={props.setCreatedCases}
                noOfCases={props.noOfCases}
                setNoOfCases={props.setNoOfCases}
            />
        </TabPanel>
    )
}