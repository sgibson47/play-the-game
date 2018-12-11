import React, {Component} from 'react';
import Deck from '../components/Deck'
import Hand from './Hand'
import Piles from './Piles'

class Game extends Component {
  render(){
    return(
      <div className="game">
        <Deck cardsLeft={this.props.currentGame.deck.cards.length}/>
        <Piles piles={this.props.currentGame.piles}/>
        <Hand 
          cards={this.props.currentGame.hand.cards} 
          selectedCard={this.props.selectedCard}
          selectCard={this.props.selectCard}
          deselectCard={this.props.deselectCard}
        />
      </div>
    )
  }
}

export default Game;

