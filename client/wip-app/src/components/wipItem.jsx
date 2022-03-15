import { Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { WipContext } from "../userContext";

function WipItem() {
  const { wip } = useContext(WipContext);
  return (
    <Box
      ml={10}
      w="400px"
      h="150px"
      boxShadow="lg"
      rounded="7px"
      bg={"whiteAlpha.100"}
      overflow="hidden"
    ></Box>
  );
}

export default WipItem;
