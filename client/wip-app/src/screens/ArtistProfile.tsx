// import ArtistWipsButton from "../styled-components/artist/route-buttons/WipsButton";
import LogoutButton from "../components/LogoutButton";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ArtistProfile(): JSX.Element {
  return (
    <>
      {/* <ArtistWipsButton /> */}
      <Link to="/a/wips">
        <Button backgroundColor="teal" color="white" variant="outline" mr={2}>
          wips.
        </Button>
      </Link>
      <LogoutButton />
      <p> @ELIZA_BLAKEMORE </p>
      <p> followers. </p>
      <p> @ROMAN_ROAD </p>
      <p> wips. </p>
    </>
  );
}

export default ArtistProfile;
