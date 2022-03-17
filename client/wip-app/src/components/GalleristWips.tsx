import { useState, useEffect, useContext } from "react";
import methods from "../services";
import { Wrap, WrapItem, Button, ScaleFade } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { Box, Text, Flex, Center, Image } from "@chakra-ui/react";
import { UserContext } from "../userContext";
const gallery = require("../assets/gallery2.jpeg");
const addBtn = require("../assets/btn-add.svg").default;
const addedBtn = require("../assets/btn-added.svg").default;
const ballerina = require("../assets/nice-painting-from-artist.jpeg");
const nature = require("../assets/nature_painting.jpeg");
const art2 = require("../assets/art2.jpeg");
const fish = require("../assets/fish.jpeg");
const art3 = require("../assets/art3.webp");
const tiger = require("../assets/tiger.jpeg");

function GalleristWips(): JSX.Element {
  //mocking the images because their blob urls don't work
  const mockImages = [ballerina, nature, tiger, art2, fish, art3];

  interface wipCollectionInterface {
    wipCollectionTitle: String;
    Profile: {
      profileId: String;
      name: String;
      type: String;
      createdAt: String;
      updatedAt: String;
    };
    Wips: [
      {
        wipId: String;
        wipTitle: String;
        wipImage: string;
        uploadDate: String;
        wipCollectionId: String;
        createdAt: String;
        updatedAt: String;
      }
    ];
    added?: boolean;
  }

  const [wips, setWips] = useState<wipCollectionInterface[] | null>([]);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  let path = "";
  const profileRouteChange = () => {
    path = path.concat(
      user.type === "artist" ? `/a/${user.profileId}` : `/g/${user.profileId}`
    );
    navigate(path);
  };

  const addFollower = async (
    collection: wipCollectionInterface,
    index: number
  ) => {
    const copyWips = wips.slice();
    copyWips[index].added = !copyWips[index].added;
    setWips(copyWips);
    const result = await methods.addFollower(
      collection.Profile.profileId,
      user.profileId
    );
    console.log("this is result: ", result);
  };

  const apiCall = async () => {
    await methods
      .getWipCollections()
      .then((response) => {
        response.forEach((col: any) => (col.added = false));
        setWips(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);

  console.log(wips);

  return (
    <Box
      backgroundImage={gallery}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      height="100vh"
      w="full"
    >
      <Button
        m={2}
        backgroundColor="teal"
        color="white"
        onClick={profileRouteChange}
      >
        profile
      </Button>
      <Flex justifyContent="center" mt={130}>
        <Wrap justify="center">
          {wips.map((collection: any, index: number) => {
            return (
              <ScaleFade
                key={index}
                initialScale={0.9}
                in={true}
                whileHover={{ scale: 1.1 }}
              >
                <WrapItem>
                  <Box
                    marginTop="150px"
                    borderWidth="1px"
                    w="full"
                    marginX="10px"
                    background="rgba(255, 255, 255, .5)"
                    boxShadow="md"
                    borderRadius="lg"
                    pt="20px"
                    px="10px"
                    cursor="pointer"
                  >
                    <NavLink to="./users/:id">
                      <Center>
                        {/* <Image width='100px' src={collection.Wips[0].wipImage}/> */}
                        <Image width="200px" src={mockImages[index]} />
                      </Center>
                    </NavLink>
                    <Box display="flex" flexDirection="row" p="2">
                      <Button
                        background="transparent"
                        color="black"
                        opacity={1}
                        border="none"
                        onClick={() => addFollower(collection, index)}
                      >
                        {collection.added ? (
                          <Image src={addedBtn} />
                        ) : (
                          <Image src={addBtn} />
                        )}
                      </Button>
                      <Box mt="2">
                        <Text color="black" textAlign="center" fontSize="18px">
                          Author: {collection.Profile.name}{" "}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </WrapItem>
              </ScaleFade>
            );
          })}
        </Wrap>
      </Flex>
    </Box>
  );
}
export default GalleristWips;
