import { Slider } from '@rebass/forms';
import React from 'react';

function WipsList(props) {
  return (
    props.wips.map( el => 
      <ul key={el._id}>
        <span>{el.wip_title}</span>
        {/* find a way to use string interpolation
        so that you can make the wip_titles into Links */}
        {/* find a way to add the card images */}
        <button></button>
        <Slider></Slider>
      </ul>
      )
  )
}

export default WipsList