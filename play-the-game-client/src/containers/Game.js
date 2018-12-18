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

  playedAtLeastTwo = () =>{
    if(this.props.moves < 2){
      return false
    }else{
      return true
    }
  }
  
  // topMostCardsAsc = () =>{
  //   let cards = []
  //   this.props.currentGame.piles.forEach(function (pile, index, piles){
  //     if(pile.asc === true){
  //       cards.push(pile.topMostCard)
  //     } 
  //   })
  //   return cards
  // }

  // topMostCardsDesc = () =>{
  //   let cards = []
  //   this.props.currentGame.piles.forEach(function (pile, index, piles){
  //     if(pile.asc !== true){
  //       cards.push(pile.topMostCard)
  //     } 
  //   }) 
  //   return cards
  // } 

  // playableOnAsc = ()=>{
  //   let topCards = this.topMostCardsAsc()
  //   let array = []
  //   this.props.currentGame.hand.cards.forEach(
  //     function (card, index, handCards) {
  //       if (topCards){
  //         if(card.value < topCards[0].value && card.value < topCards[1].value){
  //           array.push(false)
  //         }else{
  //           array.push(true)
  //         }
  //       }
  //     }
  //   )
  //   return array
  // }
  
  // playableOnDesc = () => {
  //   let otherTopCards = this.topMostCardsDesc()
  //   let array = []
  //   this.props.currentGame.hand.cards.forEach(
  //     function (card, index, handCards) {
  //       if (otherTopCards){
  //         if(card.value > otherTopCards[0].value && card.value > otherTopCards[1].value){
  //           array.push(false)
  //         }else{
  //           array.push(true)
  //         }
  //       }else{
  //         array.push(true)
  //       }
  //     }
  //   )
  //   return array
  // }

  // gameOver = () =>{
  //   if(this.props.currentGame.deck.cards === 0 || 
  //     (!this.playableOnDesc().includes(true) && !this.playableOnAsc().includes(true))
  //   ){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  render(){
    // console.log("From Game")
    // debugger
    return(
      <div className="game">
        <GameOver 
          render={this.props.currentGame.status}
          // this ought to depend on this.props.currentGame.status
          // Game.find_by(id: 1) has status true
          // soo for now true === incomplete game
        />
        <Deck cardsLeft={this.props.currentGame.deck.cardCount}/>
        <Piles 
          piles={this.props.currentGame.piles}
          selectedPile={this.props.selectedPile}
          selectPile={this.props.selectPile}
          deselectPile={this.props.deselectPile}
        />
        <MakeMove
          makeMove={this.props.makeMove}
          addMove={this.props.addMove}
          selectedCard={this.props.selectedCard}
          selectedPile={this.props.selectedPile}
          deselectCard={this.props.deselectCard}
          deselectPile={this.props.deselectPile}
          render={this.validMoveSelected()}
        />
        <BadMove render={this.invalidMoveSelected()}/>
        <EndTurn 
          render={this.playedAtLeastTwo()}
          endTurn={this.props.endTurn} 
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

