import {
  Button,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CollectionContext, WipContext } from "../userContext";

function ArtistCardForm(): JSX.Element {
  const { collection } = useContext(CollectionContext);
  const { wip, setWip } = useContext(WipContext);
  const [wipName, setWipName] = useState("");
  const [wipImage, setWipImage] = useState("");
  const [wipCol, setWipCol] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    //  const newCollectionName = [...collectionName, name];
    // setCollectionName(newCollectionName);
    // setCollection({ ...collection, collectionName: newCollectionName });
    // setName("");
    const newWip = { name: wipName, image: wipImage, col: wipCol };

    setWip({ ...wip, newWip });

    setWipName("");
    setWipImage("");
    setWipCol("");
    // const wipCard = await methods.createWipCard(newWip);
  }
  useEffect(() => {
    // setCollection({ ...collection, collectionName: collectionName });
    console.log(wip, "this is the wip state");
  }, [wip]);

  return (
    <>
      <form action="submit">
        <Stack spacing={3} mt={6}>
          <Text ml={1} fontSize={"14"} fontWeight={"semibold"}>
            Add New WIP Collection
          </Text>
          <Select
            placeholder="Select WIP Collection"
            onChange={(e) => setWipCol(e.target.value)}
          >
            {collection
              ? collection.collectionName.map((col: any, index: number) => {
                  return (
                    <option key={index} value={col}>
                      {col}
                    </option>
                  );
                })
              : "no collections"}
          </Select>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Enter Title of New WIP"
              value={wipName}
              onChange={(e) => setWipName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              border={0}
              p={0}
              type="file"
              placeholder="Enter Title of New WIP"
              value={wipImage}
              onChange={(e) => setWipImage(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            size="sm"
            type="submit"
            onClick={handleSubmit}
          >
            Add WIP
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default ArtistCardForm;
