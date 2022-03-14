import {
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const logo = require("../assets/wipit-logo-2.png");

interface homeProps {
  setUserType: React.Dispatch<React.SetStateAction<string>>;
}

function Home({ setUserType }: homeProps): JSX.Element {
  return (
    <>
      <Container>
        <Image src={logo} />
      </Container>
      <Stack alignItems={"center"} spacing={3}>
        <Box
          mt={50}
          p={50}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow={"md"}
        >
          <Text
            color="teal"
            textAlign={"center"}
            fontSize="4xl"
            fontWeight={"bold"}
          >
            Are you an Artist or a Gallerist?
          </Text>
          <Flex justify={"center"}>
            <Link to="/register">
              <Button
                m={10}
                w="40"
                backgroundColor={"teal"}
                color="white"
                value="artist"
                onClick={() => setUserType("artist")}
              >
                Artist
              </Button>
            </Link>
            <Link to="/register">
              <Button
                m={10}
                w="40"
                backgroundColor={"teal"}
                color="white"
                value="gallerist"
                onClick={() => setUserType("gallerist")}
              >
                Gallerist
              </Button>
            </Link>
          </Flex>
        </Box>
      </Stack>
    </>
  );
}

export default Home;
