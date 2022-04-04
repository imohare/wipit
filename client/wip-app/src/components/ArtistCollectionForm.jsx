/* eslint-disable react-hooks/exhaustive-deps */
import { Button, FormControl, Input, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import methods from "../services";
import { WipCollectionContext, UserContext } from "../userContext";

function ArtistCollectionForm() {
  const { user } = useContext(UserContext);
  const { wipCollection, setWipCollection } = useContext(WipCollectionContext);
  const [wipCollectionTitle, setWipCollectionTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await methods.createCollection(
      wipCollectionTitle,
      user.profileId
    );
    const newWipCollectionEntry = {
      wipCollectionId: result.wipCollectionId,
      wipCollectionTitle: wipCollectionTitle,
    };
    setWipCollection(
      wipCollection === null
        ? [newWipCollectionEntry]
        : wipCollection.concat([newWipCollectionEntry])
    );
    setWipCollectionTitle("");
  }

  useEffect(() => {
    console.log(wipCollection, "LOOK HERE");
  }, [wipCollection]);
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
            value={wipCollectionTitle}
            onChange={(e) => setWipCollectionTitle(e.target.value)}
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
