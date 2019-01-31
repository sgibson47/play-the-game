import React, {Component} from 'react';
import Hand from './Hand'
import Piles from './Piles'
import MakeMove from '../components/MakeMove'
import BadMove from '../components/BadMove'
import EndTurn from '../components/EndTurn'
import GameOver from '../components/GameOver'
import HeaderAndDeck from './HeaderAndDeck'

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

  playedAtLeastTwo = () =>{
    if(this.props.currentGame.moves < 2){
      return false
    }else{
      return true
    }
  }
  
  componentDidMount(){
    const gameId = this.props.match.params.gameId
    if(this.props.currentGame.id === gameId){

    }else{
      this.props.getGame(gameId)
    }
  }

  render(){
    return(
      <div className="game">
        <GameOver render={this.props.currentGame.status}/>
        <HeaderAndDeck
          cardsLeft={this.props.currentGame.deck.cardCount}
          player={this.props.currentGame.playerName}
        />
        <Piles 
          piles={this.props.currentGame.piles}
          selectedPile={this.props.selectedPile}
          selectPile={this.props.selectPile}
          deselectPile={this.props.deselectPile}
        />
        <MakeMove
          makeMove={this.props.makeMove}
          selectedCard={this.props.selectedCard}
          selectedPile={this.props.selectedPile}
          deselectCard={this.props.deselectCard}
          deselectPile={this.props.deselectPile}
          render={this.validMoveSelected()}
          gameId={this.props.match.params.gameId}
        />
        <BadMove render={this.invalidMoveSelected()}/>
        <EndTurn 
          render={this.playedAtLeastTwo()}
          endTurn={this.props.endTurn}
          gameId={this.props.match.params.gameId} 
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

