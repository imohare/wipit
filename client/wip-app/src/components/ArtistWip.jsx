import ArtistProfileButton from '../styled-components/artist/route-buttons/ProfileButton';
import ArtistWipsButton from '../styled-components/artist/route-buttons/WipsButton';
import LogoutButton from '../styled-components/LogoutButton';
import { useState, useEffect } from 'react';
import methods from '../services';
import { Box, Button, Card, Image, Text, Flex } from 'rebass';
import { NavLink, useParams } from 'react-router-dom';
import { Input } from '@rebass/forms';
import { Tiles } from '@rebass/layout';
import { storage } from '../firebase/index';
import { Controller, Scene } from 'react-scrollmagic';

function ArtistWip() {
  const { title } = useParams();
  const [wip, setWip] = useState([]);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newWipTitle, setNewWipTitle] = useState('');

  //   // const updateTitle = async (wipId, wip_title) => {
  //   //   const response = await methods.updateTitle(wipId,wip_title)
  //   //   setNewWipTitle(response);
  //   // }

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        const wip = response.filter((card) =>
          card.wip_title.includes(title)
        )[0];
        setWip(wip);
        const cards = wip.wip_cards;
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, []);

  //below was commented out
  const updateTitle = async (wipId, wip_title) => {
    await methods.updateTitle(wip._id, newWipTitle);
  };

  const handleTitleSubmit = (evt) => {
    evt.preventDefault();
    updateTitle(wip._id, newWipTitle);
    setNewWipTitle((newWipTitle) => (newWipTitle = ''));
  };

  //below was commented out again
  const addCard = async (
    wipId,
    img_url,
    upload_date,
    seen_by_state,
    seen_by_user,
    seen_by_date
  ) => {
    const newCards = wip.wip_cards.slice();
    const response = await methods.addCard(
      wipId,
      img_url,
      upload_date,
      seen_by_state,
      seen_by_user,
      seen_by_date
    );
    newCards.push(response);
    setCards(newCards);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (evt) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((img) => {
            setImgUrl(img);
            addCard(wip._id, img, uploadDate, 'false', '@ROMAN_ROAD', '');
          });
      }
    );
    evt.preventDefault();
    setUploadDate((uploadDate) => (uploadDate = ''));
  };

  return (
    <div>
      <Flex px={2} color='white' alignItems='center'>
        <ArtistProfileButton />
        <ArtistWipsButton />
        <LogoutButton />
      </Flex>
      <br />
      <Text fontFamily='Roboto'>Update Title</Text>
      <form onSubmit={handleTitleSubmit}>
        <Input
          fontFamily='Roboto'
          name='updatedTitle'
          type='text'
          placeholder={title}
          value={newWipTitle}
          onChange={(evt) => setNewWipTitle(evt.target.value)}
          required
        />
        <Button>Update</Button>
      </form>
      <Flex flexWrap='wrap' mx={-2}>
        <Box px={2} py={2} width={2 / 3}>
          <Tiles width={[96, null, 128]}>
            {cards.map((one_card) => (
              <div key={one_card._id}>
                <NavLink to={`/a/wip/${wip.wip_title}/${one_card._id}`}>
                  <Card width={[256, 320]} mx='auto' boxShadow='card'>
                    <Image src={one_card.img_url} alt='card url' />
                    <Text fontFamily='Roboto'> {one_card.upload_date}</Text>
                  </Card>
                </NavLink>
                <button
                  className='DeleteWipButton'
                  onClick={() => methods.deleteCard(wip._id, one_card._id)}
                >
                  {' '}
                  -{' '}
                </button>
              </div>
            ))}
          </Tiles>
        </Box>
        <Controller>
          <Scene duration={600} pin>
            <Box px={2} py={2} width={1 / 3}>
              <div>
                {wip.update_request === 'true' ? (
                  <Text fontFamily='Roboto'>
                    @ROMAN_ROAD has requested an update on {title}. <br />{' '}
                    Upload an update?{' '}
                  </Text>
                ) : (
                  <Text fontFamily='Roboto'>
                    {' '}
                    Would you like to upload an update?
                  </Text>
                )}
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <progress value={progress} max='100' />
                  <br />
                  <Input type='file' onChange={handleChange} />
                  <br />
                  <Input
                    type='date'
                    name='uploadDate'
                    value={uploadDate}
                    onChange={(evt) => setUploadDate(evt.target.value)}
                    required
                  ></Input>
                  <br />
                  <Button type='submit'>Upload</Button>
                </form>
              </div>
            </Box>
          </Scene>
        </Controller>
      </Flex>
    </div>
  );
}
export default ArtistWip;
