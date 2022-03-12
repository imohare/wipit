import { useState, useEffect } from 'react';
import methods from '../services';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, Image, Text } from 'rebass';
import GalleristProfileButton from '../styled-components/gallerist/route-buttons/ProfileButton';
import GalleristWipsButton from '../styled-components/gallerist/route-buttons/WipsButton';
import GalleristWipButton from '../styled-components/gallerist/route-buttons/WipButton';
import { Input } from '@rebass/forms';

function GalleristWipCard(): JSX.Element {
  const { title } = useParams();
  const { wip_card_id } = useParams();

  type wipType = {
    _id: string,
    wip_title: string,
    wip_cards: [any],
    update_request: string,
    update_request_date: string,
    }

  const [wip, setWip] = useState<wipType | null>(null);

  type wipCardType = {
    _id: string
    img_url: string,
    upload_date: string,
    seen_by_state: string,
    seen_by_user: string,
    seen_by_date: string,
    comments: [any],
    wipId: {}
  }

  const [wipCard, setWipCard] = useState<wipCardType | null>(null);
  const [card, setCard] = useState<wipCardType | null>(null);

  // type commentType = {
  //   _id: string
  //   comment: string,
  //   upload_date: string,
  //   seen_by_state: string,
  //   seen_by_user: boolean
  // }

  // const [cardComments, setCardComments] = useState<[commentType] | null>(null);
  // const [newComment, setNewComment] = useState<commentType | null>(null);

  // const addComment = async (comment) => {
  //   const newComments = cardComments.slice();
  //   const response = await methods.addComment(
  //    { _id: wip_card_id,
  //     comment: comment,
  //     upload_date: Date(),
  //     seen_by_user: 'false'}
  //   ).then((response) => {
  //     newComments.push(response);

  //   } )
  //   setCardComments(newComments);
  // };

  // const handleCommentSubmit = (evt) => {
  //   evt.preventDefault();
  //   addComment(newComment);
  //   setNewComment((newComment) => (newComment = ''));
  // };

  const handleClick = () => {
    // methods.updateCard(wip._id, wipCard._id, 'true', '@ROMAN_ROAD', Date());
  };

  // useEffect(() => {
  //   methods
  //     .getWips()
  //     .then((response) => {
  //       const wip = response.filter((card) =>
  //         card.wip_title.includes(title)
  //       )[0];
  //       setWip(wip);
  //       const card = wip.wip_cards.filter((card) =>
  //         card._id.includes(wip_card_id)
  //       )[0];
  //       setWipCard(card);
  //       methods.getAllCards().then((response) => {
  //         const card = response.filter((card) =>
  //           card._id.includes(wip_card_id)
  //         )[0];
  //         setCard(card);
  //         // const cardComments = card.comments;
  //         // setCardComments(cardComments);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log('Error occured.');
  //     });
  // }, [title]);

  //addComment(cardId, comment, upload_date, seen_by_state, seen_by_user)

  return (
    <div>
      {/* <GalleristProfileButton />
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
      </Box> */}
      {/* <form onSubmit={handleCommentSubmit}>
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
      )} */}
    </div>
  );
}

export default GalleristWipCard;
