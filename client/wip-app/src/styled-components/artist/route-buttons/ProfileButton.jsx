import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'rebass'

function ArtistProfileButton () {

  let navigate = useNavigate(); 
  const profileRouteChange = () =>{ 
    let path = `/a`; 
    navigate(path);
  }

  return (
    <Button variant='outline' mr={2} onClick={profileRouteChange}>profile.</Button>
  )
}

export default ArtistProfileButton;