import './Dashboard.css';
import React from 'react';
import {useEffect, useState} from 'react';   
import {  } from "react-router-dom";
import { Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import ProcessToolbar from '../../components/ProcessToolbar/ProcessToolbar'
import Bottombar from '../../components/Bottombar/Bottombar'; 
import DataInput from '../DataInput/DataInput'
import Optimization from '../Optimization/Optimization'
import ModelResults from '../ModelResults/ModelResults'
import Sidebar from '../../components/Sidebar/Sidebar'
import PopupModal from '../../components/PopupModal/PopupModal'
import { runModel } from '../../services/app.service'
import { useApp } from '../../AppContext';

export default function Dashboard(props) {
  const scenario = props.scenario
  const [ name, setName ] = useState('')
  const [ openEditName, setOpenEditName ] = useState(false)
  // const [ openSaveChanges, setOpenSaveChanges ] = useState(false)
  const [ inputDataEdited, setInputDataEdited ] = useState(false) 
  const [ disableOptimize, setDisableOptimize ] = useState(false)
  const enabledStatusList = ['Optimized','Draft','failure', 'Not Optimized', 'Infeasible']

  const handleOpenEditName = () => setOpenEditName(true);
  const handleCloseEditName = () => setOpenEditName(false);
  const { port } = useApp()

  useEffect(()=>{
    try {
      if(!scenario) {
        props.navigateHome()
      }
      setInputDataEdited(false)
      setName(scenario.name)
    }
    catch (e){
      console.error('unable to set scenario name: ',e)
    }
  }, [props, scenario]);

   const styles = {
    shiftTextLeft: {
      paddingLeft: '0px'
    },
    shiftTextRight: {
      paddingLeft: '240px',
      pb: 7
      // paddingTop: '184px'
    },
    titleDivider: {
      m:2, 
      marginTop:2
    },
   }

   const handleRunModel = () => {
      runModel(port, {"scenario": scenario})
      .then(r =>  r.json().then(data => ({status: r.status, body: data})))
      .then((response) => {
        let responseCode = response.status
        let data = response.body
        if(responseCode === 200) {
          props.updateScenario(data)
          props.updateAppState({action:'section',section:2},scenario.id)
          props.addTask(scenario.id)
        }
        else if(responseCode === 500) {
          console.error('error on model run: ',data.detail)
        }
      })
      .catch(e => {
        console.error('error on model run: ',e)
      })
   }

   const handleEditName = (event) => {
    setName(event.target.value)
   }

   const handleSaveName = () => {
    props.handleEditScenarioName(name, scenario.id, true)
    setOpenEditName(false)
  }
  
  return (
    <>
      <ProcessToolbar 
        handleSelection={props.handleSetSection} 
        selected={props.section} 
        scenario={scenario}
        category={props.category} 
        inputDataEdited={inputDataEdited}
        handleUpdateExcel={props.handleUpdateExcel}
        setInputDataEdited={setInputDataEdited}
        syncScenarioData={props.syncScenarioData}
      >
      </ProcessToolbar>
      {(props.section === 0 || (props.section === 2 && scenario.results.status.includes("Optimized"))) && 
        <Sidebar 
          handleSetCategory={props.handleSetCategory} 
          scenario={scenario} 
          section={props.section} 
          category={props.category} 
          inputDataEdited={inputDataEdited}
          handleUpdateExcel={props.handleUpdateExcel}
          setInputDataEdited={setInputDataEdited}
          syncScenarioData={props.syncScenarioData}
          >
        </Sidebar>
      }
      
    <Grid container spacing={1} sx={(props.section !== 1 && !(props.section === 2 && !scenario.results.status.includes("Optimized"))) ? styles.shiftTextRight : {}}>
      <Grid item xs={4} ></Grid>
      <PopupModal
        input
        open={openEditName}
        handleClose={handleCloseEditName}
        text={name}
        textLabel='Config Name'
        handleEditText={handleEditName}
        handleSave={handleSaveName}
        buttonText='Save'
        buttonColor='primary'
        buttonVariant='contained'
        width={400}
      />
      <Grid item xs={4}>
      <div>
        <b id='scenarioTitle' >
        {(scenario && props.section===0) && 
        <p>{scenario.name}
        <IconButton onClick={handleOpenEditName} style={{fontSize:"15px", zIndex:'0'}} disabled={enabledStatusList.includes(scenario.results.status) ? false : true}>
          <EditIcon fontSize='inherit'/>
        </IconButton>
        </p>
        }
      </b> 
      </div>
      </Grid>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={12}>
      {(scenario && props.section===0) &&
        <DataInput 
          handleUpdateExcel={props.handleUpdateExcel} 
          category={props.category} 
          scenario={scenario} 
          edited={inputDataEdited} 
          handleEditInput={setInputDataEdited}
          syncScenarioData={props.syncScenarioData}
          handleSetCategory={props.handleSetCategory} 
          updateScenario={props.updateScenario}
        />
      }
      {(scenario && props.section===1) && 
        <Optimization 
          category={props.category} 
          scenario={scenario} 
          updateScenario={props.updateScenario}
          handleRunModel={handleRunModel}
          backgroundTasks={props.backgroundTasks} 
          disabled={disableOptimize}
          setDisabled={setDisableOptimize}
        />
      }
      {(scenario && props.section===2) && 
        <ModelResults 
          category={props.category} 
          scenario={scenario} 
          handleSetSection={props.handleSetSection} 
          appState={props.appState}
          syncScenarioData={props.syncScenarioData}
          scenarios={props.scenarios}
          updateScenario={props.updateScenario}
          handleSetCategory={props.handleSetCategory} 
        />
      }
      </Grid>
    </Grid>
    <Bottombar 
      handleSelection={props.handleSetSection} 
      section={props.section} 
      backgroundTasks={props.backgroundTasks} 
      scenario={scenario} 
      category={props.category}
      handleUpdateExcel={props.handleUpdateExcel}
      inputDataEdited={inputDataEdited}
      setInputDataEdited={setInputDataEdited}
      syncScenarioData={props.syncScenarioData}
      handleRunModel={handleRunModel}
      disableOptimize={disableOptimize}
      setDisableOptimize={setDisableOptimize}
      copyAndRunOptimization={props.copyAndRunOptimization}
      />
    </>
  );

}


