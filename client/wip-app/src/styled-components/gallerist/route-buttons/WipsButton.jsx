import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'rebass'

function GalleristWipsButton () {

  let navigate = useNavigate(); 
  const WipsRouteChange = () =>{ 
    let path = `/g/wips`; 
    navigate(path);
  }

  return (
    <Button backgroundColor="#33e" mr={2} onClick={WipsRouteChange} >wips.</Button>
  )
}

export default GalleristWipsButton;