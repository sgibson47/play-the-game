import React, {Component} from 'react';
import HandCard from '../components/HandCard'

class Hand extends Component {
  render(){
    return(
      <div className="Hand">
        {this.props.cards.map(card =>
          <HandCard value={card.value}/>
        )}
      </div>
    )
  }
}

export default Hand;