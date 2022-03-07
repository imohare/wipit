import { React} from 'react';
import { NavLink } from 'react-router-dom';
import CardsListForWipsList from './GalleristCardsListForWipsList';


function GalleristWipsList(props) {

  return (
    props.wips.map( one_wip => 
      <div key={one_wip._id}>
        <NavLink to={`/g/wip/${one_wip.wip_title}`}>{one_wip.wip_title}</NavLink>
        { (one_wip.wip_cards) ? <CardsListForWipsList one_wip={one_wip}/> : null}
      </div>
      )
  )
}

export default GalleristWipsList