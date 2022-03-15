/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormControl, Input, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CollectionContext } from "../userContext";

function ArtistCollectionForm() {
  const { collection, setCollection } = useContext(CollectionContext);

  const [collectionName, setCollectionName] = useState([]);
  const [name, setName] = useState("");

  // setCollectionName([...collectionName, name]);
  // setCollection({ ...collection, collectionName: collectionName });

  async function handleSubmit(e) {
    e.preventDefault();
    const newCollectionName = [...collectionName, name];
    setCollectionName(newCollectionName);
    setCollection({ ...collection, collectionName: newCollectionName });
    setName("");

    // await methods.createCollection(collection);
  }

  useEffect(() => {
    // setCollection({ ...collection, collectionName: collectionName });
    console.log(collection, "this is the collection state");
  }, [collection]);
  return (
    <form action="submit">
      <Stack spacing={3} mt={6}>
        <Text ml={1} fontSize={"14"} align="flex-start" fontWeight={"semibold"}>
          Add New WIP Collection
        </Text>
        <FormControl isRequired>
          <Input
            type="text"
            placeholder="Enter Collection Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          size="sm"
          type="submit"
          onClick={handleSubmit}
        >
          Add Collection
        </Button>
      </Stack>
    </form>
  );
}

export default ArtistCollectionForm;
