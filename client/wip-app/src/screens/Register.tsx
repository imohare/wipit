import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import methods from "../services";
const logo = require("../assets/wipit-logo-2.png");

interface User {
  name: string;
  email: string;
  password: string;
  type: string;
}
interface registerProps {
  userType: string;
}

export function Register({ userType }: registerProps): JSX.Element {
  const { user, setUser, loginStatus, updateLoginStatus } =
    useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");

  async function handleSubmit(): Promise<void> {
    const newUser = { name, email, password, type: userType, uid };
    setUser(newUser);
    setName("");
    setEmail("");
    setPassword("");
    console.log(user, "this is the user state");

    const userInfo = await methods.createUser(newUser);

    updateLoginStatus(userInfo[0]);
    setUid(userInfo[1].profileId);
  }

  return (
    <>
      <Flex
        boxShadow={"md"}
        w="100%"
        p={4}
        color="white"
        flexDirection={"row"}
        justifyContent="space-between"
      >
        <Image src={logo} width="100px" />
        <Link to="/login">
          <Button marginTop="2" colorScheme="teal" size="sm">
            Login
          </Button>
        </Link>
      </Flex>

      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
      >
        <form action="submit">
          <Stack spacing={3} marginTop="50%">
            <Text fontSize={"34"} align="center">
              Register
            </Text>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<InfoIcon />} />
                <Input
                  type="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<EmailIcon />} />
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            {/* <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Text fontWeight={"700"}>Would you like to register as:</Text>
                <Radio value="artist">Artist</Radio>
                <Radio value="Gallerist">Gallerist</Radio>
              </Stack>
            </RadioGroup> */}

            <Button
              colorScheme="teal"
              size="md"
              type="submit"
              onClick={handleSubmit}
            >
              Create User
            </Button>
          </Stack>
        </form>
      </Flex>
    </>
  );
}

export default Register;
