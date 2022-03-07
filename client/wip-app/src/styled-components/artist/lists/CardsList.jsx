import {React} from 'react';
import { NavLink } from 'react-router-dom';
import methods from '../../../services';

function CardsList(props) {
  return (
    props.cards.map( one_card => 
      <div key={one_card._id}>
        <NavLink to={`/a/wip/${props.wip.wip_title}/${one_card._id}`}>
          <img src={one_card.img_url} alt="card url"/>
        </NavLink>
        <button className='DeleteWipButton' onClick={() => methods.deleteCard(props.wip._id, one_card._id)}> - </button>
      </div>
      )
  )
}

export default CardsList