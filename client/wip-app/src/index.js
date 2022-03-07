import {React, useEffect, useState } from "react";

import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route, Link, useParams, Navlink, useNavigate, NavLink} from 'react-router-dom';

import { Label, Input, Switch } from '@rebass/forms'
import { Box, Button, Card, Image, Heading, Text } from 'rebass/styled-components'
import Theme from './styled-components/theme/theme';

import reportWebVitals from './reportWebVitals';
import methods from './services';
import {storage} from './firebase/index'

import WipsListPreview from './styled-components/artist/lists/WipsListPreview';
import WipsList from './styled-components/artist/lists/WipsList';
import CardsList from "./styled-components/artist/lists/CardsList";

import GalleristWipsList from "./styled-components/gallerist/lists/GalleristWipsList";
import GalleristCardsList from "./styled-components/gallerist/lists/GalleristCardList";

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
  }, [title])

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
      <ArtistProfileButton />
      <ArtistWipsButton />
      {cards.map( one_card => 
        <div key={one_card._id}>
          <NavLink to={`/a/wip/${wip.wip_title}/${one_card._id}`}>
            <img src={one_card.img_url} alt="card url"/>
            <p> {one_card.upload_date}</p>
          </NavLink>
          <button className='DeleteWipButton' onClick={() => methods.deleteCard(wip._id, one_card._id)}> - </button>
        </div>
        )
      }
      {/* { (wip.wip_cards) ? <CardsList cards={wip.wip_cards} wip={wip}></CardsList> : null} */}
      <br />
      <div>
      <form onSubmit={handleSubmit}>
        <progress value={progress} max="100"/>
        <br />
        <input type="file" onChange={handleChange} />
        <br />
        <input type="date" name="uploadDate" value={uploadDate} onChange={(evt) => setUploadDate(evt.target.value)} required></input>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
    </div>
  )  
}

//--------------------------------------------------


function ArtistWipCard () {
  const {title} = useParams();
  const {wip_card_id} = useParams();

  const [wip, setWip] = useState([]);
  const [wipCard, setWipCard] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      const wip = response.filter(card => card.wip_title.includes(title))[0]
      setWip(wip)
      const card = wip.wip_cards.filter(card => card._id.includes(wip_card_id))[0];
      setWipCard(card);
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [title])

  return (
    <div>
      <ArtistProfileButton/>
      <ArtistWipsButton/>
      <ArtistWipButton wip_title={title}/>
      <br/>
      <img src={wipCard.img_url} alt="card img"></img>
      { wipCard.seen_by_state === "true" ? <p> seen by {wipCard.seen_by_user} on {wipCard.seen_by_date} </p> : <p> This wip remains unseen. </p>}
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

  return (
    <div> 
      <GalleristProfileButton/>
      <GalleristWipsButton/>
      { (wip.wip_cards) ? <GalleristCardsList cards={wip.wip_cards} wip={wip}></GalleristCardsList> : null}
      <Link to="g/wip-card/:title">wip title card</Link>    
    </div>
  )
}

function GalleristWipCard() {
  const {title} = useParams();
  const {wip_card_id} = useParams();

  const [wip, setWip] = useState([]);
  const [wipCard, setWipCard] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      const wip = response.filter(card => card.wip_title.includes(title))[0]
      setWip(wip)
      const card = wip.wip_cards.filter(card => card._id.includes(wip_card_id))[0];
      setWipCard(card);
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [title])
  
  return (
    <div> 
      <GalleristProfileButton/>
      <GalleristWipsButton/>
      <GalleristWipButton wip_title={title}/>
      <img src={wipCard.img_url} alt="card img"></img>
      { wipCard.seen_by_state === "true"}
      <p> {wipCard.seen_by_state}</p>
      <Switch></Switch>
    </div>
  )
}

//--------------------------------------------------


reportWebVitals();
