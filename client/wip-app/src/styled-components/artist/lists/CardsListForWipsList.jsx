import {React} from 'react';
import { NavLink } from 'react-router-dom';

function CardsList(props) {

  return (
    props.one_wip.wip_cards.map( one_card => 
      <div key={one_card._id}>
        <NavLink to={`/a/wip/${props.one_wip.wip_title}/${one_card._id}`}>
          <img src={one_card.img_url} alt="Card Not Found"/>
        </NavLink>
      </div>
      )
  )
}

export default CardsList