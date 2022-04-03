import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

function GalleryButton() {
  let navigate = useNavigate();
  const galleryRoute = () => {
    const path = `/g/wips`;
    navigate(path);
  };

  return (
    <Button
      name='galleryRoute'
      m={2}
      onClick={galleryRoute}
      backgroundColor='teal'
      color='white'
    >
      gallery
    </Button>
  );
}

export default GalleryButton;
