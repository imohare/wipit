// import ArtistWipsButton from "../styled-components/artist/route-buttons/WipsButton";
import LogoutButton from "../components/LogoutButton";
import { Box, Button, Container, Flex, Text, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtistCollectionForm from "../components/ArtistCollectionForm";
import ArtistCardForm from "../components/ArtistCardForm";
import { useContext, useState } from "react";
import { CollectionContext } from "../userContext";
const nftBanner = require("../assets/nft.png");

function ArtistProfile(): JSX.Element {
  return (
    <>
      {/* <ArtistWipsButton /> */}
      <Container
        maxW="container.xl"
        h="50vh"
        backgroundImage={nftBanner}
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
      <Wrap m={8}>
        <Flex direction={"column"}>
          <Box
            p={3}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={"md"}
          >
            <Text fontSize={"24"} fontWeight={"bold"}>
              @ELIZA_BLAKEMORE
            </Text>
            <Text fontWeight={"bold"}>260</Text>
            <Text>Followers</Text>
          </Box>
          <ArtistCollectionForm />
          <ArtistCardForm />
        </Flex>
        <Box>
          <Text
            borderBottomWidth={"2px"}
            borderColor="grey"
            fontSize={"24"}
            fontWeight={"bold"}
            ml={8}
          >
            Collections
          </Text>
        </Box>
      </Wrap>
    </>
  );
}

export default ArtistProfile;
