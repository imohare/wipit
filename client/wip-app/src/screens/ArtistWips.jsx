import { Grid, GridItem } from "@chakra-ui/react";
import ArtistProfileButton from "../styled-components/artist/route-buttons/ProfileButton";
import ArtistCardForm from "../components/ArtistCardForm";
import ArtistCollectionForm from "../components/ArtistCollectionForm";
// import ArtistWipsButton from "../styled-components/artist/route-buttons/WipsButton";
import LogoutButton from "../components/LogoutButton";

function ArtistWip() {
  return (
    <>
      <LogoutButton />

      <ArtistProfileButton />

      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem rowSpan={2} colSpan={2} m={10}>
          <ArtistCollectionForm />
          <ArtistCardForm />
        </GridItem>
        <GridItem colSpan={3} bg="tomato" />
      </Grid>
    </>
  );
}
export default ArtistWip;
