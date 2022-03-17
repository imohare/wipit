import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import ArtistProfile from "./screens/ArtistProfile";
import ArtistWips from "./screens/ArtistWips";
import ArtistWip from "./components/ArtistWip";
import GalleristProfile from "./screens/GaleristProfile";
import GalleristWips from "./components/GalleristWips";
import GalleristWip from "./components/GalleristWip";
import GalleristWipCard from "./components/GalleristWipCard";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./screens/Register";
import Home from "./screens/Home";
import { useMemo, useState } from "react";
import { WipCollectionContext, UserContext, WipContext } from "./userContext";
import Collection from "./screens/Collection";

function App(): JSX.Element {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState<string>("");
  const [wipCollection, setWipCollection] = useState<any>(null);
  const [wip, setWip] = useState<any>(null);

  const valueUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const valueCollection = useMemo(
    () => ({ wipCollection, setWipCollection }),
    [wipCollection, setWipCollection]
  );
  const valueWip = useMemo(() => ({ wip, setWip }), [wip, setWip]);
  return (
    <ChakraProvider>
      <Router>
        <UserContext.Provider value={valueUser}>
          <WipCollectionContext.Provider value={valueCollection}>
            <WipContext.Provider value={valueWip}>
              <Routes>
                <Route path="/" element={<Home setUserType={setUserType} />} />
                <Route
                  path="/register"
                  element={<Register userType={userType} />}
                />

                <Route path="/login" element={<Login userType={userType} />} />
                <Route path={`/a/:profileId`} element={<ArtistProfile />} />
                <Route path="/a/wips" element={<ArtistWips />} />
                <Route path="/a/wip/:title" element={<ArtistWip />} />
                <Route path="/collection" element={<Collection />} />
                <Route path={`/g/:profileId`} element={<GalleristProfile />} />
                <Route path="/g/wips" element={<GalleristWips />} />
                <Route path="/g/wip/:title" element={<GalleristWip />} />
                <Route
                  path="/g/wip/:title/:wip_card_id"
                  element={<GalleristWipCard />}
                />
              </Routes>
            </WipContext.Provider>
          </WipCollectionContext.Provider>
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
