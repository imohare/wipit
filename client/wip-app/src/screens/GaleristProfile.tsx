import { useEffect, useState } from 'react';
import React from 'react';
import methods from '../services';
import LogoutButton from '../components/LogoutButton';
import {Box, Text, Flex, Center } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { Wrap, WrapItem } from '@chakra-ui/react'

function GalleristProfile(): JSX.Element {

  type wipType = {
    _id: string
    wip_title: string
    wip_cards: [any]
    update_request: string
    update_request_date: string
    }

  const [wips, setWips] = useState<[wipType] | null>(null);

  type cardType = {
    img_url: string
    upload_date: string
    seen_by_state: string
    seen_by_user: string
    seen_by_date: string
    comments: [any]
    wipId?: {}
    //object id???
  }
  const [cards, setCards] = useState<[cardType] | null>(null);

  const user = {
    _id: '1234',
    type: 'gallerist',
    name: '@ROMAN_ROAD',
    email: 'roman@gmail.com',
    password: 'secret',
    followed_artists: ['@ANNA_SKLADMANN', '@ARIANE_HUGHES', '@JACK_LAVER', '@YULIA_IOLSIZON', '@ELIZA_BLAKEMORE']
  }
  // useEffect(() => {
  //   methods.getWips().then((response) => {
  //     setWips(response);
  //   });
  //   methods
  //     .getAllCards()
  //     .then((response) => {
  //       setCards(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log('Error occured.');
  //     });
  // }, []);
  // flexDirection='row' justifyContent='flex-end'
  return (
    <Flex backgroundColor='#f0f0f0' flexDirection='column'>
      <Box display='flex' mt='2' alignItems='center' justifyContent='space-between' bg='white' w='100%' p={5} color='black' boxShadow='md'>
        <Box>
        <Text fontWeight='bold'>{`${user.name}'s profile`}</Text>
        <Text fontWeight='bold'>{`email: ${user.email}`}</Text>
        </Box>
        <LogoutButton />
      </Box>
      <Center fontWeight='bold' margin='15px'>Followed Artists</Center>
      <Wrap>
      {user.followed_artists.map((artist) => {
        return (
          <WrapItem key={artist}>
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
              <Text>{artist}</Text>
            </Box>
            </NavLink>
          </WrapItem>)
      })}
      </Wrap>
    </Flex>
    // <div>
    //   <p> @ROMAN_ROAD </p>
    //   <Box>
    //     <p> followed artists.</p>
    //     <form>
    //       <input placeholder='Artist Name'></input>
    //     </form>
    //     <p>
    //       @ANNA_SKLADMANN
    //       <br />
    //       @ARIANE_HUGHES
    //       <br />
    //       <Link to='/g/wips'> @ELIZA_BLAKEMORE </Link>
    //       <br />
    //       @JACK_LAVER
    //       <br />
    //       @YULIA_IOLSIZON
    //     </p>
    //   </Box>
      // <Text> New Wip Updates from</Text>
      // <NavLink to={`/g/wips`}>@ELIZA_BLAKEMORE:</NavLink>
      // {{cards.map((card) =>
      //   card.seen_by_state === 'false' ? (
      //     <Card width={[256, 320]} mx='auto'>
      //       <Image src={card.img_url}></Image>
      //       <Text>{card.upload_date}</Text>
      //     </Card>
      //   ) : null
      // )}
    // </div>
  );
}
export default GalleristProfile;
