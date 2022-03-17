import { useEffect, useState, useContext } from 'react';
import React from 'react';
import methods from '../services';
import LogoutButton from '../components/LogoutButton';
import {Box, Text, Flex, Center, Container } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { Wrap, WrapItem, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { UserContext } from '../userContext';
const galleristBackground = require('../assets/galleristBackground.png');


function GalleristProfile(): JSX.Element {

 interface followeesInterFace {
  followId: String;
  profileId:String;
  followerId: String;
  createdAt: String;
  updatedAt: String;
  profile: {
      profileId: String;
      name: String;
      type: String;
      createdAt: String;
      updatedAt: String;
  };
}
    const [followees, setFollowees] = useState<[followeesInterFace] | []>([]);

    const { user } = useContext(UserContext);
    console.log('hello', user);

  const navigate = useNavigate();
  const galleryRoute = () => {
    const path = `/g/wips`;
    navigate(path);
  }

  useEffect(() => {
    methods.getFollowees(user.profileId).then((response) => {
      console.log(response)
      setFollowees(response);
    }).catch((error) => {
      console.log(error);
      console.log('Error occured.');
      });
  }, []);

  return (
    <Flex backgroundColor='#f0f0f0' flexDirection='column' h='100vh'>
      <Container display='flex' mt='2' alignItems='center' justifyContent='space-between' bg='white' w='100%' p={5} color='black' boxShadow='md'
        maxW="container.2xl"
        h="50vh"
        backgroundImage={galleristBackground}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat">
        <Box background='rgba(255, 255, 255, .8)' borderWidth='1' borderRadius='lg' p='10px'>
        <Text fontWeight='bold' color='black' fontSize={34}>{`${user.name}'s profile`}</Text>
        <Text fontWeight='bold' color='black'>{`email: ${user.email}`}</Text>
        </Box>
        <Box>
          <Button
          name='galleryRoute'
          m={2}
          onClick={galleryRoute}
          backgroundColor="teal"
          color="white"
          >
            gallery
          </Button>
          <LogoutButton />
        </Box>
        </Container>
        <Center fontWeight='bold' margin='15px'>Followed Artists</Center>
        <Wrap justify='center'>
        { followees.map((artist, index) => {
          return (
            <WrapItem key={index}>
            <NavLink to='./users/:id'>
            <Box
            maxW='sm'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            display='flex'
            w='250px'
            h='300px'
            margin='10px'
            bg='white'
            boxShadow='md'>
              <Text>{artist.profile.name}</Text>
            </Box>
            </NavLink>
          </WrapItem>)
      })}
      </Wrap>
    </Flex>
  );
}
export default GalleristProfile;
