import React, {Component} from 'react';
import Deck from '../components/Deck'
import Hand from './Hand'
import Piles from './Piles'

class Game extends Component {
  render(){
    debugger
    return(
      <div className="game">
        
      </div>
    )
  }
}

export default Game;

// <Deck cardsLeft={this.props.currentGame.deck.cards.length}/>
//         <Piles piles={this.props.game.piles}/>
//         <Hand cards={this.props.game.hand.cards}/>