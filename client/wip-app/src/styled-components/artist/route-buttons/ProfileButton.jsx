import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button, Text } from 'rebass'

function ArtistProfileButton () {

  let navigate = useNavigate(); 
  const profileRouteChange = () =>{ 
    let path = `/a`; 
    navigate(path);
  }

  return (
    <Button mr={2} onClick={profileRouteChange} backgroundColor="#33e">
      <Text>
        profile.
      </Text>
    </Button>
  )
}

export default ArtistProfileButton;
