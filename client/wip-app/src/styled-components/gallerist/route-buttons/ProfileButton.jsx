import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'rebass'

function GalleristProfileButton () {

  let navigate = useNavigate(); 
  const profileRouteChange = () =>{ 
    let path = `/g`; 
    navigate(path);
  }

  return (
    <Button backgroundColor="#33e" mr={2} onClick={profileRouteChange} >profile.</Button>
  )
}

export default GalleristProfileButton;