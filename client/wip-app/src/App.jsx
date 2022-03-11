import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from 'react-router-dom';
// import logo from './wipit-logo.png';
import Login from './screens/Login';
import Nav from './components/Nav';

function App() {
  return (
    // <Router>
    //   <div className='App'>
    //     <Nav>
    //       <Routes>
    //         {/* <Route path='/' exact component={Home} /> */}
    //         <Route path='/' component={Login} />
    //       </Routes>
    //     </Nav>
    //   </div>
    // </Router>
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Login />} />
        {/* <Route path='/a' element={<ArtistProfile />} /> */}
        {/* <Route path='/a/wips' element={<ArtistWips />} /> */}
        {/* <Route path='/a/wip/:title' element={<ArtistWip />} /> */}
        {/* <Route path='/a/wip/:title/:wip_card_id' element={<ArtistWipCard />} /> */}
        {/* <Route path='/g' element={<GalleristProfile />} /> */}
        {/* <Route path='/g/wips' element={<GalleristWips />} /> */}
        {/* <Route path='/g/wip/:title' element={<GalleristWip />} /> */}
        {/* <Route path='/g/wip/:title/:wip_card_id' element={<GalleristWipCard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
