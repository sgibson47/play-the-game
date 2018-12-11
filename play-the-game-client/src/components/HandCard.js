import React, {Component} from 'react'

class HandCard extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: false,
      //played: false
      //maybe played should be props, not state
      // the card won't know if it's been played,
      //but the game component will
    }
  }

  handCardClassName = () => {
    if(this.props.played === "false" && this.state.selected === false){
      return "HandCard"
    }else if(this.props.played === "false" && this.state.selected === true){
      return "SelectedHandCard"
    }else if(this.props.played === "true"){
      return "HiddenHandCard"
    }
  }


  handleOnClick = (event) =>{
    //some code to dispatch an update to the store
    //some code to update local state and trigger visual indication that card was selected
    // ooo ooo local state can control whether card is displayed or not and how it is displayed (selected or not)

    if(this.state.selected){
      this.setState({selected: false})
      // dispatch action type "SELECT_CARD" -- this.props.selectCard()
    }else{
      this.setState({selected: true})
      // dispatch action type "DESELECT_CARD" -- this.props.deselectCard()
    }
    
  }

  render(){
    return (
      <div className={`${this.handCardClassName()}`} onClick={this.handleOnClick}>
        {this.props.value}
      </div>
    )
  }
}

export default HandCard