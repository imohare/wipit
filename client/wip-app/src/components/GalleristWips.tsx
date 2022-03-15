import { useState, useEffect } from 'react';
import methods from '../services';
import GalleristWipsList from '../styled-components/gallerist/lists/GalleristWipsList';
import { Wrap, WrapItem, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {Box, Text, Flex, Center, Container, Image } from '@chakra-ui/react';
//const gallery = require('../assets/gallery.png');
const gallery = require('../assets/gallery2.jpeg');

function GalleristWips(): JSX.Element {

  interface wipType {
    _id: String;
    wip_title: String
    wip_cards: string[];
    update_request: String;
    update_request_date: String;
    author: String;
    }

    const mockWips = [
      {_id: "1",
        wip_title: 'dino',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNzu7_RYT78980xtl2Oll2TR1mqWFxzRiqYADjEUiFiBITv0AlUFKxXWVuVVTw32FXyAY&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@ANNA_SKLADMANN'},
      {_id: "2",
        wip_title: 'jinx',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalz-TmLeCfs_Ujf3M9pyKnMTD6GSRn-BP-lAsypIeMxVDH45Om5VFAi2wQn383NXNNx4&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@ARIANE_HUGHES'},
      {_id: "3",
        wip_title: 'girl',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJPOS6Yexk86QxQc0TPK0IKAgwdSkqwHJmL5iw3Gvv2PSBpUpXu1_5ZTLvu4P7r6pSfg&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@JACK_LAVER'},
      {_id: "4",
        wip_title: 'art',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0asOqUpUY8_d4clj82GosUwJ6vH-_wPSxXs0UMyQaehlMOBe1Kk8QhqtdfytibJ1tvE&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@JACK_LAVER'},
      {_id: "5",
        wip_title: 'art2',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRBxRV8AaYS5_3cCPhGzyh4RJiMc_lu16m5Qrv_PgvOTYz1kKHsbUJyazdpflY-xgDyL0&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@JACK_LAVER'},
    ]

  const [wips, setWips] = useState<wipType[] | null>(mockWips);

  const navigate = useNavigate();
  const profileRouteChange = () =>{
    let path = `/g`;
    navigate(path);
  }

  // useEffect(() => {
  //   methods
  //     .getWips()
  //     .then((response) => {
  //       setWips(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Box
      backgroundImage={gallery}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"

      //width={}
      height="880"
      >
      {/* <Container
      maxW="container.xl"
      maxH='container.2xl'
      //backgroundImage={gallery}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    > */}
        <Button  m={2}
        backgroundColor='teal'
        color='white'
        onClick={profileRouteChange}>profile</Button>
        <Wrap justify='center'>
        {wips.map((wip) => {
        return (
          <WrapItem>
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
            <Image src={wip.wip_cards[0]} />
            <Text color='white'>Author: ${wip.author}</Text>
          </Box>
          </NavLink>
        </WrapItem>)
    })}
    </Wrap>
        {/* <GalleristWipsList wips={wips} /> */}
        {/* {wips.map( one_wip =>
        <div key={one_wip._id}>
          <NavLink to={`/g/wip/${one_wip.wip_title}`}>{one_wip.wip_title}</NavLink>
          { (one_wip.wip_cards) ? <CardsListForWipsList one_wip={one_wip}/> : null}
        </div>} */}
    {/* </Container> */}
    </Box>
  );
}
export default GalleristWips;
