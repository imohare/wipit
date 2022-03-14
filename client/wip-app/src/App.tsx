import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import ArtistProfile from "./screens/ArtistProfile";
import ArtistWips from "./components/ArtistWips";
import ArtistWip from "./components/ArtistWip";
import ArtistWipCard from "./components/ArtistWipCard";
import GalleristProfile from "./screens/GaleristProfile";
import GalleristWips from "./components/GalleristWips";
import GalleristWip from "./components/GalleristWip";
import GalleristWipCard from "./components/GalleristWipCard";
import {
  Box,
  Image,
  ChakraProvider,
  Text,
  Flex,
  Heading,
  Button,
  Link,
} from "@chakra-ui/react";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { createContext, useMemo, useState } from "react";
import UserContext from "./userContext";
import { userInfo } from "os";

//all the imports in case we need anything from here
// import Nav from './components/Nav';
// import reportWebVitals from './reportWebVitals';
// import methods from './services';
// import { storage } from './firebase/index';
// import WipsListPreview from './styled-components/artist/lists/WipsListPreview';
// import WipsList from './styled-components/artist/lists/WipsList';
// import WipInputBar from './styled-components/artist/input-bars/WipInputBar';
// import ArtistProfileButton from './styled-components/artist/route-buttons/ProfileButton';
// import ArtistWipsButton from './styled-components/artist/route-buttons/WipsButton';
// import ArtistWipButton from './styled-components/artist/route-buttons/WipButton';
// import LogoutButton from './styled-components/LogoutButton';
// import GalleristWipsList from './styled-components/gallerist/lists/GalleristWipsList';
// import GalleristCardList from './styled-components/gallerist/lists/GalleristCardList';
// import GalleristProfileButton from './styled-components/gallerist/route-buttons/ProfileButton';
// import GalleristWipsButton from './styled-components/gallerist/route-buttons/WipsButton';
// import GalleristWipButton from './styled-components/gallerist/route-buttons/WipButton';
// import plus from './plus-button.png';
// import { Controller, Scene } from 'react-scrollmagic';
// import logo from '../assets/wipit-logo.png';
// import Theme from './styled-components/theme/theme';
// import { Box, Button, Card, Image, Text, Flex, flexWrap } from 'rebass';
// import { Label, Input } from '@rebass/forms';
// import { Tiles } from '@rebass/layout';

function App(): JSX.Element {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<string>("");
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <ChakraProvider>
      <Router>
        <UserContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<Home setUserType={setUserType} />} />
            <Route
              path="/register"
              element={<Register userType={userType} />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/a" element={<ArtistProfile />} />
            <Route path="/a/wips" element={<ArtistWips />} />
            <Route path="/a/wip/:title" element={<ArtistWip />} />
            <Route
              path="/a/wip/:title/:wip_card_id"
              element={<ArtistWipCard />}
            />
            <Route path="/g" element={<GalleristProfile />} />
            <Route path="/g/wips" element={<GalleristWips />} />
            <Route path="/g/wip/:title" element={<GalleristWip />} />
            <Route
              path="/g/wip/:title/:wip_card_id"
              element={<GalleristWipCard />}
            />
          </Routes>
        </UserContext.Provider>
      </Router>
    </ChakraProvider>
  );
}

export default App;

// <Router>
// <Routes>
//   {/* maybe we should add a nav bar or a home page */}
//   {/* <Route path='/' element={<Home />} /> */}
//   <Route path="/" element={<Login />} />
//   <Route path="/a" element={<ArtistProfile />} />
//   <Route path="/a/wips" element={<ArtistWips />} />
//   <Route path="/a/wip/:title" element={<ArtistWip />} />
//   <Route path="/a/wip/:title/:wip_card_id" element={<ArtistWipCard />} />
//   <Route path="/g" element={<GalleristProfile />} />
//   <Route path="/g/wips" element={<GalleristWips />} />
//   <Route path="/g/wip/:title" element={<GalleristWip />} />
//   <Route
//     path="/g/wip/:title/:wip_card_id"
//     element={<GalleristWipCard />}
//   />
// </Routes>
// </Router>
