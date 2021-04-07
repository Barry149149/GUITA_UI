import Grid from "@material-ui/core/Grid";
import CommandTable from "../../../commandTable/CommandTable";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CommandForm from "../../../commandTable/commandForm/commandForm";
import TabPanel from "../Tabpanel";
import React, {useEffect, useState} from "react";



export default function TablePanel(props){
    const {tabValue,formOpen,state,setFormOpen,dispatch,width}=props

    const [cmdSchema,setCmdSchema]=useState({
        command:'None',
        schema: {
            "type":"object",
        },
        formData:''
    })
    const [formData,setFormData]=useState({})

    const [fetched, setFetched]=useState(false)

    const [testcaseJson, setTestcaseJson]=useState([])

    useEffect(()=>{
        if(props.selectedAssignment){
            console.log(props.selectedAssignment)
            fetch('/api/v2/assignment/'+props.selectedAssignment+'/testcase').then(response => response.json())
            .then(data => {
                console.log(data)
                for(let i = 0;i<data.length; i++) {
                    fetch('/uploads/assignment/'+props.selectedAssignment+'/testcase/'+data[i].testcase_id+'.json').then(response => response.json()).then( data => {
                        console.log(data);
                        let tempTestcase = testcaseJson;
                        tempTestcase.push(data);
                        setTestcaseJson(tempTestcase);
                    })
                }
            })
        } else {
            setFetched(true)
        }
    },[fetched])

    return(
        <TabPanel value={tabValue} index={0}>
            <div style={(width<1080)?{
                width:'100%'
            }:{
                display: 'flex',
                flexGrow: 1,
                margin:0,
                width:'100%',
            }}>
               {(fetched)?
                    <div id="commandTable" style={(width<1080)?{width:'100%'}:((!formOpen)?{width:'100%'}:{width:'69%'})}>
                        <CommandTable
                            selectedCase={state.present.selectedCase}
                            formOpen={formOpen}
                            setFormOpen={setFormOpen}
                            tree={state.present.tree}
                            createdCases={state.present.createdCases}
                            noOfCases={state.present.noOfCases}
                            dispatch={dispatch}
                        />
                    </div>
                    :null}
                {(formOpen)?
                    <React.Fragment>
                    <div style={(width<1080)?{height:'20px'}:{width:'2%'}}/>
                    <Grow in={formOpen} timeout={(formOpen) ? 1000 : 0}>
                        <div style={(width<1080)?{width:'100%'}:{width:'29%'}}>
                            <Paper id="commandForm" elevation={3} >
                                <Box pt={1}/>
                                <Tooltip title="Close" style={{float: "right"}}>
                                    <Button onClick={() => {
                                        setFormOpen(false)
                                    }} variant='small'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path
                                                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                                        </svg>
                                    </Button>
                                </Tooltip>
                                <CommandForm
                                    selectedCase={state.present.selectedCase}
                                    cmdSchema={cmdSchema}
                                    setCmdSchema={setCmdSchema}
                                    tree={state.present.tree}
                                    formData={formData}
                                    setFormData={setFormData}
                                    createdCases={state.present.createdCases}
                                    noOfCases={state.present.noOfCases}
                                    dispatch={dispatch}
                                />
                            </Paper>
                        </div>
                    </Grow>
                    </React.Fragment>
                        :null
                }
            </div>
        </TabPanel>
    )
}