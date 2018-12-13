import React, {Component} from 'react';
import Deck from '../components/Deck'
import Hand from './Hand'
import Piles from './Piles'
import MakeMove from '../components/MakeMove'
import BadMove from '../components/BadMove'
import EndTurn from '../components/EndTurn'

class Game extends Component {

  moveSelected = () =>{
    if(this.props.selectedPile.id !== 0 && this.props.selectedCard.id !==0){
      return true
    }else{
      return false
    }
  }

  validMove = (pile, card) =>{
    if(pile.asc){
      if(!pile.topMostCard || card.value > pile.topMostCard.value || card.value === (pile.topMostCard.value - 10)){
        return true
      }else{
        return false
      }
    }else{
      if(!pile.topMostCard || card.value < pile.topMostCard.value || card.value === (pile.topMostCard.value + 10)){
        return true
      }else{
        return false
      }
    }
  }

  invalidMoveSelected = () =>{
    if(this.moveSelected() && !this.validMove(this.props.selectedPile, this.props.selectedCard)){
      return true
    }else{
      return false
    }
  }

  validMoveSelected = () =>{
    if(this.moveSelected() && this.validMove(this.props.selectedPile, this.props.selectedCard)){
      return true
    }else{
      return false
    }
  }

  playedCardIds = () =>{
    if(this.props.moves.length === 0){
      return [0]
    }else{
      return this.props.moves.map(move =>move.card_id)
    }
  }

  playedAtLeastTwo = () =>{
    if(this.props.moves.length < 2){
      return false
    }else{
      return true
    }
  }

  render(){
    // console.log("From Game")
    // debugger
    return(
      <div className="game">
        <Deck cardsLeft={this.props.currentGame.deck.cardCount}/>
        <Piles 
          piles={this.props.currentGame.piles}
          selectedPile={this.props.selectedPile}
          selectPile={this.props.selectPile}
          deselectPile={this.props.deselectPile}
        />
        <MakeMove
          addMove={this.props.addMove}
          updateTopCard={this.props.updateTopCard}
          selectedCard={this.props.selectedCard}
          selectedPile={this.props.selectedPile}
          deselectCard={this.props.deselectCard}
          deselectPile={this.props.deselectPile}
          render={this.validMoveSelected()}
        />
        <BadMove render={this.invalidMoveSelected()}/>
        <EndTurn 
          render={this.playedAtLeastTwo()} 
          updateGame={this.props.updateGame}
          moves={this.props.moves}
        />
        <Hand 
          cards={this.props.currentGame.hand.cards}
          playedCardIds={this.playedCardIds()} 
          selectedCard={this.props.selectedCard}
          selectCard={this.props.selectCard}
          deselectCard={this.props.deselectCard}
        />
      </div>
    )
  }
}

export default Game;

