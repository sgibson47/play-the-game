import React, {Component} from 'react';
import Deck from '../components/Deck'
import Hand from './Hand'
import Piles from './Piles'
import MakeMove from '../components/MakeMove'

class Game extends Component {

  render(){
    // console.log("From Game")
    // debugger
    return(
      <div className="game">
        <Deck cardsLeft={this.props.currentGame.deck.cardCount}/>
        <Piles 
          piles={this.props.currentGame.piles}
          selectPile={this.props.selectPile}
          deselectPile={this.props.deselectPile}
        />
        <MakeMove 
          addMove={this.props.addMove}
          selectedCard={this.props.selectedCard}
          selectedPile={this.props.selectedPile}
          deselectCard={this.props.deselectCard}
          deselectPile={this.props.deselectPile}
        />
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

