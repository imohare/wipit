import { useState, useEffect } from 'react';
import methods from '../services';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, Image, Text } from 'rebass';
import GalleristProfileButton from '../styled-components/gallerist/route-buttons/ProfileButton';
import GalleristWipsButton from '../styled-components/gallerist/route-buttons/WipsButton';
import GalleristWipButton from '../styled-components/gallerist/route-buttons/WipButton';
import { Input } from '@rebass/forms';

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

export default GalleristWipCard;
