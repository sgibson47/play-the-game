import React, {Component} from 'react';
import PileCard from '../components/PileCard'

class Pile extends Component {
  constructor(props){
    super(props);
    this.state={
      selected: false
    }
  }

  topCardValue = () => {
    const topMostCard = this.props.pile.topMostCard
    if(!topMostCard){
      return "No cards have been played on this pile, yet."
    }else{
      return topMostCard.value;
    }
  }

  anchor = () => {
    if(this.props.pile.asc === true){
      return 1
    } else {
       return 100
    }
  }

  type = () => {
    if(this.props.pile.asc === true){
      return "Up"
    } else {
       return "Down"
    }
  }

  handPileClassName = () => {
    if(this.state.selected === false){
      return "pile"
    }else if(this.state.selected === true){
      return "SelectedPile"
    }
  }


  handleOnClick = (event) =>{
    if(this.state.selected){
      this.setState({selected: false})
      this.props.deselectPile()
    }else{
      this.setState({selected: true})
      this.props.selectPile(this.props.pile)
    }
  }
  

  render(){
    return(
      <div className={`${this.handPileClassName()}`} onClick={this.handleOnClick}>
        <p>Count {this.type()}</p>
        <PileCard value ={this.anchor()}/>
        <PileCard value={this.topCardValue()}/> 
      </div>
    )
  }
}

export default Pile;