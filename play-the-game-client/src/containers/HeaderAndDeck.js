import React, {Component} from 'react';
import Deck from '../components/Deck'

class HeaderAndDeck extends Component {  

  render(){
    return(
      <div className="HeaderAndDeck">
        <h1 className='GameH1'>{this.props.player}'s Game</h1>
        <Deck cardsLeft={this.props.cardsLeft}/>
      </div>
    )
  }
}

export default HeaderAndDeck;