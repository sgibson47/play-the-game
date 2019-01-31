import React, {Component} from 'react';
import Piles from './Piles';
import HeaderAndDeck from './HeaderAndDeck';

class DeckAndPiles extends Component {  

  render(){
    return(
      <div className="DeckAndPiles">
        <HeaderAndDeck
          cardsLeft={this.props.cardsLeft}
          player={this.props.player}
        />
        <Piles 
          piles={this.props.piles}
          selectedPile={this.props.selectedPile}
          selectPile={this.props.selectPile}
          deselectPile={this.props.deselectPile}
        />
      </div>
    )
  }
}

export default DeckAndPiles;