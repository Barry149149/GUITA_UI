import StageTable from "../stageTable/stageTable";
import Grow from "@material-ui/core/Grow";
import StageForm from "../stageTable/stageForm";
import Grid from "@material-ui/core/Grid";
import StageSelect from "../stageTable/stageSelect";
import Box from "@material-ui/core/Box";
import React, { useEffect } from "react";
import {useParams} from 'react-router-dom'

export default function StagePage(props){

    let {configId,configName}=useParams()

    const {
        width,
        contentWidth,
        stage,
        stageFormOpen,
        setStage,
        setStageFormOpen,
        stageSelectOpen,
        setStageSelectOpen,
        createConfig,
        setCreateConfig,
        selectedJobConfig,
        selectedJobConfigName,
        createdStage,
        setCreatedStage,
        state,
        setDrawerOpen
    }=props

    useEffect(()=>{
        setDrawerOpen(false)
    })
    return(
        <Box p={3}>
            <div style={(width<1080)?{
                width:'100%'
            }:{
                display: 'flex',
                flexGrow: 1,
                margin:0,
                width:'100%',
            }}>
                <div id="commandTable" style={(contentWidth<1080)?{width:'100%'}:((!stageFormOpen)?{width:'100%'}:{width:'69%'})}>
                    <StageTable
                        stage={stage}
                        setStage={setStage}
                        stageFormOpen={stageFormOpen}
                        setStageFormOpen={setStageFormOpen}
                        stageSelectOpen={stageSelectOpen}
                        setStageSelectOpen={setStageSelectOpen}
                        createConfig={createConfig}
                        setCreateConfig={setCreateConfig}
                        selectedJobConfig={selectedJobConfig}
                        selectedJobConfigName={selectedJobConfigName}
                        configId={configId}
                        configName={configName}
                    />
                </div>
                <div style={{height:'20px',width:'2%'}}/>
                {(stageFormOpen)?
                    <Grow in={stageFormOpen} timeout={(stageFormOpen) ? 1000 : 0}>
                        <div style={(contentWidth<1080)?{width:'100%'}:{width:'29%'}}>
                            <StageForm
                                stage={stage}
                                setStage={setStage}
                                stageFormOpen={stageFormOpen}
                                setStageFormOpen={setStageFormOpen}
                                createdStage={createdStage}
                                setCreatedStage={setCreatedStage}
                                testcases={state.present.tree[0].nodes}
                            />
                        </div>
                    </Grow>
                    :null}
                {(stageSelectOpen)?
                    <Grow in={stageSelectOpen} timeout={(stageSelectOpen) ? 1000 : 0}>
                        <Grid item xs={3}>
                            <StageSelect
                                stage={stage}
                                setStage={setStage}
                                stageSelectOpen={stageSelectOpen}
                                setStageSelectOpen={setStageSelectOpen}
                                createdStage={createdStage}
                                setCreatedStage={setCreatedStage}
                                testcases={state.present.tree[0].nodes}
                            />
                        </Grid>
                    </Grow>
                    :null}
            </div>
        </Box>
    )
}