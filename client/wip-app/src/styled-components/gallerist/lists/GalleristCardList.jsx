import {React} from 'react';
import { NavLink } from 'react-router-dom';
import {Image, Card, Text} from 'rebass'
import {Tiles} from '@rebass/layout'

function GalleristCardsList(props) {
  return (
        <Tiles width={[96, null, 128]}>
          {props.cards.map( one_card => 
            <div key={one_card._id}>
              <NavLink to={`/g/wip/${props.wip.wip_title}/${one_card._id}`}>
                <Card width={[ 256, 320 ]} mx='auto'>
                  <Image src={one_card.img_url} alt="card url"/>
                  <Text>{one_card.upload_date} </Text>
                </Card>
              </NavLink>
            </div>
          )}
        </Tiles>
  )
}

export default GalleristCardsList;