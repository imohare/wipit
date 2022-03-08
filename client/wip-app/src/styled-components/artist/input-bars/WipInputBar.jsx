import React from "react";
import { Box, Text} from "rebass";
import { Label, Input } from '@rebass/forms'
import { Controller, Scene } from 'react-scrollmagic';

function WipInputBar (props) {

  return (
    <Controller>
      <Scene duration={600} pin>
        <form className='wip-form' onSubmit={props.handleWipSubmit}>
          <Text fontFamily='Roboto' fontSize={[ 3, 4, 5 ]} fontWeight='bold' color='#33e'>
            add wip
          </Text>
          <Box>
            <Label fontFamily='Roboto' htmlFor='title'>title</Label>
            <Input fontFamily='Roboto' name='newTitle' type='text' placeholder='Paradise Is Not Just a Place'
            value={props.newWip} onChange={(evt) => props.setNewWip(evt.target.value)} required/>
          </Box>
          <button>+</button> 
        </form>
      </Scene>
    </Controller>
  )
}

export default WipInputBar;