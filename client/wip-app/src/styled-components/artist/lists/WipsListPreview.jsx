import React from 'react';
import { useEffect, useState } from "react";
import methods from '../../../services';

function WipsListPreview() {
  const [wips, setWips] = useState([]);

  useEffect(() => {
    methods.getWips()
    .then(response => {
      response.sort()
      setWips(response)
    })
    .catch( error => {
      console.log(error)
      console.log("Error occured.")
    })
  }, [])

  return (
    wips.map ( el => 
      <ul key={el._id}>
        <span>{el.wip_title}</span>
        {/* somehow you need to then map through wip_card array to get all cards */}
      </ul>
      )
  )
}

// wips.map ( one_wip => 
//   one_wip.map (one_wip_card => 
//     <div key={one_wip._id} >
//       <span>{one_wip_card.img_url}</span>
//     </div>
//   )
// )

// this gives WipsListPreview.jsx:20 Uncaught TypeError: one_wip.map is not a function

export default WipsListPreview