import React, {Component} from 'react'

class HandCard extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: false,
    }
  }

  handCardClassName = () => {
    if(this.props.played === "true"){
      return "HiddenHandCard"
    }else if(this.props.selectedCard.id === this.props.card.id){
      return "SelectedHandCard"
    }else {
      return "HandCard"
    }
  }


  handleOnClick = (event) =>{
    if(this.state.selected){
      this.setState({selected: false})
      this.props.deselectCard()
    }else{
      this.setState({selected: true})
      this.props.selectCard(this.props.card)
    }
    
  }

  render(){
    return (
      <div className={`${this.handCardClassName()}`} onClick={this.handleOnClick}>
        {this.props.card.value}
      </div>
    )
  }
}

export default HandCard