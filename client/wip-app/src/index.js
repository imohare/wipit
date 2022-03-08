import {React, useEffect, useState } from "react";

import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route, Link, useParams, NavLink} from 'react-router-dom';

import { Label, Input } from '@rebass/forms'
import { Box, Button, Card, Image, Text, Flex, flexWrap } from 'rebass'
import {Tiles} from '@rebass/layout'
import Theme from './styled-components/theme/theme';

import reportWebVitals from './reportWebVitals';
import methods from './services';
import {storage} from './firebase/index'

import WipsListPreview from './styled-components/artist/lists/WipsListPreview';
import WipsList from './styled-components/artist/lists/WipsList';

import GalleristWipsList from "./styled-components/gallerist/lists/GalleristWipsList";
import GalleristCardList from "./styled-components/gallerist/lists/GalleristCardList";

import WipInputBar from './styled-components/artist/input-bars/WipInputBar';

import ArtistProfileButton from './styled-components/artist/route-buttons/ProfileButton';
import ArtistWipsButton from './styled-components/artist/route-buttons/WipsButton';
import ArtistWipButton from './styled-components/artist/route-buttons/WipButton';
import LogoutButton from "./styled-components/LogoutButton";

import GalleristProfileButton from "./styled-components/gallerist/route-buttons/ProfileButton"; 
import GalleristWipsButton from "./styled-components/gallerist/route-buttons/WipsButton";
import GalleristWipButton from "./styled-components/gallerist/route-buttons/WipButton"; 

import logo from './wipit-logo.png';
import plus from './plus-button.png';

import { Controller, Scene } from 'react-scrollmagic';




