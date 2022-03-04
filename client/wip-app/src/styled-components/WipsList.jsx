import React from 'react';
import moment from 'moment';

function WipsList(props) {
  return (
    props.wips.map ( el => 
      <ul key={el._id}>
        <span>{el.wip_title}</span>
        {/* somehow you need to then map through wip_card */}
      </ul>
      )
  )
}

export default WipsList