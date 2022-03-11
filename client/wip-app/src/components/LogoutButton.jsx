import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Text } from "rebass";

function LogoutButton() {
  let navigate = useNavigate();
  const logoutRouteChange = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <Button mr={2} onClick={logoutRouteChange} backgroundColor="#33e">
      <Text>logout.</Text>
    </Button>
  );
}

export default LogoutButton;
