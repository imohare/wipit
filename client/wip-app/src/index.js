import {React, useEffect, useState } from "react";

import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route, Link, useParams, Navlink, useNavigate, NavLink} from 'react-router-dom';

import { Label, Input, Switch } from '@rebass/forms'
import { Box, Button, Card, Image, Heading, Text } from 'rebass'
import Theme from './styled-components/theme/theme';

import reportWebVitals from './reportWebVitals';
import methods from './services';
import {storage} from './firebase/index'

import WipsListPreview from './styled-components/artist/lists/WipsListPreview';
import WipsList from './styled-components/artist/lists/WipsList';
import CardsListForWipsList from './styled-components/artist/lists/CardsListForWipsList';

import GalleristWipsList from "./styled-components/gallerist/lists/GalleristWipsList";

import WipInputBar from './styled-components/artist/input-bars/WipInputBar';
import CardInputBar from "./styled-components/artist/input-bars/CardInputBar";

import ArtistProfileButton from './styled-components/artist/route-buttons/ProfileButton';
import ArtistWipsButton from './styled-components/artist/route-buttons/WipsButton';
import ArtistWipButton from './styled-components/artist/route-buttons/WipButton';

import GalleristProfileButton from "./styled-components/gallerist/route-buttons/ProfileButton"; 
import GalleristWipsButton from "./styled-components/gallerist/route-buttons/WipsButton";
import GalleristWipButton from "./styled-components/gallerist/route-buttons/WipButton"; 

import logo from './wipit-logo.png';
import plus from './plus-button.png';

ReactDOM.render(
  <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/a" element={<ArtistProfile/>}/>
        <Route path="/a/wips" element={<ArtistWips/>} />
        <Route path="/a/wip/:title" element={<ArtistWip/>}/>
        <Route path="/a/wip/:tile/:wip_card_id" element={<ArtistWipCard/>} />
        <Route path="/g" element={<GalleristProfile/>} />
        <Route path="/g/wips" element={<GalleristWips/>} />
        {/* <Route path="/g/wip/:wip_title" element={<GalleristWip/>}/>
        <Route path="/g/wip-card/:wip_card_id" element={<GalleristWipCard/>} /> */}
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
      <img src={logo} alt="Logo"/>
      <p>Login Page</p>
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
      <Link to="/a">artist</Link> 
      <Switch />
      <Link to="/g"> gallerist</Link>
      <Button variant='outline' mr={2}>Sign In</Button>
    </Theme>
  )
}

//--------------------------------------------------

function ArtistProfile () {

  return (
    <div>
      <ArtistWipsButton/>
      <p> @BEX_MASSEY </p>
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

  console.log("wips:", wips)


  const addWip = async (wip_title) => {
    const newWips = wips.slice();
    const response = await methods.addWip(wip_title)
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
      <ArtistProfileButton/>
      <p>Artist Wips</p>
      <WipsList wips={wips} deleteWip={deleteWip}></WipsList>
      <WipInputBar newWip={newWip} setNewWip={setNewWip} handleWipSubmit={handleWipSubmit}></WipInputBar>
      <Link to="/a/wip/:title">wip {title}</Link>
    </div>
  )
}

//--------------------------------------------------

function ArtistWip() {
  const {title} = useParams();
  const {wip_card_id} = useParams();

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
  }, [])

  //const wipCardsImg = wip.wip_cards.map(one_card => one_card)
  console.log("correct wip", wip);
  // console.log("wip_card_id", wip._id);
  console.log("wip_cards", wip.wip_cards);
  //console.log("wip_cards_individuals", wip.wip_cards.map(cards => cards))

  // const addCard = async (img_url, upload_date, seen_by_state) => {
  //   const newCards = wip.wip_cards.slice();
  //   const response = await methods.addTopic(title, date)
  //   console.log(date)
  //   newTopics.push(response)
  //   setTopics(newTopics);
  // }


  return (
    <div>
      <ArtistProfileButton/>
      <ArtistWipsButton />
      <div>
      </div>
      <br />
      <Link to="/a/wip/:wip_title/:wip_card_id"> {title} cards</Link>
      <br />
      <CardInputBar/>
    </div>
  )  
}

//--------------------------------------------------


function ArtistWipCard () {

  return (
    <div>
      <ArtistProfileButton/>
      <ArtistWipsButton/>
      <ArtistWipButton/>
      <p> Artist Wip Card</p>
    </div> 
  )
}

//--------------------------------------------------

function GalleristProfile() {
  return (
    <div>
    <div>
      <p> @ROMAN_ROAD </p>
      <p> following. </p>
      <Link to="/g/wips">@BEX_MASSEY</Link>
      <p> followed artsits.</p>
      <form>
        <input placeholder="Artist Name"></input>
      </form>
      {/* here when you type in the input
      the name of the artist should come up with
      a follow button next to it */}
    </div>
    </div>
  )
}

//--------------------------------------------------

function GalleristWips() {
  const {title} = useParams()
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
      <p>@BEX_MASSEY</p>
      <GalleristWipsList wips={wips}/>
    </div>
  )
}

//--------------------------------------------------

// function GalleristWip() {
//   return (
//     <div> 
//       <Link to="/g">profile</Link>
//       <Link to="/g/wips">wips</Link>
//       <p> Wip </p>
//       <Link to="g/wip-card/:title">wip title card</Link>    
//     </div>
//   )
// }

// function GalleristWipCard() {
//   return (
//     <div> 
//       <Link to="/g">profile</Link>
//       <Link to="/g/wips">wips</Link>
//       <Link to="g/wip/:title">wip title</Link>
//       <p> Wip Card </p>
//     </div>
//   )
// }


reportWebVitals();
