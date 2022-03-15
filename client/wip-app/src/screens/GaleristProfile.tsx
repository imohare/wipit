import { useEffect, useState } from 'react';
import React from 'react';
import methods from '../services';
import LogoutButton from '../components/LogoutButton';
import {Box, Text, Flex, Center, Container } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { Wrap, WrapItem, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
const galleristBackground = require('../assets/gallerist-background.png');

function GalleristProfile(): JSX.Element {

  interface wipType {
    _id: String;
    wip_title: String
    wip_cards: String[];
    update_request: String;
    update_request_date: String;
    }

    const mockWips = [
      {_id: "1",
        wip_title: 'dino',
        wip_cards: ['data:image/jpeg;base64,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'],
        update_request: "March 14th",
        update_request_date: "March 13th"},
      {_id: "2",
        wip_title: 'jinx',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Q_PcfJ4QlDtY0PCffXKg6sfFiQG10WHyiQ&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th"},
      {_id: "3",
        wip_title: 'girl',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKS8x7YeEDF0nyKfyCKSFXvzaSPOVcheDPug&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th"}
    ]

  const [wips, setWips] = useState<wipType[] | null>(mockWips);

  interface cardType {
    img_url: String;
    upload_date: String;
    seen_by_state: String;
    seen_by_user: String;
    seen_by_date: String;
    comments: String[];
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

  console.log(wips);
  const navigate = useNavigate();
  const galleryRoute = () => {
    const path = `/g/wips`;
    navigate(path);
  }
  // useEffect(() => {
  //   methods.getWips().then((response) => {
  //     setWips(response);
  //   });
  //   // methods
  //   //   .getAllCards()
  //   //   .then((response) => {
  //   //     setCards(response);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //     console.log('Error occured.');
  //   //   });
  // }, []);
  // flexDirection='row' justifyContent='flex-end'
  return (
  //   <Container
  //   maxW="container.xl"
  //   h="50vh"
  //   backgroundImage={galleristBackground}
  //   backgroundPosition="center"
  //   backgroundSize="cover"
  //   backgroundRepeat="no-repeat"
  // >
    <Flex backgroundColor='#f0f0f0' flexDirection='column'
    // maxW="container.xl"
    // h="50vh"
    // backgroundImage={galleristBackground}
    // backgroundPosition="center"
    // backgroundSize="cover"
    // backgroundRepeat="no-repeat"
    >
      <Container display='flex' mt='2' alignItems='center' justifyContent='space-between' bg='white' w='100%' p={5} color='black' boxShadow='md'
        maxW="container.xl"
        h="50vh"
        backgroundImage={galleristBackground}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat">
        <Box>
        <Text fontWeight='bold' color='white' fontSize={34}>{`${user.name}'s profile`}</Text>
        <Text fontWeight='bold' color='white'>{`email: ${user.email}`}</Text>
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
    // </Container>
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