ReactDOM.render(
  <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/a" element={<ArtistProfile/>}/>
        <Route path="/a/wips" element={<ArtistWips/>} />
        <Route path="/a/wip/:title" element={<ArtistWip/>}/>
        <Route path="/a/wip/:title/:wip_card_id" element={<ArtistWipCard/>} />
        <Route path="/g" element={<GalleristProfile/>} />
        <Route path="/g/wips" element={<GalleristWips/>} />
        <Route path="/g/wip/:title" element={<GalleristWip/>}/>
        <Route path="/g/wip/:title/:wip_card_id" element={<GalleristWipCard/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

//--------------------------------------------------

function Home() {
  return (
    <div>
      <img src={logo} alt="Logo"/>
      <Link to="/login">login</Link>
    </div>
  )
}

//--------------------------------------------------

function Login() {
  return (
    <Theme>
      <Image src={logo} alt="Logo" width={200} />
      <Flex alignItems='center'>
      <Box mx='auto'>
        <Text fonFamily="Roboto" textAlign="center">Login Page</Text>
          <form className='login-form'>
          <Box>
            <Label htmlFor='email'>Email</Label>
            <Input id='login-email' name='email' type='email' placeholder='jane@example.com'/>
          </Box>
          <br/>
          <Box>
            <Label htmlFor='password'>Password</Label>
            <Input id='login-password' name='password' type='password' placeholder='...' />
          </Box>          
          </form>
            <Box>
              <Link to="/a">
                <Button backgroundColor="#33e" variant='outline' mr={2}> Artist </Button>
              </Link> 
              <Link to="/g"> 
                <Button backgroundColor="#33e" variant='outline' mr={2}> Gallerist </Button>
              </Link>
              <br/>
            </Box>
      </Box>
          </Flex>
    </Theme>
  )
}

//--------------------------------------------------

function ArtistProfile () {

  return (
    <div>
      <ArtistWipsButton/>
      <LogoutButton/>
      <p> @ELIZA_BLAKEMORE </p>
      <p> followers. </p>
      <p> @ROMAN_ROAD </p>
      <p> wips. </p>
      <WipsListPreview/>
    </div>
  )
}

//--------------------------------------------------

function ArtistWips() {
  const {title} = useParams()
  const [wips, setWips] = useState([]);
  const [newWip, setNewWip] = useState('');

  useEffect(() => {
    methods.getWips()
    .then(response => {
      setWips(response)
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [])

  const addWip = async (wip_title) => {
    const newWips = wips.slice();
    const response = await methods.addWip(wip_title, "false", "")
    newWips.push(response)
    setWips(newWips);
  }

  const handleWipSubmit = (evt) => {
    evt.preventDefault();
    addWip(newWip);
    setNewWip(newWip=> newWip ="");
  }

  const deleteWip = (wipId) => {
    const editedWipsList = wips.filter(el => el._id !== wipId)
    methods.deleteWip(wipId)
    setWips(editedWipsList);
  }

  return (
    <div>
      <Flex>
        <ArtistProfileButton />
        <LogoutButton />
      </Flex>
      <Flex flexWrap='wrap' mx={-2}>
        <Box px={2} py={2} width={2/3}>
          <WipsList wips={wips} deleteWip={deleteWip}></WipsList>
        </Box>
        <Box px={2} py={2} width={1/3} >
          <WipInputBar newWip={newWip} setNewWip={setNewWip} handleWipSubmit={handleWipSubmit}></WipInputBar>
        </Box>
      </Flex>
    </div>
  )
}

//--------------------------------------------------

function ArtistWip() {
  const {title} = useParams();

  const [wip, setWip] = useState([]);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState(0);
  const [newWipTitle, setNewWipTitle] = useState('');

  // const updateTitle = async (wipId, wip_title) => {
  //   const response = await methods.updateTitle(wipId,wip_title)
  //   setNewWipTitle(response);
  // }

  useEffect(() => {
    methods.getWips()
    .then(response => {
      const wip = response.filter(card => card.wip_title.includes(title))[0]
      setWip(wip)
      const cards = wip.wip_cards
      setCards(cards)
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [])

  const updateTitle = async (wipId, wip_title) => {
    await methods.updateTitle(wip._id, newWipTitle)
  }

  const handleTitleSubmit = (evt) => {
    evt.preventDefault();
    updateTitle(wip._id, newWipTitle)
    setNewWipTitle(newWipTitle=> newWipTitle ="");
  }
  
  const addCard = async (wipId, img_url, upload_date, seen_by_state, seen_by_user, seen_by_date) => {
    const newCards = wip.wip_cards.slice();
    const response = await methods.addCard(wipId, img_url, upload_date, seen_by_state, seen_by_user, seen_by_date)
    newCards.push(response)
    setCards(newCards);
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    } 
  };

  const handleSubmit = (evt) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(img => {
            setImgUrl(img)
            addCard(wip._id, img, uploadDate, "false", "@ROMAN_ROAD", "");
          })
      }
    )
    evt.preventDefault();
    setUploadDate(uploadDate => uploadDate = '');
  };

  return (
    <div>
      <Flex px={2} color='white' alignItems='center'>
        <ArtistProfileButton />
        <ArtistWipsButton />
        <LogoutButton/>
      </Flex>
      <br/>
      <Text fontFamily='Roboto'>Update Title</Text>
      <form onSubmit={handleTitleSubmit}>
        <Input fontFamily='Roboto'name='updatedTitle' type='text' placeholder={title} value={newWipTitle} 
        onChange={(evt) => setNewWipTitle(evt.target.value)} required/>
        <Button>Update</Button>
      </form>
    <Flex flexWrap='wrap' mx={-2}>
        <Box px={2} py={2} width={2 / 3}>
          <Tiles width={[96, null, 128]}>
            {cards.map(one_card => <div key={one_card._id}>
              <NavLink to={`/a/wip/${wip.wip_title}/${one_card._id}`}>
                <Card width={[256, 320]} mx='auto' boxShadow='card'>
                  <Image src={one_card.img_url} alt="card url" />
                  <Text fontFamily='Roboto'> {one_card.upload_date}</Text>
                </Card>
              </NavLink>
              <button className='DeleteWipButton' onClick={() => methods.deleteCard(wip._id, one_card._id)}> - </button>
            </div>
            )}
          </Tiles>
        </Box>
        <Controller>
          <Scene duration={600} pin>
            <Box px={2} py={2} width={1 / 3}>
              <div>
                { wip.update_request === "true" ? 
                  <Text fontFamily='Roboto'>@ROMAN_ROAD has requested an update on {title}. <br/> Upload an update? </Text> 
                  : 
                  <Text fontFamily='Roboto'> Would you like to upload an update?</Text>
                }
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <progress value={progress} max="100" />
                  <br />
                  <Input type="file" onChange={handleChange} />
                  <br />
                  <Input type="date" name="uploadDate" value={uploadDate} onChange={(evt) => setUploadDate(evt.target.value)} required></Input>
                  <br />
                  <Button type="submit">Upload</Button>
                </form>
              </div>
            </Box>
          </Scene>
        </Controller>
      </Flex>
    </div>
  )
}

//--------------------------------------------------


function ArtistWipCard () {
  const {title} = useParams();
  const {wip_card_id} = useParams();

  const [wip, setWip] = useState([]);
  const [wipCard, setWipCard] = useState([]);

  const [card, setCard] = useState([]);
  const [cardComments, setCardComments] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      const wip = response.filter(card => card.wip_title.includes(title))[0]
      setWip(wip)
      const card = wip.wip_cards.filter(card => card._id.includes(wip_card_id))[0];
      setWipCard(card);
    methods.getAllCards()
      .then(response => {
        const card = response.filter(card => card._id.includes(wip_card_id))[0]
        setCard(card)
        const cardComments = card.comments
        setCardComments(cardComments)
    })
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [])

  return (
    <div>
      <Flex px={2} color='white' alignItems='center' position="sticky">
        <ArtistProfileButton/>
        <ArtistWipsButton/>
        <ArtistWipButton wip_title={title}/>
      </Flex>
      <br/>
      <Card width={[ 256, 320 ]} mx='auto'>
        <Image src={wipCard.img_url} alt="card img"></Image>
        <Text> {wipCard.upload_date} </Text>
        <Text>
          {wipCard.seen_by_state === "true" ? <p> seen by {wipCard.seen_by_user} on {wipCard.seen_by_date} </p> : <p> This wip remains unseen. </p>}
        </Text>
        <Text>
          {cardComments.length !== 0  ? cardComments.map(comment => <Text>"{comment.comment}" posted at {comment.upload_date} {comment.seen_by_date}</Text> ) : <Text> no comments yet </Text> }
        </Text>
      </Card>

    </div> 
  )
}

//--------------------------------------------------

function GalleristProfile() {
  const [wips, setWips] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      setWips(response)
    })
    methods.getAllCards()
    .then(response => {
      setCards(response)
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [])

  return (
    <div>
      <LogoutButton/>
      <p> @ROMAN_ROAD </p>
      <Box>
        <p> followed artists.</p>
        <form>
          <input placeholder="Artist Name"></input>
        </form>
          <p>
            @ANNA_SKLADMANN
            <br/>
            @ARIANE_HUGHES
            <br/>
            <Link to="/g/wips"> @ELIZA_BLAKEMORE </Link>
            <br/>
            @JACK_LAVER
            <br/>
            @YULIA_IOLSIZON
          </p>
      </Box>
      <Text> New Wip Updates from</Text>
      <NavLink to={`/g/wips`}>@ELIZA_BLAKEMORE:</NavLink>   
      {cards.map(card => card.seen_by_state === "false" ? <Card width={[ 256, 320 ]} mx='auto'><Image src={card.img_url}></Image><Text>{card.upload_date}</Text></Card> :
      null)}

    </div>
  )
}

//--------------------------------------------------

function GalleristWips() {
  const [wips, setWips] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      setWips(response)
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [])

  return (
    <div>
      <GalleristProfileButton/>
      <p>@ELIZA_BLAKEMORE</p>
      <GalleristWipsList wips={wips}/>
    </div>
  )
}

//--------------------------------------------------

function GalleristWip() {
  const {title} = useParams();

  const [wip, setWip] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      const wip = response.filter(card => card.wip_title.includes(title))[0]
      setWip(wip)
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [title])

  const handleClick = () => {
    methods.updateRequest(wip._id, "true");
  }

  return (
    <div> 
      <GalleristProfileButton/>
      <GalleristWipsButton/>
      <LogoutButton/>
      { (wip.wip_cards) ? <GalleristCardList cards={wip.wip_cards} wip={wip}></GalleristCardList> : null}
      {wip.update_request === "false" ? <Button backgroundColor="#33e" mr={2} onClick={handleClick}> Request Update </Button> : <Text> You have requested an update</Text>}
    </div>
  )
}

