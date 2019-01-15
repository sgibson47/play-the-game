import React, {Component} from 'react';
import HandCard from '../components/HandCard'

class Hand extends Component {  
  createHandCards = () => {
    return this.props.cards.map(card =>

          <HandCard 
            card={card} 
            key={card.id} 
            selectCard={this.props.selectCard}
            deselectCard={this.props.deselectCard}
            selectedCard={this.props.selectedCard}
          />
        )
  };


  render(){
    return(
      <div className="HandHolder">
        <h3>Your hand:</h3>
        <div className="Hand">
          {this.createHandCards()}
        </div>
      </div>
    )
  }
}

// I think we're gonna need to move mapping the cards in the hand to HandCard out of the render()
// b/c we're gonna need to compare their ids(?) to ... a props value indicating which cards have been played?

export default Hand;