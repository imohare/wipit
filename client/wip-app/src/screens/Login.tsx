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
import { useContext, useState } from "react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { UserContext } from "../userContext";
import methods from "../services";
import { useNavigate } from "react-router-dom";
const logo = require("../assets/wipit-logo-2.png");
// import Theme from "../styled-components/theme/theme";

interface User {
  name: string;
  email: string;
  password: string;
  type: string;
}
interface loginProps {
  userType: string;
}

function Login({ userType }: loginProps): JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const userLogin = { email, password, type: userType };
    setEmail("");
    setPassword("");
    console.log(user, "this is the user state");

    //setting the user and updating the status with the info from the fetch request
    const userInfo = await methods.getUser(userLogin);
    let path = "";
    console.log("user created: ", userInfo);
    if (userInfo) {
      setUser(userInfo);
      path = path.concat(
        userInfo.type == "artist"
          ? `/a/${userInfo.profileId}`
          : `/g/${userInfo.profileId}`
      );
      console.log(path);
      navigate(path);
    } else {
      alert("Try again with a different email!");
    }
  }
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
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement children={<LockIcon />} />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired
                  />
                </InputGroup>
              </FormControl>
              <Flex flexDirection={"row"}>
                <Button
                  colorScheme="teal"
                  size="md"
                  type="submit"
                  mr={8}
                  onClick={handleSubmit}
                >
                  Artist
                </Button>

                <Button
                  colorScheme="teal"
                  size="md"
                  type="submit"
                  color="white"
                  onClick={handleSubmit}
                >
                  Gallerist
                </Button>
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
