import ArtistWipsButton from '../styled-components/artist/route-buttons/WipsButton';
import LogoutButton from '../styled-components/LogoutButton';
import WipsListPreview from '../styled-components/artist/lists/WipsListPreview';

function ArtistProfile() {
  return (
    <div>
      <ArtistWipsButton />
      <LogoutButton />
      <p> @ELIZA_BLAKEMORE </p>
      <p> followers. </p>
      <p> @ROMAN_ROAD </p>
      <p> wips. </p>
      <WipsListPreview />
    </div>
  );
}

export default ArtistProfile;
