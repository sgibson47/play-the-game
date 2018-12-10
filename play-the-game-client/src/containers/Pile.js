import React, {Component} from 'react';
import Card from '../components/Card'

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
        <p>Count {this.type()} on this Pile from</p>
        <Card value ={this.anchor()}/>
        <Card value={this.topCard().value}/>
      </div>
    )
  }
}

export default Pile;