import {React} from 'react';

function CardsList(props) {

  return (
    props.one_wip.wip_cards.map( one_card => 
      <div key={one_card._id}>
        <img src={one_card.img_url} alt="card url"/>
      </div>
      )
  )
}

export default CardsList