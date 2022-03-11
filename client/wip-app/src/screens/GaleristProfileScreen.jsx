// // import { React, useEffect, useState } from 'react';
// // import methods from './services';
// // import LogoutButton from './styled-components/LogoutButton';
// // import { Box, Button, Card, Image, Text, Flex, flexWrap } from 'rebass';
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Link,
// //   useParams,
// //   NavLink,
// // } from 'react-router-dom';

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useParams,
//   NavLink,
// } from 'react-router-dom';

// import { Label, Input } from '@rebass/forms';
// import { Box, Button, Card, Image, Text, Flex, flexWrap } from 'rebass';
// import { Tiles } from '@rebass/layout';
// import Theme from './styled-components/theme/theme';

// import reportWebVitals from './reportWebVitals';
// import methods from './services';
// import { storage } from './firebase/index';

// import WipsListPreview from './styled-components/artist/lists/WipsListPreview';
// import WipsList from './styled-components/artist/lists/WipsList';

// import GalleristWipsList from './styled-components/gallerist/lists/GalleristWipsList';
// import GalleristCardList from './styled-components/gallerist/lists/GalleristCardList';

// import WipInputBar from './styled-components/artist/input-bars/WipInputBar';

// import ArtistProfileButton from './styled-components/artist/route-buttons/ProfileButton';
// import ArtistWipsButton from './styled-components/artist/route-buttons/WipsButton';
// import ArtistWipButton from './styled-components/artist/route-buttons/WipButton';
// import LogoutButton from './styled-components/LogoutButton';

// import GalleristProfileButton from './styled-components/gallerist/route-buttons/ProfileButton';
// import GalleristWipsButton from './styled-components/gallerist/route-buttons/WipsButton';
// import GalleristWipButton from './styled-components/gallerist/route-buttons/WipButton';

// import logo from './wipit-logo.png';
// import plus from './plus-button.png';

// import { Controller, Scene } from 'react-scrollmagic';

// // function GalleristProfile() {
// //   const [wips, setWips] = useState([]);
// //   const [cards, setCards] = useState([]);

// //   useEffect(() => {
// //     methods.getWips().then((response) => {
// //       setWips(response);
// //     });
// //     methods
// //       .getAllCards()
// //       .then((response) => {
// //         setCards(response);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         console.log('Error occured.');
// //       });
// //   }, []);

// //   return (
// //     <div>
// //       <LogoutButton />
// //       <p> @ROMAN_ROAD </p>
// //       <Box>
// //         <p> followed artists.</p>
// //         <form>
// //           <input placeholder='Artist Name'></input>
// //         </form>
// //         <p>
// //           @ANNA_SKLADMANN
// //           <br />
// //           @ARIANE_HUGHES
// //           <br />
// //           <Link to='/g/wips'> @ELIZA_BLAKEMORE </Link>
// //           <br />
// //           @JACK_LAVER
// //           <br />
// //           @YULIA_IOLSIZON
// //         </p>
// //       </Box>
// //       <Text> New Wip Updates from</Text>
// //       <NavLink to={`/g/wips`}>@ELIZA_BLAKEMORE:</NavLink>
// //       {cards.map((card) =>
// //         card.seen_by_state === 'false' ? (
// //           <Card width={[256, 320]} mx='auto'>
// //             <Image src={card.img_url}></Image>
// //             <Text>{card.upload_date}</Text>
// //           </Card>
// //         ) : null
// //       )}
// //     </div>
// //   );
// // }
