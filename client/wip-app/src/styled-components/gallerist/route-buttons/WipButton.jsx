import React from 'react';
import { useNavigate } from "react-router-dom";

import { Button } from 'rebass'

function GalleristWipButton (props) {

  let navigate = useNavigate(); 
  const WipRouteChange = () => { 
    let path = `/g/wip/${props.wip_title}`; 
    navigate(path);
  }

  return (
    <Button variant='outline' mr={2} onClick={WipRouteChange}>{props.wip_title}</Button>
  )
}

export default GalleristWipButton;