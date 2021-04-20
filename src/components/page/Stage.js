import StageTable from '../stageTable/stageTable'
import Grow from '@material-ui/core/Grow'
import StageForm from '../stageTable/stageForm'
import Grid from '@material-ui/core/Grid'
import StageSelect from '../stageTable/stageSelect'
import Box from '@material-ui/core/Box'
import React, { useEffect } from 'react'
import { Prompt, useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { BaseTableWithForm } from '../tab/tabpanels/contentPanels/BaseTableWithForm'
import { BaseTable } from '../tab/tabpanels/contentPanels/BaseTable'

export default function StagePage(props) {
  let { configId, configName } = useParams()

  const {
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
    setDrawerOpen,
    selectedAssignment
  } = props

  useEffect(() => {
    setDrawerOpen(false)
  })

  const stageForm = stageFormOpen && (
    <Grow in={stageFormOpen} timeout={stageFormOpen ? 1000 : 0}>
      <StageForm
        stage={stage}
        setStage={setStage}
        stageFormOpen={stageFormOpen}
        setStageFormOpen={setStageFormOpen}
        createdStage={createdStage}
        setCreatedStage={setCreatedStage}
        testcases={state.present.tree[0].nodes}
        selectedAssignment={selectedAssignment}
      />
    </Grow>
  )

  const stageSelect = stageSelectOpen && (
    <Grow in={stageSelectOpen} timeout={stageSelectOpen ? 1000 : 0}>
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
  )

  const stageTable = (
    <React.Fragment>
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
        selectedAssignment={selectedAssignment}
      />
      {stageSelect}
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <Prompt
        when={true}
        message={(p) => {
          if (p.pathname.includes('/config/' + configId + '/' + configName)) {
            return true
          } else {
            return 'All unsaved changes will be lost.'
          }
        }}
      />
      {stageFormOpen ? (
        <BaseTableWithForm table={stageTable} form={stageForm} />
      ) : (
        <BaseTable table={stageTable} />
      )}
    </React.Fragment>
  )
}
