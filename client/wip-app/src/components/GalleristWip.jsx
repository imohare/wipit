function GalleristWip() {
  const { title } = useParams();

  const [wip, setWip] = useState([]);

  useEffect(() => {
    methods
      .getWips()
      .then((response) => {
        const wip = response.filter((card) =>
          card.wip_title.includes(title)
        )[0];
        setWip(wip);
      })
      .catch((error) => {
        console.log(error);
        console.log('Error occured.');
      });
  }, [title]);

  const handleClick = () => {
    methods.updateRequest(wip._id, 'true');
  };

  return (
    <div>
      <GalleristProfileButton />
      <GalleristWipsButton />
      <LogoutButton />
      {wip.wip_cards ? (
        <GalleristCardList cards={wip.wip_cards} wip={wip}></GalleristCardList>
      ) : null}
      {wip.update_request === 'false' ? (
        <Button backgroundColor='#33e' mr={2} onClick={handleClick}>
          {' '}
          Request Update{' '}
        </Button>
      ) : (
        <Text> You have requested an update</Text>
      )}
    </div>
  );
}
