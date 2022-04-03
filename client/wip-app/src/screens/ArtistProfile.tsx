import LogoutButton from "../components/LogoutButton";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArtistCollectionForm from "../components/ArtistCollectionForm";
import ArtistCardForm from "../components/ArtistCardForm";
import { useContext, useEffect, useState } from "react";
import { WipCollectionContext, UserContext } from "../userContext";
import methods from "../services";
import GalleryButton from "../components/GalleryButton";
import "./artistProfile.css";
const nftBanner = require("../assets/nft.png");
const japanGirl = require("../assets/nft (3).jpeg");
const eyes = require("../assets/nft (4).jpeg");
const nftLady = require("../assets/nftlady.jpeg");
const duck = require("../assets/duck.jpeg");

function ArtistProfile(): JSX.Element {
  const { user } = useContext(UserContext);
  const { setWipCollection } = useContext(WipCollectionContext);
  const [followers, setFollowers] = useState(0);

  const apiCall = async () => {
    await methods
      .getWipCollectionByUser(user.profileId)
      .then((response) => {
        setWipCollection(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await methods.getFollowers(user.profileId).then((response) => {
      console.log(response);
      setFollowers(response.length);
    });
  };

  useEffect(() => {
    apiCall();
  }, []);

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
        <GalleryButton />
      </Container>
      <Flex direction="row" m={10}>
        <Flex direction={"column"} w="lg">
          <Box
            p={3}
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow={"md"}
          >
            <Text fontSize={"24"} fontWeight={"bold"}>
              {user?.name}
            </Text>
            {followers ? (
              <Text fontWeight={"bold"}>{followers}</Text>
            ) : (
              "no followers"
            )}

            <Text>Followers</Text>
          </Box>
          <ArtistCollectionForm />
          <ArtistCardForm />
        </Flex>

        <Flex justifyContent="flex-start" mt={2} direction="column">
          <Box>
            <Text
              borderBottomWidth={"2px"}
              borderColor="grey"
              fontSize={"24"}
              fontWeight={"bold"}
              ml={8}
              mb={1}
            >
              Collections
            </Text>
          </Box>
          <Flex direction={"row"} justify="space-between" mt={5}>
            <Wrap id="wrap-box-image">
              <Box
                id="box-image"
                ml={2}
                w="400px"
                h="275px"
                boxShadow="lg"
                rounded="7px"
                bg={"whiteAlpha.100"}
                overflow="hidden"
              >
                <Image src={japanGirl} alt="user Image" />
              </Box>

              <Box
                ml={2}
                w="400px"
                h="275px"
                boxShadow="lg"
                rounded="7px"
                bg={"whiteAlpha.100"}
                overflow="hidden"
              >
                <Image src={eyes} alt="user Image" />
              </Box>

              <Box
                ml={2}
                w="400px"
                h="275px"
                boxShadow="lg"
                rounded="7px"
                bg={"whiteAlpha.100"}
                overflow="hidden"
              >
                <Image src={nftLady} alt="user Image" />
              </Box>

              <Box
                ml={2}
                w="400px"
                h="275px"
                boxShadow="lg"
                rounded="7px"
                bg={"whiteAlpha.100"}
                overflow="hidden"
              >
                <Image src={duck} alt="user Image" />
              </Box>
            </Wrap>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default ArtistProfile;
