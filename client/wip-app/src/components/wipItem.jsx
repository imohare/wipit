import { Box, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { WipContext } from '../userContext';

function WipItem() {
  const { wip } = useContext(WipContext);
  const wipInfo = {};
  return (
    <Box
      ml={10}
<<<<<<< HEAD
      w="350px"
      h="250px"
      boxShadow="lg"
      rounded="7px"
      bg={"whiteAlpha.100"}
      overflow="hidden"
=======
      w='400px'
      h='250px'
      boxShadow='lg'
      rounded='7px'
      bg={'whiteAlpha.100'}
      overflow='hidden'
>>>>>>> ee3bb7e508a268a981f82cf8cea218875b8633d3
    >
      <Image
        src={wip ? wip[wip.length - 1].wipImage : 'None'}
        alt='user Image'
      />
<<<<<<< HEAD
=======
      <Text>{wip?.wipTitle}</Text>
>>>>>>> ee3bb7e508a268a981f82cf8cea218875b8633d3
    </Box>
  );
}

export default WipItem;
