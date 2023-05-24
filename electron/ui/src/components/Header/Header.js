import './Header.css';
import React from 'react';
import {useEffect, useState} from 'react';   
import logo from "../../images/pareto-logo.png";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

 

export default function Header(props) {  
  const {showHeader, scenarios, index, handleSelection, navigateHome, compareScenarioIndexes, setCompareScenarioIndexes } = props
  const [ location, setLocation ] = useState("")

    const handleScenarioSelection = (event) => {
      handleSelection(event.target.value)
    }

    const handleComparisonScenarioSelection = (event) => {
      if(event.target.name === "primary") setCompareScenarioIndexes([event.target.value, compareScenarioIndexes[1]])
      else if (event.target.name === "reference") setCompareScenarioIndexes([compareScenarioIndexes[0], event.target.value])
    }

    useEffect(() => {
      let tempLocationSplit = window.location.href.split('/')
      let tempLocation = tempLocationSplit[tempLocationSplit.length-1]
      console.log('tempLocation = '+tempLocation)
      setLocation(tempLocation)
    }, [window.location.href])

    return (
      <>
      {showHeader && 
        <div id="Header">
        
        <div className="titlebar">
          <div href="#" style={{cursor:"pointer"}} onClick={navigateHome}>
            <div id="pareto_logo">
              <img src={logo} alt="PARETO Logo"/>
            </div>
          </div>
        {location === "scenario" &&
          <>
            <p style={{color:'#565656', fontSize: '20px', marginLeft:'75px'}}>Scenario</p>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <Select
              value={index === null ? "" : index}
              onChange={handleScenarioSelection}
              sx={{color:'#0b89b9', fontWeight: "bold"}}
            >
                {Object.entries(scenarios).map( ([key, value] ) => {
                  return <MenuItem key={key} value={key}>{value.name}</MenuItem>
                })}
            </Select>
            </FormControl>
            
            <Button id='user-name' sx={{color: "#0b89b9"}} onClick={navigateHome}>View Scenario List</Button>
          </>
        }
        {location === "compare" &&
          <>
            <p style={{color:'#565656', fontSize: '20px', marginLeft:'75px'}}>Primary Scenario</p>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <Select
              value={compareScenarioIndexes[0] === null ? "" : compareScenarioIndexes[0]}
              onChange={handleComparisonScenarioSelection}
              sx={{color:'#0b89b9', fontWeight: "bold"}}
              name={"primary"}
            >
                {Object.entries(scenarios).map( ([key, value] ) => {
                  if (Object.keys(value.results.data).length > 0) return <MenuItem key={key} value={key}>{value.name}</MenuItem>
                })}
            </Select>
            </FormControl>
            <p style={{color:'#565656', fontSize: '20px', marginLeft:'75px'}}>Reference Scenario</p>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <Select
              value={compareScenarioIndexes[1] === null ? "" : compareScenarioIndexes[1]}
              onChange={handleComparisonScenarioSelection}
              sx={{color:'#0b89b9', fontWeight: "bold"}}
              name={"reference"}
            >
                {Object.entries(scenarios).map( ([key, value] ) => {
                  if (Object.keys(value.results.data).length > 0) return <MenuItem key={key} value={key}>{value.name}</MenuItem>
                })}
            </Select>
            </FormControl>
            
            <Button id='user-name' sx={{color: "#0b89b9"}} onClick={navigateHome}>View Scenario List</Button>
          </>
        }
        </div>
      </div>
        }
        </>
      
    );
  
}
