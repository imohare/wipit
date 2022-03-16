import { useState, useEffect, useContext } from 'react';
import methods from '../services';
import GalleristWipsList from '../styled-components/gallerist/lists/GalleristWipsList';
import { Wrap, WrapItem, Button, ScaleFade } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import {Box, Text, Flex, Center, Container, Image, Heading } from '@chakra-ui/react';
import ArtistCardForm from './ArtistCardForm';
import { UserContext } from '../userContext';
// import { useHistory } from "react-router-dom";
//const gallery = require('../assets/gallery.png');
const gallery = require('../assets/gallery2.jpeg');
const addBtn = require('../assets/btn-add.svg').default;
const addedBtn = require('../assets/btn-added.svg').default;

function GalleristWips(): JSX.Element {

  interface wipType {
    _id: String;
    wip_title: String
    wip_cards: string[];
    update_request: String;
    update_request_date: String;
    author: String;
    added?: boolean
    }

    const mockWips = [
      {_id: "1",
        wip_title: 'dino',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNzu7_RYT78980xtl2Oll2TR1mqWFxzRiqYADjEUiFiBITv0AlUFKxXWVuVVTw32FXyAY&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@ANNA_SKLADMANN',
        added: false},
      {_id: "2",
        wip_title: 'jinx',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalz-TmLeCfs_Ujf3M9pyKnMTD6GSRn-BP-lAsypIeMxVDH45Om5VFAi2wQn383NXNNx4&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@ARIANE_HUGHES',
        added: false},
      {_id: "3",
        wip_title: 'girl',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJPOS6Yexk86QxQc0TPK0IKAgwdSkqwHJmL5iw3Gvv2PSBpUpXu1_5ZTLvu4P7r6pSfg&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@JACK_LAVER',
        added: false},
      {_id: "4",
        wip_title: 'art',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0asOqUpUY8_d4clj82GosUwJ6vH-_wPSxXs0UMyQaehlMOBe1Kk8QhqtdfytibJ1tvE&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@JACK_LAVER',
        added: false},
      {_id: "5",
        wip_title: 'art2',
        wip_cards: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRBxRV8AaYS5_3cCPhGzyh4RJiMc_lu16m5Qrv_PgvOTYz1kKHsbUJyazdpflY-xgDyL0&usqp=CAU'],
        update_request: "March 14th",
        update_request_date: "March 13th",
        author: '@JACK_LAVER',
        added: false},
    ]

  const [wips, setWips] = useState<wipType[] | null>([]);
  const {user} = useContext(UserContext);

  const navigate = useNavigate();
  const profileRouteChange = () =>{
    let path = `/g/${user.profileId}`;
    navigate(path);
  }
  // const [toggleButton, setToggleButton] = useState(addBtn);
  // let toggleButton = addBtn;

  const addFollower = (wip: wipType) => {
    console.log("clicked ", wip.added, 'author: ', wip.author);
    wip.added = !wip.added;
    // setToggleButton(toggleButton === addBtn ? addedBtn : addBtn);
    // console.log(toggleButton);
    //need an api service that sends this to the backend
    //no api service yet
    //userId:
    //targetId:

    // methods.addFollower({
    //   userId: user.profileId,
    //   tagretId: ???
    // })

  }

  //getting all the wips
  //not working
  useEffect(() => {
    // methods
    //   .getWipCollections()
    //   .then((response) => {
    //     setWips(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setWips(mockWips);
  }, []);

  console.log(wips);

  return (
    <Box
      backgroundImage={gallery}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      height="100vh"
      w="full"
      >
        <Button  m={2}
        backgroundColor='teal'
        color='white'
          onClick={profileRouteChange}>profile</Button>
        <Flex justifyContent='center' mt={130}>
        <Wrap justify='center'>
        {wips.map((wip) => {
        return (
          <ScaleFade initialScale={0.9} in={true} whileHover={{scale: 1.1}}>
            <WrapItem key={user.profileId}>
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
                    <Image src={wip.wip_cards[0]}/>
                  </Center>
                </NavLink>
                  <Box display='flex' flexDirection='row' p='2'>
                  <Button background='transparent' color='black' opacity={1} border='none' onClick={() => addFollower(wip)} >
                    <Image src={wip.added ? addedBtn : addBtn} />
                  </Button>
                  <Box mt='2'>
                    <Text color='black' textAlign='center' fontSize='18px' >Author: ${wip.author} </Text>
                  </Box>
                </Box>
              </Box>
            </WrapItem>
          </ScaleFade>)
        })}
        </Wrap>
      </Flex>
    </Box>
  );
}
export default GalleristWips;
