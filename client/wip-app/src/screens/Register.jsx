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
  Box,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { EmailIcon, InfoIcon, LockIcon } from "@chakra-ui/icons";
import logo from "../assets/wipit-logo-2.png";
import { Link } from "react-router-dom";
import UserContext from "../userContext";
import methods from "../services";

export function Register(props) {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  async function handleSubmit(e) {
    const newUser = { name, email, password, type };
    setUser(newUser);
    setName("");
    setEmail("");
    setPassword("");
    setType("");
    await methods.createUser(newUser);
    console.log(user, "this is the user state");
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
