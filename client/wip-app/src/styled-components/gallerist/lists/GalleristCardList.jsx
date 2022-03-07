import {React} from 'react';
import { NavLink } from 'react-router-dom';

function GalleristCardsList(props) {
  return (
    props.cards.map( one_card => 
      <div key={one_card._id}>
        <NavLink to={`/g/wip/${props.wip.wip_title}/${one_card._id}`}>
          <img src={one_card.img_url} alt="card url"/>
        </NavLink>
      </div>
      )
  )
}

export default GalleristCardsList;