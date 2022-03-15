import { Box, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { WipContext } from "../userContext";

function WipItem() {
  const { wip } = useContext(WipContext);
  const wipInfo = {};
  return (
    <Box
      ml={10}
      w="400px"
      h="150px"
      boxShadow="lg"
      rounded="7px"
      bg={"whiteAlpha.100"}
      overflow="hidden"
    >
      {/* <Text>{wip.newWip.name}</Text> */}
      <Image src={wip.newWip.image} alt="user Image" />
    </Box>
  );
}

export default WipItem;
