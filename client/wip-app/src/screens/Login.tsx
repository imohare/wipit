import * as React from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Box,
  Flex,
  Button,
  Stack,
  Text,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
// import Theme from "../styled-components/theme/theme";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

const logo = require("../assets/wipit-logo-2.png");

function Login(): JSX.Element {
  return (
    <>
      <Image src={logo} alt="Logo" width={200} />
      <Flex alignItems="center">
        <Box mx="auto">
          <form action="submit">
            <Stack spacing={3} marginTop="50%">
              <Text fontSize={"34"} align="center">
                Login
              </Text>

              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon />} />
                  <Input type="email" placeholder="Enter Email" />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement children={<LockIcon />} />
                  <Input type="password" placeholder="Enter Password" />
                </InputGroup>
              </FormControl>
              <Flex flexDirection={"row"}>
                <Link to="/a">
                  <Button colorScheme="teal" size="md" type="submit" mr={8}>
                    Artist
                  </Button>
                </Link>
                <Link to="/g">
                  <Button
                    colorScheme="teal"
                    size="md"
                    type="submit"
                    color="white"
                  >
                    Gallerist
                  </Button>
                </Link>
              </Flex>
            </Stack>
          </form>
          <Flex flexDirection={"row"}>
            <Text mr={2} mt={3}>
              Don't have a login?{" "}
            </Text>
            <Link to="/">
              <Text mt={3}> Register here.</Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
