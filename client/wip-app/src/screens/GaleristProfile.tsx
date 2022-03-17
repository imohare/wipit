import { useEffect, useState, useContext } from 'react';
import React from 'react';
import methods from '../services';
import LogoutButton from '../components/LogoutButton';
import {Box, Text, Flex, Center, Container, ScaleFade, Image, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { UserContext } from '../userContext';
import GalleryButton from '../components/GalleryButton';
const galleristBackground = require('../assets/galleristBackground.png');
const ballerina = require('../assets/nice-painting-from-artist.jpeg');
const nature = require('../assets/nature_painting.jpeg');
const {uniqBy} = require('lodash');


function GalleristProfile(): JSX.Element {
  //mocking the images because their blob urls don't work
  const mockImages = [ballerina, nature];

 interface followeesInterFace {
  followId: String;
  profileId:String;
  followerId: String;
  createdAt: String;
  updatedAt: String;
  artistWips?: any;
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

  useEffect(() => {
    methods.getFollowees(user.profileId).then((response) => {
      console.log(response)
      response.forEach(async(artist: any)=> artist.artistWips = await methods.getWipCollectionByUser(artist.profile.profileId));
      let noDuplicates: any = uniqBy(response,'profileId');
      setFollowees(noDuplicates);
      // console.log('artistWips: ', followees[0].artistWips[0].Wips[0].wipImage);
      console.log(followees);
      return response;
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
          <GalleryButton />
          <LogoutButton />
        </Box>
        </Container>
        <Center fontWeight='bold' margin='15px'>Followed Artists</Center>
        <Wrap justify='center'>
        {followees.map((artist: any, index: number) => {
        return (
          <ScaleFade key={index} initialScale={0.9} in={true} whileHover={{scale: 1.1}}>
            <WrapItem >
                <Box
                marginTop='150px'
                borderWidth='1px'
                w='full'
                marginX='10px'
                background='rgba(255, 255, 255, .5)'
                boxShadow='md'
                borderRadius='lg'
                pt='20px'
                px='10px'
                cursor='pointer'>
                <NavLink to='./users/:id'>
                  <Center>
                    <Image width='200px' src={mockImages[index]}/>
                    {/* <Image src={artist.artistWips && artist.artistWips[0].Wips[0].wipImage} /> */}
                  </Center>
                </NavLink>
                  <Box display='flex' flexDirection='row' p='2'>
                  <Box mt='2'>
                    <Text color='black' textAlign='center' fontSize='18px' >Author: {artist.profile.name} </Text>
                  </Box>
                </Box>
              </Box>
            </WrapItem>
          </ScaleFade>)
        })}
      </Wrap>
    </Flex>
  );
}
export default GalleristProfile;
