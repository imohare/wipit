import { useEffect, useState } from 'react';
import React from 'react';
import methods from '../services';
import LogoutButton from '../styled-components/LogoutButton';
import { Box, Card, Image, Text } from 'rebass';
import { Link, NavLink } from 'react-router-dom';

function GalleristProfile() {
  const [wips, setWips] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    methods.getWips().then((response) => {
      setWips(response);
    });
    methods
      .getAllCards()
      .then((response) => {
        setCards(response);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, []);

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
      {cards.map((card) =>
        card.seen_by_state === 'false' ? (
          <Card width={[256, 320]} mx='auto'>
            <Image src={card.img_url}></Image>
            <Text>{card.upload_date}</Text>
          </Card>
        ) : null
      )}
    </div>
  );
}
export default GalleristProfile;