//--------------------------------------------------

function GalleristWipCard() {
  const {title} = useParams();
  const {wip_card_id} = useParams();

  const [wip, setWip] = useState([]);
  const [wipCard, setWipCard] = useState([]);

  const [card, setCard] = useState([]);
  const [cardComments, setCardComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = async (comment) => {
    const newComments = cardComments.slice();
    const response = await methods.addComment(wip_card_id, comment, Date(), 'false')
    newComments.push(response)
    setCardComments(newComments);
  }

  const handleCommentSubmit = (evt) => {
    evt.preventDefault();
    addComment(newComment);
    setNewComment(newComment=> newComment ="");
  }

  const handleClick = () => {
    methods.updateCard(wip._id, wipCard._id, "true", "@ROMAN_ROAD", Date());
  };

  useEffect(() => {
    methods.getWips()
    .then(response => {
      const wip = response.filter(card => card.wip_title.includes(title))[0]
      setWip(wip)
      const card = wip.wip_cards.filter(card => card._id.includes(wip_card_id))[0];
      setWipCard(card);
    methods.getAllCards()
    .then(response => {
      const card = response.filter(card => card._id.includes(wip_card_id))[0]
      setCard(card)
      const cardComments = card.comments
      setCardComments(cardComments)
    })
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [title])

  //addComment(cardId, comment, upload_date, seen_by_state, seen_by_user)
  
  return (
    <div> 
      <GalleristProfileButton/>
      <GalleristWipsButton/>
      <GalleristWipButton wip_title={title}/>
        <Box>
          <Card width={[ 256, 320 ]} mx='auto'>
            <Image src={wipCard.img_url} alt="card img" />
            <Text> {wipCard.upload_date}</Text>
          </Card>
        </Box>
        <Box>
          {wipCard.seen_by_state === "false" ? <Button backgroundColor="#33e" mr={2} onClick={handleClick}> Seen </Button> : <Text> Viewed at {wipCard.seen_by_date}</Text>}
        </Box>
        <form onSubmit={handleCommentSubmit}>
          <Input placeholder="Add a comment" value={newComment} onChange={(evt) => setNewComment(evt.target.value)} required></Input>
          <button>+</button> 
        </form>
        {cardComments.length !== 0  ? cardComments.map(comment => <Text>"{comment.comment}" posted at {comment.upload_date} {comment.seen_by_date}</Text>) : <Text> no comments yet </Text> }
    </div>
  )
}

//--------------------------------------------------


reportWebVitals();
