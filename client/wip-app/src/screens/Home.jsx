import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  NavLink,
} from 'react-router-dom';
import logo from './wipit-logo.png';

function Home() {
  return (
    <div>
      <img src={logo} alt='Logo' />
      <Link to='/login'>login</Link>
    </div>
  );
}

export default Home;
