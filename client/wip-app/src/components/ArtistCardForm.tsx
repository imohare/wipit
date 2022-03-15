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

  function changeHandler(e: any) {
    if (e.target.files && e.target.files[0]) {
      setWipImage(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files[0], "IMAGE HERE");
    }
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    const newWip = { name: wipName, image: wipImage, col: wipCol };

    setWip({ ...wip, newWip });
    setWipImage("");
    setWipName("");
    setWipCol("");
    // const wipCard = await methods.createWipCard(newWip);
  }
  useEffect(() => {
    // setCollection({ ...collection, collectionName: collectionName });
    console.log(wip, "this is the wip WIPPPstate");
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
              ? collection.wipCollectionName.map((col: any, index: number) => {
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
            {/* <Image src={wipImage} alt="preview image" /> */}
          </FormControl>
          <FormControl isRequired>
            <Input
              border={0}
              p={0}
              type="file"
              name="Image"
              accept="image/*"
              onChange={changeHandler}
            />
          </FormControl>
          {/* <img src={wipImage} alt="banana" /> */}

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
