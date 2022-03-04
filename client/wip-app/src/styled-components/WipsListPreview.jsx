import React from 'react';

function WipsListPreview(props) {
  return (
    props.wips.map ( el => 
      <ul key={el._id}>
        <span>{el.wip_title}</span>
        {/* somehow you need to then map through wip_card array to get all cards */}
      </ul>
      )
  )
}

export default WipsListPreview