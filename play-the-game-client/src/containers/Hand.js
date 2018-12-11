import React, {Component} from 'react';
import HandCard from '../components/HandCard'

class Hand extends Component {
    

  // handCardClassName = () => {
  //   if(this.props.played === "false" && this.props.selectedCard.id === false){
  //     return "HandCard"
  //   }else if(this.props.played === "false" && this.state.selected === true){
  //     return "SelectedHandCard"
  //   }else if(this.props.played === "true"){
  //     return "HiddenHandCard"
  //   }
  // }

  createHandCards = () => {
    return this.props.cards.map(card =>
          <HandCard 
            card={card} 
            key={card.id} 
            played="false" 
            selectCard={this.props.selectCard}
            deselectCard={this.props.deselectCard}
          />
        )
  };


  render(){
    return(
      <div className="Hand">
        <h3>Your hand:</h3>
        {this.createHandCards()}
      </div>
    )
  }
}

// I think we're gonna need to move mapping the cards in the hand to HandCard out of the render()
// b/c we're gonna need to compare their ids(?) to ... a props value indicating which cards have been played?

export default Hand;