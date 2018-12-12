import React, {Component} from 'react'

class MakeMove extends Component {

  handleOnClick = (event) =>{
    // add selectedCard's id & selectedPile's id to new obj in moves
    // update selectedPile's topMostCard to reflect selectedCard
    // dispatch deselectCard
    // dispatch deselectPile
  }

  render(){
    return (
      <div 
        className="MakeMove"
        // {this.props.makeMoveClassName} 
        >
        Nice, that's a valid move.<br/> 
        <button onClick={this.handleOnClick}>Play card</button>
      </div>
    )
  }
}

export default MakeMove