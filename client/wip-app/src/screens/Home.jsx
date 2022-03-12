import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "rebass";
import logo from "../assets/wipit-logo-2.png";

function Home() {
  const [userType, setUserType] = useState(false);

  return (
    <>
      <Container>
        <Image src={logo} />
      </Container>
      <Stack alignItems={"center"} spacing={3}>
        <Box mt={50} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Text
            color="teal"
            justify="center"
            fontSize="4xl"
            fontWeight={"bold"}
          >
            Are you an Artist or a Gallerist?
          </Text>
          <Flex justify={"center"}>
            <Link to="/register" userType={userType}>
              <Button
                m={10}
                w="40"
                backgroundColor={"teal"}
                color="white"
                value="artist"
                onClick={() => setUserType(true)}
              >
                Artist
              </Button>
            </Link>
            <Button
              m={10}
              w="40"
              backgroundColor={"teal"}
              color="white"
              value="gallerist"
              onClick={() => setUserType(false)}
            >
              Gallerist
            </Button>
          </Flex>
        </Box>
      </Stack>
    </>
  );
}

export default Home;
