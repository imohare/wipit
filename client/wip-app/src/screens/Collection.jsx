import { Button, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
const nftBanner2 = require("../assets/nft (2).jpeg");

function Collection() {
  return (
    <>
      <Container
        maxW="container.2xl"
        h="50vh"
        backgroundImage={nftBanner2}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Link to="/">
          {/* Change to gallery button */}
          <Button backgroundColor="teal" color="white" mr={2}>
            wips.
          </Button>
        </Link>

        <LogoutButton />
      </Container>
    </>
  );
}

export default Collection;
