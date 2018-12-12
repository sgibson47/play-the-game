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
      <div className={this.props.moveable} >
        <button onClick={this.handleOnClick}>Play card</button>
      </div>
    )
  }
}

export default MakeMove