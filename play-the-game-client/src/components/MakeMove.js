import React, {Component} from 'react'

class MakeMove extends Component {

  makeMove = () =>{
    const move = {
      card_id: this.props.selectedCard.id,
      pile_id: this.props.selectedPile.id
    };

    const data = {
      pile_id: this.props.selectedPile.id,
      card: this.props.selectedCard
    };

    this.props.makeMove(move)
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