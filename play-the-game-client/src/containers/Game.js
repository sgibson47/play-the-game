import React, {Component} from 'react';
import Deck from '../components/Deck'
import Hand from './Hand'
import Piles from './Piles'
import MakeMove from '../components/MakeMove'
import BadMove from '../components/BadMove'
import EndTurn from '../components/EndTurn'
import GameOver from '../components/GameOver'

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
  
  topMostCardsAsc = () =>{
    let cards = []
    this.props.currentGame.piles.forEach(function (pile, index, piles){
      if(pile.asc === true){
        cards.push(pile.topMostCard)
      } 
    })
    return cards
  }

  topMostCardsDesc = () =>{
    let cards = []
    this.props.currentGame.piles.forEach(function (pile, index, piles){
      if(pile.asc !== true){
        cards.push(pile.topMostCard)
      } 
    }) 
    return cards
  } 

  playableOnAsc = ()=>{
    let topCards = this.topMostCardsAsc()
    let array = []
    this.props.currentGame.hand.cards.forEach(
      function (card, index, handCards) {
        if(card.value < topCards[0] && card.value < topCards[1]){
          array.push(false)
        }else{
          array.push(true)
        }
      }
    )
    return array
  }
  
  playableOnDesc = () => {
    let otherTopCards = this.topMostCardsDesc()
    let array = []
    this.props.currentGame.hand.cards.forEach(
      function (card, index, handCards) {
        if(card.value > otherTopCards[0] && card.value > otherTopCards[1]){
          array.push(false)
        }else{
          array.push(true)
        }
      }
    )
    return array
  }

  gameOver = () =>{
    if(this.props.currentGame.deck.cards === 0 || 
      (!this.playableOnDesc().includes(true) && !this.playableOnAsc().includes(true))
    ){
      return true
    }else{
      return false
    }

    // maybe add a presentational component saying GAME OVER
    // & conditionally render it based on game's status? the result of this function?
    // if the game is over maybe this function should trigger an update to the database?
    // we're gonna need to either set up a new controller for that
    // or change games#update to do different things depending on the params it recieves
  }

  render(){
    // console.log("From Game")
    // debugger
    return(
      <div className="game">
        <GameOver render={this.gameOver()}/>
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

