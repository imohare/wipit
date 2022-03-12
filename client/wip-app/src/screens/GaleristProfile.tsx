import { useEffect, useState } from 'react';
import React from 'react';
import methods from '../services';
import LogoutButton from '../components/LogoutButton';
import { Box, Card, Image, Text } from 'rebass';
import { Link, NavLink } from 'react-router-dom';

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

  return (
    <div>
      <LogoutButton />
      <p> @ROMAN_ROAD </p>
      <Box>
        <p> followed artists.</p>
        <form>
          <input placeholder='Artist Name'></input>
        </form>
        <p>
          @ANNA_SKLADMANN
          <br />
          @ARIANE_HUGHES
          <br />
          <Link to='/g/wips'> @ELIZA_BLAKEMORE </Link>
          <br />
          @JACK_LAVER
          <br />
          @YULIA_IOLSIZON
        </p>
      </Box>
      <Text> New Wip Updates from</Text>
      <NavLink to={`/g/wips`}>@ELIZA_BLAKEMORE:</NavLink>
      {/* {cards.map((card) =>
        card.seen_by_state === 'false' ? (
          <Card width={[256, 320]} mx='auto'>
            <Image src={card.img_url}></Image>
            <Text>{card.upload_date}</Text>
          </Card>
        ) : null
      )} */}
    </div>
  );
}
export default GalleristProfile;
