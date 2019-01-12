import React, {Component} from 'react'

class MakeMove extends Component {

  makeMove = () =>{
    const move = {
      card_id: this.props.selectedCard.id,
      pile_id: this.props.selectedPile.id
    };

    const cardId = this.props.selectedCard.id

    const gameId = this.props.gameId

    this.props.makeMove(move, gameId)
    // makes move in db
    this.props.addMove(cardId)
    // dispatches a reducer that increments redux store's newMoves 
    this.props.deselectCard()
    this.props.deselectPile()
  }

  makeMoveClassName = () => {
    if(this.props.render){
      return "MakeMove"
    }else {
      return "HideMakeMove"
    }
  }

  render(){
    // console.log("From MakeMove")
    // debugger
    return (
      <div 
        className={this.makeMoveClassName()} 
        >
        Nice, that's a valid move.<br/> 
        <button onClick={this.makeMove}>Play card</button>
      </div>
    )
  }
}

export default MakeMove