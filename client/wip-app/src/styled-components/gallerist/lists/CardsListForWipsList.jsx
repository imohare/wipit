import React from 'react';

function CardsList(props) {

  return (
    props.one_wip.wip_cards.map( one_card => 
      <div key={one_card._id}>
        <div>this should be the wip cards img {one_card.img_url} </div>
      </div>
      )
  )
}

export default CardsList