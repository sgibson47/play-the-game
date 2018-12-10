import React, {Component} from 'react';
import PileCard from '../components/PileCard'

class Pile extends Component {
  

  topCard = () => this.props.pile.cards.slice(-1)[0];

  anchor = () => {
    if(this.props.pile.asc === true){
      return 1
    } else {
       return 100
    };
  }

  type = () => {
    if(this.props.pile.asc === true){
      return "Up"
    } else {
       return "Down"
    };
  }

  

  render(){
    return(
      <div className="pile">
        <p>Count {this.type()}</p>
        <PileCard value ={this.anchor()}/>
        <PileCard value={this.topCard().value}/> 
      </div>
    )
  }
}

export default Pile;