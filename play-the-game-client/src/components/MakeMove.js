import React, {Component} from 'react'

class MakeMove extends Component {

  makeMove = () =>{
    const move = {
      card_id: this.props.selectedCard.id,
      pile_id: this.props.selectedPile.id
    }

    this.props.addMove(move)
    this.props.deselectCard()
    this.props.deselectPile()
  }

  render(){
    // console.log("From MakeMove")
    // debugger
    return (
      <div 
        className="MakeMove"
        // {this.props.makeMoveClassName} 
        >
        Nice, that's a valid move.<br/> 
        <button onClick={this.makeMove}>Play card</button>
      </div>
    )
  }
}

export default MakeMove