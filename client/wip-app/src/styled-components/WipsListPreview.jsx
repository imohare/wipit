import React from 'react';
import { useEffect, useState } from "react";
import methods from '../services';

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

export default WipsListPreview