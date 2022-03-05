import React from 'react';
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { Label, Input, Switch } from '@rebass/forms'
import { Box, Button, Card, Image, Heading, Text } from 'rebass'

import reportWebVitals from './reportWebVitals';

import Theme from './theme/theme';
import methods from './services';
import {storage} from './firebase/index'

import WipsListPreview from './styled-components/WipsListPreview';
import WipsList from './styled-components/WipsList';

import ProfileButton from './styled-components/route-buttons/ProfileButton';
import WipsButton from './styled-components/route-buttons/WipsButton';
import WipButton from './styled-components/route-buttons/WipButton';

import logo from './wipit-logo.png';
import plus from './plus-button.png';
import WipInputBar from './styled-components/input-bars/WipInputBar';

ReactDOM.render(
  <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/a" element={<ArtistProfile/>}/>
        <Route path="/a/wips" element={<ArtistWips/>} />
        <Route path="/a/wip/:wip_title" element={<ArtistWip/>}/>
        <Route path="/a/wip/:wip_title/:wip_card_id" element={<ArtistWipCard/>} />
        {/* <Route path="/g" element={<GalleristProfile/>} />
        <Route path="/g/wips" element={<GalleristWips/>} />
        <Route path="/g/wip/:wip_title" element={<GalleristWip/>}/>
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
      <WipsButton/>
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
  const {wip_title} = useParams()
  const [wips, setWips] = useState([]);
  const [newWip, setNewWip] = useState('');

  useEffect(() => {
    methods.getWips()
    .then(response => {
      response.sort()
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
  // this deletes on the front end but not back end

  return (
    <div>
      {/* <Button variant='outline' mr={2} onClick={profileRouteChange}>profile.</Button> */}
      <ProfileButton/>
      <p>Artist Wips</p>
      <WipsList wips={wips} deleteWip={deleteWip}></WipsList>
      <WipInputBar newWip={newWip} setNewWip={setNewWip} handleWipSubmit={handleWipSubmit}></WipInputBar>
      <Link to="/a/wip/:wip_title">wip {wip_title}</Link>
    </div>
  )
}

//--------------------------------------------------

function ArtistWip() {

  const {wip_title} = useParams();

  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  //here you have a url for the image saved in firebase
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    } 
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(imgUrl => {
            setImgUrl(imgUrl)
          })
      }
    )
    // set the rest (date, seen, date seen, user seen, img(this can now be set to the image url) )
  };

  return (
    <div>
      <ProfileButton/>
      <WipsButton/>
      <br />
      <Link to="/a/wip/:wip_title/:wip_card_id">wip {wip_title} card</Link>
      <br />
      <progress value={progress} max="100"/>
      <br />
      <input type="file" onChange={handleChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

//--------------------------------------------------


function ArtistWipCard () {

  return (
    <div>
      <ProfileButton/>
      <WipsButton/>
      <WipButton/>
      <p> Artist Wip Card</p>
    </div> 
  )
}


// function GalleristProfile() {
//   return (
//     <div>
//       <p> Gallerist Profile </p>
//       <Link to="/g/wips">wips</Link>
//     </div>
//   )
// }

// function GalleristWips() {
//   return (
//     <div> 
//       <Link to="/g">profile</Link>
//       <p> Wips</p>
//       <Link to="/g/wip/:title">wip title</Link>    </div>
//   )
// }

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
