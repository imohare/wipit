import {
  Button,
  FormControl,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import ArtistProfileButton from "../styled-components/artist/route-buttons/ProfileButton";
// import ArtistWipsButton from "../styled-components/artist/route-buttons/WipsButton";
import LogoutButton from "./LogoutButton";

function ArtistWip() {
  return (
    <>
      <LogoutButton />
      <form action="submit">
        <Stack spacing={3} marginTop="50%">
          <Text fontSize={"34"} align="center">
            Register
          </Text>
          <FormControl isRequired>
            <Input
              type="title"
              placeholder="Enter Title of New WIP"
              value="{title}"
              onChange={(e) => console.log("hi")}
            />
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
            onClick={() => console.log("submit")}
          >
            Create User
          </Button>
        </Stack>
      </form>
    </>
  );
}
export default ArtistWip;
