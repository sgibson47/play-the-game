import React, {Component} from 'react';
import HandCard from '../components/HandCard'

class Hand extends Component {
  render(){
    return(
      <div className="Hand">
        <h3>Your hand:</h3>
        {this.props.cards.map(card =>
          <HandCard value={card.value} key={card.id} played="false"/>
        )}
      </div>
    )
  }
}

// I think we're gonna need to move mapping the cards in the hand to HandCard out of the render()
// b/c we're gonna need to compare their ids(?) to ... a props value indicating which cards have been played?

export default Hand;