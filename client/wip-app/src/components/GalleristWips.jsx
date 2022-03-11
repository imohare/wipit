import { useState, useEffect } from 'react';
import methods from '../services';
import GalleristWipsList from '../styled-components/gallerist/lists/GalleristWipsList';
import GalleristProfileButton from '../styled-components/gallerist/route-buttons/ProfileButton';

function GalleristWips() {
  const [wips, setWips] = useState([]);

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        setWips(response);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, []);

  return (
    <div>
      <GalleristProfileButton />
      <p>@ELIZA_BLAKEMORE</p>
      <GalleristWipsList wips={wips} />
    </div>
  );
}
export default GalleristWips;
