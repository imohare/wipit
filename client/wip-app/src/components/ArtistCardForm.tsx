import {
  Button,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CollectionContext } from "../userContext";

function ArtistCardForm(): JSX.Element {
  const { collection } = useContext(CollectionContext);
  return (
    <form action="submit">
      <Stack spacing={3} mt={6}>
        <Text ml={1} fontSize={"14"} fontWeight={"semibold"}>
          Add New WIP Collection
        </Text>
        <Select placeholder="Select WIP Collection">
          <option value="option1">
            {collection ? collection.collectionName : "no collections"}
          </option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <FormControl isRequired>
          <Input
            type="text"
            placeholder="Enter Title of New WIP"
            value="Title"
            onChange={(e) => console.log("hi")}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            type="text"
            placeholder="Enter Title of New WIP"
            value="Image"
            onChange={(e) => console.log("hi")}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="sm"
          type="submit"
          onClick={() => console.log("submit")}
        >
          Add WIP
        </Button>
      </Stack>
    </form>
  );
}

export default ArtistCardForm;
