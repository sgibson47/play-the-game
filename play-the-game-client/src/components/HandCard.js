import React, {Component} from 'react'

class HandCard extends Component {

  handCardClassName = () => { 
    if(this.props.selectedCard.id === this.props.card.id){
      return "SelectedHandCard"
    }else {
      return "HandCard"
    }
  }


  handleOnClick = (event) =>{
    if(this.props.selectedCard.id === this.props.card.id){
      this.props.deselectCard()
    }else{
      this.props.selectCard(this.props.card)
    }
    
  }

  render(){
    return (
      <div className={`${this.handCardClassName()}`} onClick={this.handleOnClick}>
        <p>{this.props.card.value}</p>
      </div>
    )
  }
}

export default HandCard