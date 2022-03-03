import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import logo from './wipit-logo.png';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/a" element={<ArtistProfile/>}/>
      <Route path="/a/wips" element={<ArtistWips/>} />
      <Route path="/a/wip/:wip_title" element={<ArtistWip/>}/>
      <Route path="/a/wip-card/:wip_card_id" element={<ArtistWipCard/>} />
      <Route path="/g" element={<GalleristProfile/>} />
      <Route path="/g/wips" element={<GalleristWips/>} />
      <Route path="/g/wip/:wip_title" element={<GalleristWip/>}/>
      <Route path="/g/wip-card/:wip_card_id" element={<GalleristWipCard/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Home() {
  return (
    <div>
      <img src={logo} alt="Logo"/>
      <Link to="/login">login</Link>
    </div>
  )
}

function Login() {
  return (
    <div>
      <p>Login Page</p>
      <Link to="/a">artist |</Link> 
      <Link to="/g"> gallerist</Link>
    </div>
  )
}

function ArtistProfile() {
  return (
    <div>
      <p> Artist Profile </p>
      <Link to="/a/wips">wips</Link>
    </div>
  )
}

function ArtistWips() {
  return (
    <div>
      <Link to="/a">profile</Link>
      <p>Artist Wips</p>
      <Link to="/a/wip/:title">wip title</Link>
    </div>
  )
}

function ArtistWip() {
  return (
    <div>
      <Link to="/a">profile</Link>
      <Link to="/a/wips">wips</Link>
      <p> Artist Wip</p>
      <Link to="a/wip-card/:title">wip title card</Link>
    </div>
  )
}

function ArtistWipCard () {
  return (
    <div>
      <Link to="/a">profile</Link>
      <Link to="/a/wips">wips</Link>
      <Link to="a/wip/:title">wip title</Link>
      <p> Artist Wip Card</p>
    </div>
  )
}

function GalleristProfile() {
  return (
    <div>
      <p> Gallerist Profile </p>
      <Link to="/g/wips">wips</Link>
    </div>
  )
}

function GalleristWips() {
  return (
    <div> 
      <Link to="/g">profile</Link>
      <p> Wips</p>
      <Link to="/g/wip/:title">wip title</Link>    </div>
  )
}

function GalleristWip() {
  return (
    <div> 
      <Link to="/g">profile</Link>
      <Link to="/g/wips">wips</Link>
      <p> Wip </p>
      <Link to="g/wip-card/:title">wip title card</Link>    
    </div>
  )
}

function GalleristWipCard() {
  return (
    <div> 
      <Link to="/g">profile</Link>
      <Link to="/g/wips">wips</Link>
      <Link to="g/wip/:title">wip title</Link>
      <p> Wip Card </p>
    </div>
  )
}


reportWebVitals();
