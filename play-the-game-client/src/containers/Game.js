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
    if(this.props.currentGame.moves < 2){
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
        if (topCards){
          if(card === null){
            array.push(true)
          }else if(card.value < topCards[0].value && card.value < topCards[1].value){
            array.push(false)
          }else{
            array.push(true)
          }
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
        if (card === null){
          array.push(true)
        } else if (card && otherTopCards[0] && otherTopCards[1]){
          if(card.value > otherTopCards[0].value && card.value > otherTopCards[1].value){
            array.push(false)
          }else{
            array.push(true)
          }
        }else{
          array.push(true)
        }
      }
    )
    return array
  }

  gameOver = () =>{
    if(this.playedAtLeastTwo() && this.props.currentGame.deck.cardCount > 0){
      // if player has played at least 2 cards && there are cards remaining in the deck
      // the game isn't over b/c they can get more cards to play
      return false
    }else{
      // if the player has played 0 or 1 cards, then we should check whether the game is over 
      if(
        this.props.currentGame.deck.cardCount === -1 && (!this.playableOnDesc().includes(true) && !this.playableOnAsc().includes(true))
        ){
        // if the game is in its initial state, it's not over
        return false
      }else if(this.props.currentGame.deck.cardCount === 0 && this.props.currentGame.hand.cards.length === 0){
        // if the player has depleted the deck and played all the cards in her hand, it's over
        return true
      }else if(
        this.props.currentGame.deck.cardCount >= 0 && (!this.playableOnDesc().includes(true) && !this.playableOnAsc().includes(true))
        ){
        // if the deck isn't as it starts, then player hasn't played 2 cards
        return true
      }else{
        return false
      }
    }
  }

  componentDidMount(){
    const gameId = this.props.match.params.gameId
    if(this.props.currentGame.status !== false){
      if(this.gameOver()){
        this.props.endGame(gameId)
      }
    }
    this.props.getGame(gameId)
  }

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
          // addMove={this.props.addMove}
          selectedCard={this.props.selectedCard}
          selectedPile={this.props.selectedPile}
          deselectCard={this.props.deselectCard}
          deselectPile={this.props.deselectPile}
          render={this.validMoveSelected()}
          // ¿change render to className
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

