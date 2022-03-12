import * as React from "react";
import { Link } from "react-router-dom";
import { Label, Input } from "@rebass/forms";
import { Image, Box, Flex, Button } from "@chakra-ui/react";
// import Theme from "../styled-components/theme/theme";
import logo from "../assets/wipit-logo.png";

function Login(): JSX.Element {
  return (
    <>
      <Image src={logo} alt="Logo" width={200} />
      <Flex alignItems="center">
        <Box mx="auto">
          <form className="login-form">
            <Box>
              <Label htmlFor="email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="jane@example.com"
              />
            </Box>
            <br />
            <Box>
              <Label htmlFor="password">Password</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="..."
              />
            </Box>
          </form>
          <Box>
            <Link to="/a">
              <Button backgroundColor="#33e" variant="outline" mr={2}>
                {" "}
                Artist{" "}
              </Button>
            </Link>
            <Link to="/g">
              <Button backgroundColor="#33e" variant="outline" mr={2}>
                {" "}
                Gallerist{" "}
              </Button>
            </Link>
            <br />
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
