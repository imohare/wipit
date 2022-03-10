import { React, useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  NavLink,
} from 'react-router-dom';

import { Label, Input } from '@rebass/forms';
import { Box, Button, Card, Image, Text, Flex, flexWrap } from 'rebass';
import { Tiles } from '@rebass/layout';
import Theme from './styled-components/theme/theme';

import reportWebVitals from './reportWebVitals';
import methods from './services';
import { storage } from './firebase/index';

import WipsListPreview from './styled-components/artist/lists/WipsListPreview';
import WipsList from './styled-components/artist/lists/WipsList';

import GalleristWipsList from './styled-components/gallerist/lists/GalleristWipsList';
import GalleristCardList from './styled-components/gallerist/lists/GalleristCardList';

import WipInputBar from './styled-components/artist/input-bars/WipInputBar';

import ArtistProfileButton from './styled-components/artist/route-buttons/ProfileButton';
import ArtistWipsButton from './styled-components/artist/route-buttons/WipsButton';
import ArtistWipButton from './styled-components/artist/route-buttons/WipButton';
import LogoutButton from './styled-components/LogoutButton';

import GalleristProfileButton from './styled-components/gallerist/route-buttons/ProfileButton';
import GalleristWipsButton from './styled-components/gallerist/route-buttons/WipsButton';
import GalleristWipButton from './styled-components/gallerist/route-buttons/WipButton';

import logo from './wipit-logo.png';
import plus from './plus-button.png';

import { Controller, Scene } from 'react-scrollmagic';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/a' element={<ArtistProfile />} />
      <Route path='/a/wips' element={<ArtistWips />} />
      <Route path='/a/wip/:title' element={<ArtistWip />} />
      <Route path='/a/wip/:title/:wip_card_id' element={<ArtistWipCard />} />
      <Route path='/g' element={<GalleristProfile />} />
      <Route path='/g/wips' element={<GalleristWips />} />
      <Route path='/g/wip/:title' element={<GalleristWip />} />
      <Route path='/g/wip/:title/:wip_card_id' element={<GalleristWipCard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

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

//--------------------------------------------------

function GalleristWips() {
  const [wips, setWips] = useState([]);

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        setWips(response);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, []);

  return (
    <div>
      <GalleristProfileButton />
      <p>@ELIZA_BLAKEMORE</p>
      <GalleristWipsList wips={wips} />
    </div>
  );
}

//--------------------------------------------------

function GalleristWip() {
  const { title } = useParams();

  const [wip, setWip] = useState([]);

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        const wip = response.filter((card) =>
          card.wip_title.includes(title)
        )[0];
        setWip(wip);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, [title]);

  const handleClick = () => {
    methods.updateRequest(wip._id, 'true');
  };

  return (
    <div>
      <GalleristProfileButton />
      <GalleristWipsButton />
      <LogoutButton />
      {wip.wip_cards ? (
        <GalleristCardList cards={wip.wip_cards} wip={wip}></GalleristCardList>
      ) : null}
      {wip.update_request === 'false' ? (
        <Button backgroundColor='#33e' mr={2} onClick={handleClick}>
          {' '}
          Request Update{' '}
        </Button>
      ) : (
        <Text> You have requested an update</Text>
      )}
    </div>
  );
}

//--------------------------------------------------

function GalleristWipCard() {
  const { title } = useParams();
  const { wip_card_id } = useParams();

  const [wip, setWip] = useState([]);
  const [wipCard, setWipCard] = useState([]);

  const [card, setCard] = useState([]);
  const [cardComments, setCardComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = async (comment) => {
    const newComments = cardComments.slice();
    const response = await methods.addComment(
      wip_card_id,
      comment,
      Date(),
      'false'
    );
    newComments.push(response);
    setCardComments(newComments);
  };

  const handleCommentSubmit = (evt) => {
    evt.preventDefault();
    addComment(newComment);
    setNewComment((newComment) => (newComment = ''));
  };

  const handleClick = () => {
    methods.updateCard(wip._id, wipCard._id, 'true', '@ROMAN_ROAD', Date());
  };

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        const wip = response.filter((card) =>
          card.wip_title.includes(title)
        )[0];
        setWip(wip);
        const card = wip.wip_cards.filter((card) =>
          card._id.includes(wip_card_id)
        )[0];
        setWipCard(card);
        methods.getAllCards().then((response) => {
          const card = response.filter((card) =>
            card._id.includes(wip_card_id)
          )[0];
          setCard(card);
          const cardComments = card.comments;
          setCardComments(cardComments);
        });
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, [title]);

  //addComment(cardId, comment, upload_date, seen_by_state, seen_by_user)

  return (
    <div>
      <GalleristProfileButton />
      <GalleristWipsButton />
      <GalleristWipButton wip_title={title} />
      <Box>
        <Card width={[256, 320]} mx='auto'>
          <Image src={wipCard.img_url} alt='card img' />
          <Text> {wipCard.upload_date}</Text>
        </Card>
      </Box>
      <Box>
        {wipCard.seen_by_state === 'false' ? (
          <Button backgroundColor='#33e' mr={2} onClick={handleClick}>
            {' '}
            Seen{' '}
          </Button>
        ) : (
          <Text> Viewed at {wipCard.seen_by_date}</Text>
        )}
      </Box>
      <form onSubmit={handleCommentSubmit}>
        <Input
          placeholder='Add a comment'
          value={newComment}
          onChange={(evt) => setNewComment(evt.target.value)}
          required
        ></Input>
        <button>+</button>
      </form>
      {cardComments.length !== 0 ? (
        cardComments.map((comment) => (
          <Text>
            "{comment.comment}" posted at {comment.upload_date}{' '}
            {comment.seen_by_date}
          </Text>
        ))
      ) : (
        <Text> no comments yet </Text>
      )}
    </div>
  );
}

//--------------------------------------------------

reportWebVitals();
