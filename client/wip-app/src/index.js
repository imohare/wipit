import React from 'react';
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { storage } from "./firebase";
import methods from './services';
import logo from './wipit-logo.png';
import WipsList from './styled-components/WipsList';

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
    <div>
      <p>Login Page</p>
      <Link to="/a">artist |</Link> 
      <Link to="/g"> gallerist</Link>
    </div>
  )
}

//--------------------------------------------------

function ArtistProfile () {
  
  const [wips, setWips] = useState([]);

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

  return (
    <div>
      <p> Artist Profile </p>
      <Link to="/a/wips">wips</Link>
      <WipsList wips={wips}></WipsList>
    </div>
  )
}

//--------------------------------------------------

function ArtistWips() {
  const {wip_title} = useParams()
  return (
    <div>
      <Link to="/a">profile</Link>
      <p>Artist Wips</p>
      <Link to="/a/wip/:wip_title">wip {wip_title}</Link>
    </div>
  )
}

//--------------------------------------------------

function ArtistWip() {
  const {wip_title} = useParams()
  return (
    <div>
      <Link to="/a">profile</Link>
      <Link to="/a/wips">wips</Link>
      <p> Artist Wip</p>
      <Link to="/a/wip/:wip_title/:wip_card_id">wip {wip_title} card</Link>
    </div>
  )
}

//--------------------------------------------------


function ArtistWipCard () {

  const {wip_title} = useParams()
  
  const [image, setImage] = useState(null);
 
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    } 
  };

  console.log("image:", image);

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            //console.log(url)
          })
      }
    )
  };

  return (
    <div>
      <Link to="/a">profile</Link>
      <Link to="/a/wips">wips</Link>
      <Link to="/a/wip/:wip_title">{wip_title}</Link>
      <p> Artist Wip Card</p>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
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
