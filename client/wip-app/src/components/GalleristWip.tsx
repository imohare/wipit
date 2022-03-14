import { useState, useEffect } from "react";
import methods from "../services";
import { useParams } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
// import { Button, Text } from "rebass";
// import GalleristProfileButton from "../styled-components/gallerist/route-buttons/ProfileButton";
import GalleristCardList from "../styled-components/gallerist/lists/GalleristCardList";
import GalleristWipsButton from "../styled-components/gallerist/route-buttons/WipsButton";
import {Box, Text, Flex, Center, Button } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';

function GalleristWip() {
  type wipType = {
    wip_title: string;
    wip_cards: [any];
    update_request: string;
    update_request_date: string;
  };

  const { title } = useParams();
  const [wip, setWip] = useState<wipType | null>(null);

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        console.log(response);
        const wip = response.filter((card: any | null) =>
          card.wip_title.includes(title)
        )[0];
        setWip(wip);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error occured.");
      });
  }, [title]);

  // console.log(wip);
  // wip_title: {type: String, required: true},
  // wip_cards: [cardSchema],
  // update_request: String,
  // update_request_date: String,

  const handleClick = () => {
    // methods.updateRequest(wip._id, 'true');
  };

  // let navigate = useNavigate();
  // const profileRouteChange = () =>{
  //   let path = `/g`
  //   navigate(path);
  // }

  return (
    <div>
      {/* <GalleristProfileButton /> */}
      {/* <Button backgroundColor="#33e" mr={2} onClick={profileRouteChange} >profile.</Button> */}
      <Link to="/g">
        <Button backgroundColor="teal" color="white" variant="outline" mr={2}>
          profile.
        </Button>
      </Link>
      {/* <Button backgroundColor="#33e" mr={2} onClick={WipsRouteChange} >wips.</Button> */}
      {/* let path = `/g/wips`;
      navigate(path); */}
      {/* <GalleristWipsButton /> */}
      <Link to="/g/wips">
        <Button backgroundColor="teal" color="white" variant="outline" mr={2}>

        </Button>
      </Link>
      <LogoutButton />
      {/* {wip.wip_cards ? (
        <GalleristCardList cards={wip.wip_cards} wip={wip}></GalleristCardList>
      ) : null}
      {wip.update_request === "false" ? (
        <Button backgroundColor="#33e" mr={2} onClick={handleClick}>
          {" "}
          Request Update{" "}
        </Button>
      ) : (
        <Text> You have requested an update</Text>
      )} */}
    </div>
  );
}

export default GalleristWip;
