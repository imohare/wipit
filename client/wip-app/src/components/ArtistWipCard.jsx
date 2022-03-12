import { useState, useEffect } from "react";
import ArtistProfileButton from "../styled-components/artist/route-buttons/ProfileButton";
// import ArtistWipsButton from "../styled-components/artist/route-buttons/WipsButton";
// import ArtistWipButton from "../styled-components/artist/route-buttons/WipButton";
import methods from "../services";
import { useParams } from "react-router-dom";
import { Card, Image, Text, Flex } from "rebass";

function ArtistWipCard() {
  const { title } = useParams();
  const { wip_card_id } = useParams();

  const [wip, setWip] = useState([]);
  const [wipCard, setWipCard] = useState([]);

  const [card, setCard] = useState([]);
  const [cardComments, setCardComments] = useState([]);

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
        console.log("Error occured.");
      });
  }, []);

  return (
    <div>
      <Flex px={2} color="white" alignItems="center" position="sticky">
        <ArtistProfileButton />
        {/* <ArtistWipsButton /> */}

        {/* <ArtistWipButton wip_title={title} /> */}
      </Flex>
      <br />
      <Card width={[256, 320]} mx="auto">
        <Image src={wipCard.img_url} alt="card img"></Image>
        <Text> {wipCard.upload_date} </Text>
        <Text>
          {wipCard.seen_by_state === "true" ? (
            <p>
              {" "}
              seen by {wipCard.seen_by_user} on {wipCard.seen_by_date}{" "}
            </p>
          ) : (
            <p> This wip remains unseen. </p>
          )}
        </Text>
        <Text>
          {cardComments.length !== 0 ? (
            cardComments.map((comment) => (
              <Text>
                "{comment.comment}" posted at {comment.upload_date}{" "}
                {comment.seen_by_date}
              </Text>
            ))
          ) : (
            <Text> no comments yet </Text>
          )}
        </Text>
      </Card>
    </div>
  );
}

export default ArtistWipCard;
