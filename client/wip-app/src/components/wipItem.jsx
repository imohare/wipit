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
      h="250px"
      boxShadow="lg"
      rounded="7px"
      bg={"whiteAlpha.100"}
      overflow="hidden"
    >
      <Image
        src={wip ? wip[wip.length - 1].wipImage : "None"}
        alt="user Image"
      />
      <Text>{wip?.wipTitle}</Text>
    </Box>
  );
}

export default WipItem;
