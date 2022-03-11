import * as React from "react";
import { useState, useParams, useEffect } from "react";
import ArtistProfileButton from "../styled-components/artist/route-buttons/ProfileButton";
import LogoutButton from "../styled-components/LogoutButton";
import WipInputBar from "../styled-components/artist/input-bars/WipInputBar";
import WipsList from "../styled-components/artist/lists/WipsList";

export function ArtistWips() {
  const { title } = useParams();
  const [wips, setWips] = useState([]);
  const [newWip, setNewWip] = useState("");

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        setWips(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error occured.");
      });
  }, []);

  const addWip = async (wip_title) => {
    const newWips = wips.slice();
    const response = await methods.addWip(wip_title, "false", "");
    newWips.push(response);
    setWips(newWips);
  };

  const handleWipSubmit = (evt) => {
    evt.preventDefault();
    addWip(newWip);
    setNewWip((newWip) => (newWip = ""));
  };

  const deleteWip = (wipId) => {
    const editedWipsList = wips.filter((el) => el._id !== wipId);
    methods.deleteWip(wipId);
    setWips(editedWipsList);
  };

  return (
    <div>
      <Flex>
        <ArtistProfileButton />
        <LogoutButton />
      </Flex>
      <Flex flexWrap="wrap" mx={-2}>
        <Box px={2} py={2} width={2 / 3}>
          <WipsList wips={wips} deleteWip={deleteWip}></WipsList>
        </Box>
        <Box px={2} py={2} width={1 / 3}>
          <WipInputBar
            newWip={newWip}
            setNewWip={setNewWip}
            handleWipSubmit={handleWipSubmit}
          ></WipInputBar>
        </Box>
      </Flex>
    </div>
  );
}
