import { useState, useEffect } from 'react';
import methods from '../services';
import GalleristWipsList from '../styled-components/gallerist/lists/GalleristWipsList';
import GalleristProfileButton from '../styled-components/gallerist/route-buttons/ProfileButton';

function GalleristWips(): JSX.Element {
  type wipType = {
    _id: string,
    wip_title: string,
    wip_cards: [any],
    update_request: string,
    update_request_date: string,
  };

  const [wips, setWips] = useState<[wipType] | null>(null);

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
