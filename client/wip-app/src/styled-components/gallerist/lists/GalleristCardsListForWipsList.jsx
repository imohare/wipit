import React from 'react';
import { NavLink } from 'react-router-dom';
import {Card, Image, Text} from 'rebass'
import {Tiles} from '@rebass/layout'

function CardsList(props) {
  return (
    <Tiles width={[96, null, 128]}>
    {props.one_wip.wip_cards.map( one_card => 
      <div key={one_card._id}>
        <NavLink to={`/g/wip/${props.one_wip.wip_title}/${one_card._id}`}>
        <Card width={[ 256, 320 ]} mx='auto'>
          <Image src={one_card.img_url} alt="Card Not Found"/>
          <Text>{one_card.upload_date} </Text>
          </Card>
        </NavLink>
      </div>
      )}
    </Tiles>

  )
}

export default CardsList