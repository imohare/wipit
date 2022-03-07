import React from "react";
import { Box } from "rebass";
import { Label, Input } from '@rebass/forms'

function WipInputBar (props) {

  return (
    <form className='wip-form' onSubmit={props.handleWipSubmit}>
        add wip
        <Box>
          <Label htmlFor='title'>title</Label>
          <Input className="wip-title-input" id='wip_title' name='newTitle' type='text' placeholder='Paradise Is Not Just a Place'
          value={props.newWip} onChange={(evt) => props.setNewWip(evt.target.value)} required/>
          {/* make sure the text is in italics */}
        </Box>
        <button>+</button> 
        {/* find a way to make the button the image of plus */}
      </form>
  )
}

export default WipInputBar;