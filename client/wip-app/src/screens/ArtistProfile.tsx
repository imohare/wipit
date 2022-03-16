// import ArtistWipsButton from "../styled-components/artist/route-buttons/WipsButton";
import LogoutButton from "../components/LogoutButton";
import { Box, Button, Container, Flex, Text, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtistCollectionForm from "../components/ArtistCollectionForm";
import ArtistCardForm from "../components/ArtistCardForm";
import { useContext, useEffect, useState } from "react";
import { CollectionContext, UserContext } from "../userContext";
import WipItem from "../components/wipItem";
import { userInfo } from "os";
import methods from "../services";
const nftBanner = require("../assets/nft.png");

function ArtistProfile(): JSX.Element {
  const { user, setUser } = useContext(UserContext);

  // async const userFunction = ()=> {
  //   const userInfo = await methods.getUser(userLogin);
  //   let path = "";
  //   console.log("user created: ", userInfo);
  //   if (userInfo) {
  //     setUser(userInfo);
  //     path = path.concat(
  //       userInfo.type == "artist"
  //         ? `/a/${userInfo.profileId}`
  //         : `/g/${userInfo.profileId}`
  //     );
  // }

  useEffect(() => {}, []);
  return (
    <>
      {/* <ArtistWipsButton /> */}
      <Container
        maxW="container.2xl"
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
              {user.name}
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
            mb={10}
          >
            Collections
          </Text>
          <WipItem />
        </Box>
      </Wrap>
    </>
  );
}

export default ArtistProfile;
