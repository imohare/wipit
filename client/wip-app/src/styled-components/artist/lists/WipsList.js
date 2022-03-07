import { React} from 'react';
import { NavLink } from 'react-router-dom';
import CardsList from './CardsListForWipsList';


function WipsList(props) {

  return (
    props.wips.map( one_wip => 
      <div key={one_wip._id}>
        <NavLink to={`/a/wip/${one_wip.wip_title}`}>{one_wip.wip_title}</NavLink>
        <button className='DeleteWipButton' onClick={() => props.deleteWip(one_wip._id)}> - </button>
        {/* if wip_cards exist then....  */}
        { (one_wip.wip_cards) ? <CardsList one_wip={one_wip}/> : null}
      </div>
      )
  )
}

export default WipsList