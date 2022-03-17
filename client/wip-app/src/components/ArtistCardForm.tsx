import {
  Button,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import methods from "../services";
import { UserContext, WipCollectionContext, WipContext } from "../userContext";

function ArtistCardForm(): JSX.Element {
  const { wipCollection, setWipCollection } = useContext(WipCollectionContext);
  const { wip, setWip } = useContext(WipContext);
  const { user } = useContext(UserContext);
  const [wipTitle, setWipTitle] = useState("");
  const [wipImage, setWipImage] = useState("");
  const [wipCol, setWipCol] = useState(null);

  function changeHandler(e: any) {
    if (e.target.files && e.target.files[0]) {
      setWipImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log("wipCollection length", wipCollection.length, wipCol);
    const WCI = wipCollection.filter(
      (collection: any) => collection.wipCollectionTitle === wipCol
    )[0].wipCollectionId;
    const newWip = {
      wipTitle: wipTitle,
      wipImage: wipImage,
      wipCollectionId: WCI,
    };
    const result = await methods.createWip(newWip);
    const collectionResult = await methods.getWipCollectionByUser(
      user.profileId
    );
    setWipCollection(collectionResult);
    console.log(result, "result object or something");
    setWip(wip === null ? [result] : wip.concat([result]));
    setWipTitle("");
    setWipImage("");
  }

  useEffect(() => {
    // setCollection({ ...collection, collectionName: collectionName });
    console.log(wip, "this is the wip WIPPPstate");
    console.log("hello: ", wipCollection);
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
            onChange={(e: any) => setWipCol(e.target.value)}
          >
            {wipCollection
              ? wipCollection.map((col: any, index: number) => {
                  return (
                    <option key={index} value={col.wipCollectionTitle}>
                      {col.wipCollectionTitle}
                    </option>
                  );
                })
              : "no collections"}
          </Select>
          <FormControl isRequired>
            <Input
              type="text"
              placeholder="Enter Title of New WIP"
              value={wipTitle}
              onChange={(e) => setWipTitle(e.target.value)}
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
