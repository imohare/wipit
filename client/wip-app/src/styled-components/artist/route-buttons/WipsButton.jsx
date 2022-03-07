import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'rebass'

function ArtistWipsButton () {

  let navigate = useNavigate(); 
  const WipsRouteChange = () =>{ 
    let path = `/a/wips`; 
    navigate(path);
  }

  return (
    <Button variant='outline' mr={2} onClick={WipsRouteChange}>wips.</Button>
  )
}

export default ArtistWipsButton;